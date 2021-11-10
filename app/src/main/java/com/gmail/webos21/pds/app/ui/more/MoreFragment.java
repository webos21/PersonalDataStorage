package com.gmail.webos21.pds.app.ui.more;

import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.gmail.webos21.pds.app.R;
import com.gmail.webos21.pds.app.databinding.FragmentMoreBinding;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

public class MoreFragment extends Fragment {

    private MoreViewModel dashboardViewModel;
    private FragmentMoreBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        dashboardViewModel =
                new ViewModelProvider(this).get(MoreViewModel.class);

        binding = FragmentMoreBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        ClickEventHandler ceh = new ClickEventHandler();

        TextView tvTheme = binding.theme;
        TextView tvDbImport = binding.dbImport;
        TextView tvDbExport = binding.dbExport;

        tvTheme.setOnClickListener(ceh);
        tvDbImport.setOnClickListener(ceh);
        tvDbExport.setOnClickListener(ceh);

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private class ClickEventHandler implements View.OnClickListener {

        @Override
        public void onClick(View view) {
            switch (view.getId()) {
                case R.id.theme: {
                    MaterialAlertDialogBuilder madb = new MaterialAlertDialogBuilder(getActivity());
                    madb.setTitle("Theme");
                    madb.setView(R.layout.dialog_choose_theme);
                    madb.setNegativeButton("No", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            //dialog.cancel();
                        }
                    });
                    AlertDialog ad = madb.create();
                    ad.show();
                    break;
                }
                case R.id.db_import:
                    break;
                case R.id.db_export:
                    break;
                default:
                    break;
            }
        }
    }

}