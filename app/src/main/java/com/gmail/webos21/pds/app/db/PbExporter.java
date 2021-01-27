package com.gmail.webos21.pds.app.db;

import android.os.AsyncTask;
import android.util.Log;

import com.gmail.webos21.pds.app.Consts;
import com.gmail.webos21.pds.app.crypt.PbCryptHelper;
import com.gmail.webos21.pds.db.domain.PasswordBook;
import com.gmail.webos21.pds.db.repo.PasswordBookRepo;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class PbExporter extends AsyncTask<Void, Void, Void> {

    private static final String TAG = "PbExporter";

    private PasswordBookRepo pbRepo;
    private File csvFile;
    private byte[] pkBytes;

    private Runnable postRun;

    public PbExporter(PasswordBookRepo pbRepo, File csvFile, byte[] pkBytes, Runnable postRun) {
        this.pbRepo = pbRepo;
        this.csvFile = csvFile;
        this.pkBytes = pkBytes;
        this.postRun = postRun;
    }

    @Override
    protected Void doInBackground(Void... voids) {
        BufferedWriter bwo = null;
        List<PasswordBook> pblist = pbRepo.findRows();
        StringBuffer sb = new StringBuffer();

        try {
            bwo = new BufferedWriter(new FileWriter(csvFile));
            for (PasswordBook pbrow : pblist) {
                String l = makeLine(pbrow, sb, pkBytes);
                if (Consts.DEBUG) {
                    Log.i(TAG, l);
                }
                bwo.write(l);
            }
            bwo.close();
            bwo = null;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bwo != null) {
                try {
                    bwo.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                bwo = null;
            }
        }

        sb = null;
        pbRepo = null;

        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);
        postRun.run();
    }

    private String makeLine(PasswordBook passwordBook, StringBuffer sb, byte[] decKey) {
        sb.delete(0, sb.length());

        String decId = PbCryptHelper.decData(passwordBook.getMyId(), decKey);
        String decPw = PbCryptHelper.decData(passwordBook.getMyPw(), decKey);

        sb.append(Long.toString(passwordBook.getId())).append(',');
        sb.append(passwordBook.getSiteUrl()).append(',');
        sb.append(passwordBook.getSiteName()).append(',');
        sb.append(passwordBook.getSiteType()).append(',');
        sb.append(decId).append(',');
        sb.append(decPw).append(',');
        sb.append(Consts.SDF_DATE.format(passwordBook.getRegDate())).append(',');
        sb.append(Consts.SDF_DATE.format(passwordBook.getFixDate())).append(',');
        String memo = (passwordBook.getMemo() == null || passwordBook.getMemo().length() == 0) ? "null" : passwordBook.getMemo();
        sb.append(memo);
        sb.append("\r\n");

        return sb.toString();
    }
}
