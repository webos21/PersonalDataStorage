package com.gmail.webos21.pds.app;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.domain.PasswordBook;
import com.gmail.webos21.pds.db.repo.PasswordBookRepo;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

public class PbAddActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView lblTitle;

    private ViewGroup panelId;
    private ViewGroup panelFixday;

    private TextView tvId;
    private EditText edUrl;
    private EditText edName;
    private EditText edType;
    private EditText edMyId;
    private EditText edMyPw;
    private TextView tvRegDate;
    private EditText edMemo;

    private Button btnSave;

    private DatePickerListener dpl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        SharedPreferences shpref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        getDelegate().setLocalNightMode(shpref.getInt(Consts.PREF_THEME, -1));

        setContentView(R.layout.activity_pbedit);

        panelId = (ViewGroup) findViewById(R.id.panel_id);
        panelId.setVisibility(View.GONE);

        panelFixday = (ViewGroup) findViewById(R.id.panel_fixday);
        panelFixday.setVisibility(View.GONE);

        tvId = (TextView) findViewById(R.id.tv_id);
        edUrl = (EditText) findViewById(R.id.ed_url);
        edName = (EditText) findViewById(R.id.ed_name);
        edType = (EditText) findViewById(R.id.ed_type);
        edMyId = (EditText) findViewById(R.id.ed_myid);
        edMyPw = (EditText) findViewById(R.id.ed_mypw);
        tvRegDate = (TextView) findViewById(R.id.tv_regdate);
        tvRegDate.setOnClickListener(this);
        edMemo = (EditText) findViewById(R.id.ed_memo);

        btnSave = (Button) findViewById(R.id.btn_save);
        btnSave.setText(getResources().getString(R.string.pbe_add));
        btnSave.setOnClickListener(this);

        dpl = new DatePickerListener();

        ActionBar ab = getSupportActionBar();
        ab.setTitle("암호 관리 > 계정 추가");
        ab.setDisplayHomeAsUpEnabled(true);
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
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case android.R.id.home:
                finish();
                return true;
            default:
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onClick(View v) {
        int vId = v.getId();
        switch (vId) {
            case R.id.tv_regdate:
                showDatePicker();
                break;
            case R.id.btn_save:
                saveData();
                break;
            default:
                break;
        }
    }

    private void showDatePicker() {
        final Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int day = c.get(Calendar.DAY_OF_MONTH);

        DatePickerDialog dpd = new DatePickerDialog(this, dpl, year, month, day);
        dpd.show();
    }

    private void errorToast(String msg) {
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }

    private void saveData() {
        String surl = edUrl.getText().toString();
        String sname = edName.getText().toString();
        String stype = edType.getText().toString();
        String myid = edMyId.getText().toString();
        String mypw = edMyPw.getText().toString();
        String regDate = tvRegDate.getText().toString();
        String memo = edMemo.getText().toString();

        if (surl == null || surl.length() < 5) {
            edUrl.requestFocus();
            errorToast(getResources().getString(R.string.err_pb_url));
            return;
        }
        if (sname == null || sname.length() < 2) {
            edName.requestFocus();
            errorToast(getResources().getString(R.string.err_pb_name));
            return;
        }
        if (stype == null || stype.length() < 2) {
            edType.requestFocus();
            errorToast(getResources().getString(R.string.err_pb_type));
            return;
        }
        if (myid == null || myid.length() < 2) {
            edMyId.requestFocus();
            errorToast(getResources().getString(R.string.err_pb_myid));
            return;
        }
        if (mypw == null || mypw.length() < 2) {
            edMyPw.requestFocus();
            errorToast(getResources().getString(R.string.err_pb_mypw));
            return;
        }
        if (regDate == null || regDate.length() < 2) {
            tvRegDate.requestFocus();
            errorToast(getResources().getString(R.string.err_pb_regdate));
            return;
        }

        Date rd = null;
        try {
            rd = DbConsts.SDF_DATE.parse(regDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        PasswordBook pbr = new PasswordBook(null, surl, sname, stype, myid, mypw, rd.getTime(), System.currentTimeMillis(), memo);
        PasswordBookRepo pbRepo = PdsDbManager.getInstance().getRepository(PasswordBookRepo.class);
        pbRepo.updateRow(pbr);

        Intent i = new Intent();
        setResult(Activity.RESULT_OK, i);

        finish();
    }

    private class DatePickerListener implements DatePickerDialog.OnDateSetListener {
        @Override
        public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
            String strDate = String.format("%04d-%02d-%02d", year, month + 1, dayOfMonth);
            tvRegDate.setText(strDate);
        }
    }

}
