package com.gmail.webos21.pds.app;

import android.Manifest;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.gmail.webos21.android.async.TaskRunner;
import com.gmail.webos21.android.patch.PRNGFixes;
import com.gmail.webos21.android.widget.ChooseFileDialog;
import com.gmail.webos21.pds.app.db.PbExporter;
import com.gmail.webos21.pds.app.db.PbImporter;
import com.gmail.webos21.pds.app.db.PbRowAdapter;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.domain.PasswordBook;
import com.gmail.webos21.pds.db.repo.PasswordBookRepo;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.navigation.NavigationView;

import java.io.File;
import java.util.concurrent.Executors;

public class PbListActivity extends AppCompatActivity implements View.OnClickListener {

    private static final String TAG = "PbListActivity";

    private TextView tvTotalSite;
    private PbRowAdapter pbAdapter;
    private TaskRunner tr;

    private ActivityResultLauncher<Intent> authCfgLauncher;
    private ActivityResultLauncher<Intent> loginLauncher;
    private ActivityResultLauncher<Intent> addLauncher;
    private ActivityResultLauncher<Intent> editLauncher;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        SharedPreferences shpref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        getDelegate().setLocalNightMode(shpref.getInt(Consts.PREF_THEME, -1));

        setContentView(R.layout.activity_pblist);

        if (Consts.DEBUG) {
            Log.i(TAG, "onCreate!!!!!!!!!!!!!");
        }

        // Android SecureRandom Fix!!! (No Dependency)
        PRNGFixes.apply();

        // Set FloatingActionButton
        FloatingActionButton fabInputOne = findViewById(R.id.fab_input_one);
        fabInputOne.setOnClickListener(this);

