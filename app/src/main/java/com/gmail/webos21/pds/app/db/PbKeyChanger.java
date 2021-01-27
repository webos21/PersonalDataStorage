package com.gmail.webos21.pds.app.db;

import android.os.AsyncTask;

import com.gmail.webos21.pds.app.crypt.PbCryptHelper;
import com.gmail.webos21.pds.db.domain.PasswordBook;
import com.gmail.webos21.pds.db.repo.PasswordBookRepo;

import java.util.List;

public class PbKeyChanger extends AsyncTask<Void, Void, Void> {

    private static final String TAG = "PbKeyChanger";

    private PasswordBookRepo pbRepo;
    private byte[] oldKey;
    private byte[] newKey;

    private Runnable postRun;

    public PbKeyChanger(PasswordBookRepo pbRepo, byte[] oldKey, byte[] newKey, Runnable postRun) {
        this.pbRepo = pbRepo;
        this.oldKey = oldKey;
        this.newKey = newKey;
        this.postRun = postRun;
    }

    @Override
    protected Void doInBackground(Void... voids) {
        List<PasswordBook> pblist = pbRepo.findRows();

        for (PasswordBook pbrow : pblist) {
            String oldId = pbrow.getMyId();
            String oldPw = pbrow.getMyPw();

            String orgId = PbCryptHelper.decData(oldId, oldKey);
            String orgPw = PbCryptHelper.decData(oldPw, oldKey);

            String newId = PbCryptHelper.encData(orgId, newKey);
            String newPw = PbCryptHelper.encData(orgPw, newKey);

            pbrow.setMyId(newId);
            pbrow.setMyPw(newPw);

            pbRepo.updateRow(pbrow);
        }

        oldKey = null;
        newKey = null;
        pbRepo = null;

        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        super.onPostExecute(aVoid);
        postRun.run();
    }

}
