package com.gmail.webos21.pds.app.db;

import android.os.AsyncTask;
import android.util.Log;

import com.gmail.webos21.pds.app.Consts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.domain.PasswordBook;
import com.gmail.webos21.pds.db.repo.PasswordBookRepo;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;

public class PbImporter extends AsyncTask<Void, Void, Void> {

    private static final String TAG = "PbImporter";

    private PasswordBookRepo pbRepo;
    private File csvFile;

    private Runnable postRun;

    public PbImporter(PasswordBookRepo pbRepo, File csvFile, Runnable postRun) {
        this.pbRepo = pbRepo;
        this.csvFile = csvFile;
        this.postRun = postRun;
    }

    @Override
    protected Void doInBackground(Void... voids) {
        BufferedReader bri = null;
        try {
            bri = new BufferedReader(new FileReader(csvFile));
            String s;

            while ((s = bri.readLine()) != null) {
                if (Consts.DEBUG) {
                    Log.i(TAG, "[FileRead] " + s);
                }
                processLine(pbRepo, s);
            }

            bri.close();
            bri = null;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bri != null) {
                try {
                    bri.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                bri = null;
            }
        }
        pbRepo = null;

        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);
        postRun.run();
    }

    private void processLine(PasswordBookRepo pbRepo, String s) {
        String[] strArr = s.split(",");

        Long id = null;
        String surl = null;
        Date regdate = null;
        Date fixdate = null;
        String stype = null;
        String myid = null;
        String mypw = null;
        String sname = null;
        String memo = null;

        if (strArr.length == 7) {
            surl = strArr[0];
            if ("null".equals(strArr[1])) {
                regdate = new Date(0);
            } else {
                try {
                    regdate = Consts.SDF_DATE.parse(strArr[1]);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            fixdate = new Date();
            stype = strArr[2];
            myid = strArr[3];
            mypw = strArr[4];
            sname = strArr[5];
            memo = ("null".equals(strArr[6]) ? "" : strArr[6]);
        } else if (strArr.length == 8) {
            id = Long.parseLong(strArr[0]);
            surl = strArr[1];
            sname = strArr[2];
            stype = strArr[3];
            myid = strArr[4];
            mypw = strArr[5];
            if ("null".equals(strArr[6])) {
                regdate = new Date(0);
            } else {
                try {
                    regdate = Consts.SDF_DATE.parse(strArr[6]);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            fixdate = new Date();
            memo = ((strArr[7] == null || strArr[7].length() == 0 || "null".equals(strArr[7])) ? "" : strArr[7]);
        } else if (strArr.length == 9) {
            id = Long.parseLong(strArr[0]);
            surl = strArr[1];
            sname = strArr[2];
            stype = strArr[3];
            myid = strArr[4];
            mypw = strArr[5];
            if ("null".equals(strArr[6])) {
                regdate = new Date(0);
            } else {
                try {
                    regdate = Consts.SDF_DATE.parse(strArr[6]);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            if ("null".equals(strArr[7])) {
                fixdate = new Date();
            } else {
                try {
                    fixdate = Consts.SDF_DATE.parse(strArr[7]);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            memo = ((strArr[8] == null || strArr[8].length() == 0 || "null".equals(strArr[8])) ? "" : strArr[8]);
        } else {
            return;
        }

        PasswordBook pbrow = new PasswordBook(id, surl, sname, stype, myid, mypw, regdate.getTime(), fixdate.getTime(), memo);
        pbRepo.updateRow(pbrow);
    }
}