        // Get Shared Preferences
        SharedPreferences pref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);

        // Set Views
        boolean bIconShow = pref.getBoolean(Consts.PREF_SHOW_ICON, false);
        CheckBox cbIcon = findViewById(R.id.chk_icon_show);
        cbIcon.setChecked(bIconShow);
        cbIcon.setOnCheckedChangeListener(new ShowConfigListener());

        tvTotalSite = findViewById(R.id.tv_total_site);

        // Set Main-ListView
        pbAdapter = new PbRowAdapter(this, pref.getBoolean(Consts.PREF_SHOW_ICON, false));
        ListView pbList = findViewById(R.id.lv_container);
        pbList.setAdapter(pbAdapter);
        pbList.setOnItemClickListener(new PbRowClickedListener());
        pbList.setOnItemLongClickListener(new PbRowLongClickedListener());

        // Set Views
        tvTotalSite.setText(getResources().getString(R.string.cfg_total_item) + pbAdapter.getCount());

        authCfgLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                (result) -> {
                    if (result.getResultCode() != RESULT_OK) {
                        finish();
                    }
                }
        );

        loginLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                (result) -> {
                    Log.i(TAG, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    Log.i(TAG, "result.getResultCode() = " + result.getResultCode());

                    if (result.getResultCode() == RESULT_OK) {
                        PdsApp app = (PdsApp) getApplicationContext();
                        app.setLoginRequired(false);
                    } else {
                        PbListActivity.this.finish();
                    }
                });

        addLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                (result) -> {
                    if (result.getResultCode() == RESULT_OK) {
                        PbListActivity.this.pbAdapter.refresh();
                    }
                });

        editLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                (result) -> {
                    if (result.getResultCode() == RESULT_OK) {
                        PbListActivity.this.pbAdapter.refresh();
                    }
                });

        tr = new TaskRunner(Executors.newSingleThreadExecutor());

        ActionBar ab = getSupportActionBar();
        ab.setTitle("암호 관리");
        ab.setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (Consts.DEBUG) {
            Log.i(TAG, "onCreateOptionsMenu!!!!!!!!!!!!!");
        }

        getMenuInflater().inflate(R.menu.main, menu);

        MenuItem searchItem = menu.findItem(R.id.action_search);
        SearchView searchView = (SearchView) searchItem.getActionView();
        searchView.setOnQueryTextListener(new SearchAdapter(pbAdapter));

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case android.R.id.home:
                finish();
                return true;
            case R.id.action_search:
                return true;
            default:
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onStart() {
        super.onStart();

        PdsApp app = (PdsApp) getApplicationContext();

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart!!!!!!!!!!!!!" + app.isLoginRequired());
        }

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart::CheckPassKey");
        }
        // Check the Passkey
        SharedPreferences pref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        String passkey = pref.getString(Consts.PREF_PASSKEY, "");
        if (passkey == null || passkey.length() == 0) {
            Intent i = new Intent(this, AuthConfigActivity.class);
            authCfgLauncher.launch(i);
            return;
        }

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart::CheckLogin");
        }
        // Check the flag of LOGIN
        if (app.isLoginRequired()) {
            Intent i = new Intent(this, AuthActivity.class);
            loginLauncher.launch(i);
            return;
        }

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart::RequestPermission");
        }
        // Request Permission
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    Consts.PERM_REQ_EXTERNAL_STORAGE);
            return;
        }

    }

    @Override
    protected void onStop() {
        super.onStop();

        if (Consts.DEBUG) {
            Log.i(TAG, "onStop!!!!!!!!!!!!!");
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (Consts.DEBUG) {
            Log.i(TAG, "onDestroy!!!!!!!!!!!!!");
        }
    }

    @Override
    public void onClick(View v) {
        int vId = v.getId();
        switch (vId) {
            case R.id.fab_input_one: {
                Intent i = new Intent(this, PbAddActivity.class);
                addLauncher.launch(i);
                break;
            }
            default:
                break;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (Consts.DEBUG) {
            Log.i(TAG, "onRequestPermissionsResult!!!!!!!!!!!!!");
        }
        if (requestCode == Consts.PERM_REQ_EXTERNAL_STORAGE) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // OK, nothing to do
            } else {
                Toast.makeText(this, getResources().getString(R.string.err_perm_exflah), Toast.LENGTH_LONG).show();
                finish();
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    private void refreshListView() {
        PbListActivity.this.runOnUiThread(() -> {
            String totalSite = PbListActivity.this.getResources().getString(R.string.cfg_total_item) + PbListActivity.this.pbAdapter.getCount();
            PbListActivity.this.tvTotalSite.setText(totalSite);
            PbListActivity.this.pbAdapter.notifyDataSetChanged();
        });
    }

    private void showFileDialog() {
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    Consts.PERM_REQ_EXTERNAL_STORAGE);
            return;
        }

        String mountPoint = Environment.getExternalStorageDirectory().toString();
        ChooseFileDialog cfd = new ChooseFileDialog(this, mountPoint, "csv");
        cfd.setOnFileChosenListener(new CsvFileSelectedListener());
        cfd.show();
    }

    private void exportCsv() {
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    Consts.PERM_REQ_EXTERNAL_STORAGE);
            return;
        }

        String mountPoint = Environment.getExternalStorageDirectory().toString();
        File csvFile = new File(mountPoint + "/Download", "exp.csv");
        PasswordBookRepo pbRepo = PdsDbManager.getInstance().getRepository(PasswordBookRepo.class);

        tr.executeAsync(new PbExporter(pbRepo, csvFile, () -> {
            Toast.makeText(PbListActivity.this, "File is exported!!", Toast.LENGTH_SHORT).show();
        }), Runnable::run);
    }

    private class NavItemSelected implements NavigationView.OnNavigationItemSelectedListener {
        @Override
        public boolean onNavigationItemSelected(MenuItem item) {
            int id = item.getItemId();
            switch (id) {
                case R.id.nav_password: {
                    break;
                }
                case R.id.nav_settings: {
                    Intent i = new Intent(PbListActivity.this, AuthConfigActivity.class);
                    authCfgLauncher.launch(i);
                    break;
                }
                default:
                    break;
            }

            return true;
        }
    }

    private class ShowConfigListener implements CompoundButton.OnCheckedChangeListener {
        @Override
        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
            int vId = buttonView.getId();
            switch (vId) {
                case R.id.chk_icon_show: {
                    SharedPreferences pref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
                    pref.edit().putBoolean(Consts.PREF_SHOW_ICON, isChecked).apply();
                    PbListActivity.this.pbAdapter.setShowIcon(isChecked);
                    break;
                }
                default:
                    break;
            }
        }
    }

    private class PbRowClickedListener implements AdapterView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            Object o = parent.getItemAtPosition(position);
            if (o instanceof PasswordBook) {
                final PasswordBook pbRow = (PasswordBook) o;
                if (Consts.DEBUG) {
                    Log.i(TAG, "o is PbRow!!!!!!");
                    Log.i(TAG, "id = " + pbRow.getId());
                    Log.i(TAG, "name = " + pbRow.getSiteName());
                    Log.i(TAG, "url = " + pbRow.getSiteUrl());
                }

                Intent i = new Intent(PbListActivity.this, PbEditActivity.class);
                i.putExtra(Consts.EXTRA_ARG_ID, pbRow.getId());
                editLauncher.launch(i);
            } else {
                if (Consts.DEBUG) {
                    Log.i(TAG, "o is not PbRow!!!!!!");
                }
            }
        }
    }

    private class PbRowLongClickedListener implements AdapterView.OnItemLongClickListener {
        @Override
        public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
            Object o = parent.getItemAtPosition(position);
            if (o instanceof PasswordBook) {
                final PasswordBook pbRow = (PasswordBook) o;
                if (Consts.DEBUG) {
                    Log.i(TAG, "o is PbRow!!!!!!");
                    Log.i(TAG, "id = " + pbRow.getId());
                    Log.i(TAG, "name = " + pbRow.getSiteName());
                    Log.i(TAG, "url = " + pbRow.getSiteUrl());
                }

                String popupTitle = PbListActivity.this.getResources().getString(R.string.pbp_delete);
                String popupMessage = PbListActivity.this.getResources().getString(R.string.pbp_delete_msg);
                popupMessage += "\n [" + pbRow.getSiteType() + "] " + pbRow.getSiteName();

                String txtDelete = PbListActivity.this.getResources().getString(R.string.delete);
                String txtCancel = PbListActivity.this.getResources().getString(R.string.cancel);

                AlertDialog.Builder adBuilder = new AlertDialog.Builder(PbListActivity.this);
                adBuilder.setTitle(popupTitle);
                adBuilder.setMessage(popupMessage);
                adBuilder.setPositiveButton(txtDelete,
                        new DialogInterface.OnClickListener() {
                            public void onClick(
                                    DialogInterface dialog, int id) {
                                PasswordBookRepo pbRepo = PdsDbManager.getInstance().getRepository(PasswordBookRepo.class);
                                pbRepo.deleteRow(pbRow);
                                PbListActivity.this.refreshListView();
                            }
                        });
                adBuilder.setNegativeButton(txtCancel,
                        new DialogInterface.OnClickListener() {
                            public void onClick(
                                    DialogInterface dialog, int id) {
                                // Nothing to do
                            }
                        });
                adBuilder.create().show();
            } else {
                if (Consts.DEBUG) {
                    Log.i(TAG, "o is not PbRow!!!!!!");
                }
            }

            return true;
        }
    }

    private class SearchAdapter implements SearchView.OnQueryTextListener {

        private final PbRowAdapter myAdapter;

        public SearchAdapter(PbRowAdapter pbAdapter) {
            this.myAdapter = pbAdapter;
        }

        @Override
        public boolean onQueryTextSubmit(String query) {
            if (this.myAdapter != null) {
                this.myAdapter.searchItems(query);
                return true;
            }
            return false;
        }

        @Override
        public boolean onQueryTextChange(String newText) {
            if ((this.myAdapter != null) && (newText == null || newText.length() == 0)) {
                this.myAdapter.searchAll();
                return true;
            }
            return false;
        }
    }

    private class CsvFileSelectedListener implements ChooseFileDialog.FileChosenListener {
        @Override
        public void onFileChosen(File chosenFile) {
            PasswordBookRepo pbRepo = PdsDbManager.getInstance().getRepository(PasswordBookRepo.class);
            PbListActivity.this.tr.executeAsync(new PbImporter(pbRepo, chosenFile, () -> {
                Toast.makeText(PbListActivity.this, "File is imported!!", Toast.LENGTH_SHORT).show();
                PbListActivity.this.refreshListView();
            }), Runnable::run);
        }
    }
}
