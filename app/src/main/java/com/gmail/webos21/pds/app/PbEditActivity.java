package com.gmail.webos21.pds.app;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.gmail.webos21.pds.app.crypt.PbCryptHelper;
import com.gmail.webos21.pds.web.db.PbDbInterface;
import com.gmail.webos21.pds.web.db.PbDbManager;
import com.gmail.webos21.pds.web.db.PbRow;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

public class PbEditActivity extends AppCompatActivity implements View.OnClickListener {

    private static final String TAG = "PbEditActivity";

    private TextView lblTitle;

    private ViewGroup panelId;

    private TextView tvId;
    private EditText edUrl;
    private EditText edName;
    private EditText edType;
    private EditText edMyId;
    private EditText edMyPw;
    private TextView tvRegDate;
    private TextView tvFixgDate;
    private EditText edMemo;

    private Button btnSave;

    private DatePickerListener dpl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pbedit);

        lblTitle = (TextView) findViewById(R.id.lbl_title);
        lblTitle.setText(getResources().getString(R.string.pbe_title_change));

        panelId = (ViewGroup) findViewById(R.id.panel_id);
        panelId.setVisibility(View.VISIBLE);

        tvId = (TextView) findViewById(R.id.tv_id);
        edUrl = (EditText) findViewById(R.id.ed_url);
        edName = (EditText) findViewById(R.id.ed_name);
        edType = (EditText) findViewById(R.id.ed_type);
        edMyId = (EditText) findViewById(R.id.ed_myid);
        edMyPw = (EditText) findViewById(R.id.ed_mypw);
        tvRegDate = (TextView) findViewById(R.id.tv_regdate);
        tvRegDate.setOnClickListener(this);
        tvFixgDate = (TextView) findViewById(R.id.tv_fixdate);
        edMemo = (EditText) findViewById(R.id.ed_memo);

        btnSave = (Button) findViewById(R.id.btn_save);
        btnSave.setText(getResources().getString(R.string.pbe_modify));
        btnSave.setOnClickListener(this);

        dpl = new DatePickerListener();
    }

    @Override
    protected void onStart() {
        super.onStart();

        Intent i = getIntent();
        if (i != null) {
            Log.i(TAG, "i = " + i);
            Long pbId = i.getLongExtra(Consts.EXTRA_ARG_ID, -1);
            Log.i(TAG, "pbId = " + pbId);
            if (pbId > 0) {
                PbDbInterface pdi = PbDbManager.getInstance().getPbDbInterface();
                setValues(pdi.getRow(pbId));
            } else {
                finish();
            }
        } else {
            finish();
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
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

    private void setValues(PbRow pb) {
        PbApp app = (PbApp) getApplicationContext();
        byte[] pkBytes = app.getPkBytes();

        tvId.setText(pb.getId().toString());
        edUrl.setText(pb.getSiteUrl());
        edName.setText(pb.getSiteName());
        edType.setText(pb.getSiteType());
        edMyId.setText(PbCryptHelper.decData(pb.getMyId(), pkBytes));
        edMyPw.setText(PbCryptHelper.decData(pb.getMyPw(), pkBytes));
        tvRegDate.setText(Consts.SDF_DATE.format(pb.getRegDate()));
        tvFixgDate.setText(Consts.SDF_DATETIME.format(pb.getFixDate()));
        edMemo.setText(pb.getMemo());
    }

    private void showDatePicker() {
        String strDate = tvRegDate.getText().toString();
        Date td = null;
        try {
            td = com.gmail.webos21.pds.web.Consts.SDF_DATE.parse(strDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        final Calendar c = Calendar.getInstance();
        c.setTime(td);
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
        String id = tvId.getText().toString();
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
            rd = Consts.SDF_DATE.parse(regDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        PbApp app = (PbApp) getApplicationContext();
        byte[] pkBytes = app.getPkBytes();

        String encId = PbCryptHelper.encData(myid, pkBytes);
        String encPw = PbCryptHelper.encData(mypw, pkBytes);

        PbRow pbr = new PbRow(Long.parseLong(id), surl, sname, stype, encId, encPw, rd.getTime(), System.currentTimeMillis(), memo);
        PbDbInterface pdi = PbDbManager.getInstance().getPbDbInterface();
        pdi.updateRow(pbr);

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
