package com.gmail.webos21.pds.app.db;

import android.os.AsyncTask;
import android.util.Log;

import com.gmail.webos21.pds.app.Consts;
import com.gmail.webos21.pds.app.crypt.PbCryptHelper;
import com.gmail.webos21.pds.db.model.PbRow;
import com.gmail.webos21.pds.db.repo.PbRepo;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class PbExporter extends AsyncTask<Void, Void, Void> {

    private static final String TAG = "PbExporter";

    private PbRepo pbRepo;
    private File csvFile;
    private byte[] pkBytes;

    private Runnable postRun;

    public PbExporter(PbRepo pbRepo, File csvFile, byte[] pkBytes, Runnable postRun) {
        this.pbRepo = pbRepo;
        this.csvFile = csvFile;
        this.pkBytes = pkBytes;
        this.postRun = postRun;
    }

    @Override
    protected Void doInBackground(Void... voids) {
        BufferedWriter bwo = null;
        List<PbRow> pblist = pbRepo.findRows();
        StringBuffer sb = new StringBuffer();

        try {
            bwo = new BufferedWriter(new FileWriter(csvFile));
            for (PbRow pbrow : pblist) {
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

    private String makeLine(PbRow pbRow, StringBuffer sb, byte[] decKey) {
        sb.delete(0, sb.length());

        String decId = PbCryptHelper.decData(pbRow.getMyId(), decKey);
        String decPw = PbCryptHelper.decData(pbRow.getMyPw(), decKey);

        sb.append(Long.toString(pbRow.getId())).append(',');
        sb.append(pbRow.getSiteUrl()).append(',');
        sb.append(pbRow.getSiteName()).append(',');
        sb.append(pbRow.getSiteType()).append(',');
        sb.append(decId).append(',');
        sb.append(decPw).append(',');
        sb.append(Consts.SDF_DATE.format(pbRow.getRegDate())).append(',');
        sb.append(Consts.SDF_DATE.format(pbRow.getFixDate())).append(',');
        String memo = (pbRow.getMemo() == null || pbRow.getMemo().length() == 0) ? "null" : pbRow.getMemo();
        sb.append(memo);
        sb.append("\r\n");

        return sb.toString();
    }
}
