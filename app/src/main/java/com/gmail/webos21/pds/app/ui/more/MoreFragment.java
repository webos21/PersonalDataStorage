package com.gmail.webos21.pds.app.ui.more;

import static androidx.preference.PreferenceFragmentCompat.ARG_PREFERENCE_ROOT;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.DocumentsContract;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.documentfile.provider.DocumentFile;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.gmail.webos21.pds.app.Consts;
import com.gmail.webos21.pds.app.PbListActivity;
import com.gmail.webos21.pds.app.PdsApp;
import com.gmail.webos21.pds.app.R;
import com.gmail.webos21.pds.app.databinding.FragmentMoreBinding;
import com.gmail.webos21.pds.db.DbConsts;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;

public class MoreFragment extends Fragment {

    private MoreViewModel moreViewModel;
    private FragmentMoreBinding binding;

    private ActivityResultLauncher<String> mGetContent;
    private ActivityResultLauncher<Intent> mStartForResult;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        moreViewModel =
                new ViewModelProvider(this).get(MoreViewModel.class);

        binding = FragmentMoreBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        ClickEventHandler ceh = new ClickEventHandler();

        TextView tvPbm = binding.pbm;
        TextView tvTheme = binding.theme;
        TextView tvDbImport = binding.dbImport;
        TextView tvDbExport = binding.dbExport;
        TextView tvAbout = binding.about;
        TextView tvTest = binding.test;

        tvPbm.setOnClickListener(ceh);
        tvTheme.setOnClickListener(ceh);
        tvDbImport.setOnClickListener(ceh);
        tvDbExport.setOnClickListener(ceh);
        tvAbout.setOnClickListener(ceh);
        tvTest.setOnClickListener(ceh);

//        Bundle aboutBundle = new Bundle();
//        aboutBundle.putString(ARG_PREFERENCE_ROOT, "more_about");
//        tvAbout.setOnClickListener(Navigation.createNavigateOnClickListener(R.id.moreToAbout, aboutBundle));

        mGetContent = registerForActivityResult(new ActivityResultContracts.GetContent(),
                new ActivityResultCallback<Uri>() {
                    @Override
                    public void onActivityResult(Uri uri) {
                        Log.d("MoreFragment", "DB Import URI = " + uri);

                        PdsApp app = (PdsApp) getActivity().getApplicationContext();
                        app.dbClose();

                        File dbFile = new File(getActivity().getFilesDir(), DbConsts.DB_FILE);
                        try {
                            InputStream in = getActivity().getContentResolver().openInputStream(uri);
                            OutputStream out = new FileOutputStream(dbFile);
                            try {
                                // Transfer bytes from in to out
                                byte[] buf = new byte[1024];
                                int len;
                                while ((len = in.read(buf)) > 0) {
                                    out.write(buf, 0, len);
                                }
                            } finally {
                                out.close();
                                in.close();
                            }
                        } catch (FileNotFoundException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                        app.dbOpen();
                    }
                });

        mStartForResult = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                new ActivityResultCallback<ActivityResult>() {
                    @Override
                    public void onActivityResult(ActivityResult result) {
                        if (result.getResultCode() == Activity.RESULT_OK && result != null) {
                            String dbFileName = "pds-" + Consts.SDF_DATETIME_FILE.format(new Date()) + ".mv.db";
                            Intent intent = result.getData();

                            DocumentFile pickedDir = DocumentFile.fromTreeUri(getActivity(), intent.getData());
                            DocumentFile newFile = pickedDir.createFile("application/octet", dbFileName);

                            Uri destUri = newFile.getUri();

                            PdsApp app = (PdsApp) getActivity().getApplicationContext();
                            app.dbClose();

                            File dbFile = new File(getActivity().getFilesDir(), DbConsts.DB_FILE);
                            try {
                                InputStream in = new FileInputStream(dbFile);
                                OutputStream out = getActivity().getContentResolver().openOutputStream(destUri);
                                try {
                                    // Transfer bytes from in to out
                                    byte[] buf = new byte[1024];
                                    int len;
                                    while ((len = in.read(buf)) > 0) {
                                        out.write(buf, 0, len);
                                    }
                                } finally {
                                    out.close();
                                    in.close();
                                }
                            } catch (FileNotFoundException e) {
                                e.printStackTrace();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }

                            app.dbOpen();
                            //appRestart();
                        }
                    }
                });

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private void appRestart() {
        PackageManager packageManager = getActivity().getPackageManager();
        Intent intent = packageManager.getLaunchIntentForPackage(getActivity().getPackageName());
        ComponentName componentName = intent.getComponent();
        Intent mainIntent = Intent.makeRestartActivityTask(componentName);
        getActivity().startActivity(mainIntent);
        Runtime.getRuntime().exit(0);
    }

    private class ClickEventHandler implements View.OnClickListener {

        @Override
        public void onClick(View view) {
            switch (view.getId()) {
                case R.id.pbm: {
                    Intent i = new Intent(getActivity(), PbListActivity.class);
                    getActivity().startActivity(i);
                    break;
                }
                case R.id.theme: {
                    SharedPreferences shpref = getActivity().getSharedPreferences(Consts.PREF_FILE, Context.MODE_PRIVATE);
                    int currentMode = 1 + shpref.getInt(Consts.PREF_THEME, -1);

                    MaterialAlertDialogBuilder madb = new MaterialAlertDialogBuilder(getActivity());
                    madb.setTitle("Theme");
                    madb.setSingleChoiceItems(R.array.dark_mode_entries, currentMode, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int item) {
                            int darkMode = item - 1;
                            Log.d("MoreFragment", "Theme Item = " + item + " / darkMode = " + darkMode);
                            SharedPreferences shpref = getActivity().getSharedPreferences(Consts.PREF_FILE, Context.MODE_PRIVATE);
                            shpref.edit().putInt(Consts.PREF_THEME, darkMode).apply();
                            getActivity().recreate();
                        }
                    });
                    madb.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            //dialog.cancel();
                        }
                    });
                    AlertDialog ad = madb.create();
                    ad.show();
                    break;
                }
                case R.id.db_import: {
                    mGetContent.launch("*/*");
                    break;
                }
                case R.id.db_export: {
                    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
                    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    intent.putExtra(DocumentsContract.EXTRA_INITIAL_URI, "file:///sdcard/Download");

                    mStartForResult.launch(intent);
                    break;
                }
                case R.id.about: {
                    Bundle bundle = new Bundle();
                    bundle.putString(ARG_PREFERENCE_ROOT, "about");
                    bundle.putString("more_detail_title", "About");

                    Navigation.findNavController(view).navigate(R.id.actionMoreToDetail, bundle);
                    break;
                }
                case R.id.test: {
                    Bundle bundle = new Bundle();
                    bundle.putString(ARG_PREFERENCE_ROOT, "test");
                    bundle.putString("more_detail_title", "Test");

                    Navigation.findNavController(view).navigate(R.id.actionMoreToDetail, bundle);
                    break;
                }
                default:
                    break;
            }
        }
    }

}