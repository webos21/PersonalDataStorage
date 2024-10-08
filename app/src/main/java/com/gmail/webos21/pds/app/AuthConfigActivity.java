package com.gmail.webos21.pds.app;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.gmail.webos21.pds.web.OnetimePass;

public class AuthConfigActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText edPassNew;
    private EditText edPassConfirm;
    private TextView tvMessage;
    private Button btnInputOk;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        SharedPreferences shpref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        getDelegate().setLocalNightMode(shpref.getInt(Consts.PREF_THEME, -1));

        setContentView(R.layout.activity_auth_cfg);

        edPassNew = (EditText) findViewById(R.id.edPassNew);
        edPassConfirm = (EditText) findViewById(R.id.edPassConfirm);
        tvMessage = (TextView) findViewById(R.id.tvMessage);
        btnInputOk = (Button) findViewById(R.id.btnInputOk);

        btnInputOk.setOnClickListener(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onClick(View v) {
        int vId = v.getId();
        switch (vId) {
            case R.id.btnInputOk:
                setNewPassword();
                break;
            default:
                break;
        }
    }

    private void setNewPassword() {
        String p1 = edPassNew.getText().toString();
        String p2 = edPassConfirm.getText().toString();

        if (p1 == null || p1.length() < 6) {
            tvMessage.setText(R.string.err_input_new);
            tvMessage.setVisibility(View.VISIBLE);
            edPassNew.requestFocus();
            return;
        }

        if (p2 == null || p2.length() < 6) {
            tvMessage.setText(R.string.err_input_confirm);
            tvMessage.setVisibility(View.VISIBLE);
            edPassConfirm.requestFocus();
            return;
        }

        if (!p1.equals(p2)) {
            tvMessage.setText(R.string.err_input_mismatch);
            tvMessage.setVisibility(View.VISIBLE);
            edPassConfirm.setText("");
            edPassConfirm.requestFocus();
            return;
        }

        SharedPreferences pref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        SharedPreferences.Editor prefEdit = pref.edit();

        String newPasskey = OnetimePass.encryptOtp(p1);

        prefEdit.putString(Consts.PREF_PASSKEY, newPasskey);
        prefEdit.commit();

        Intent i = new Intent();
        setResult(Activity.RESULT_OK, i);

        finish();
    }

}
