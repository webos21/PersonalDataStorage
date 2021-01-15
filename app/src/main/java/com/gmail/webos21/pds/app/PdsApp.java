package com.gmail.webos21.pds.app;

import android.app.Application;
import android.util.Log;

import androidx.appcompat.app.AppCompatDelegate;

import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbManager;

import java.io.File;

public class PdsApp extends Application {

    private static final String TAG = "PdsApp";

    static {
        AppCompatDelegate.setCompatVectorFromResourcesEnabled(true);
    }

    private byte[] pkBytes;

    @Override
    public void onCreate() {
        super.onCreate();
        if (Consts.DEBUG) {
            Log.i(TAG, "onCreate!!!!!!");
        }

        PdsDbManager dbMan = PdsDbManager.getInstance();
        File dataDir = new File(getFilesDir(), "pds");
        dbMan.open(dataDir.getAbsolutePath(), DbConsts.DB_USER, DbConsts.DB_PASS, DbConsts.DB_OPTS, DbConsts.DB_VERSION);
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        if (Consts.DEBUG) {
            Log.i(TAG, "onTerminate!!!!!!");
        }
        pkBytes = null;
    }

    public byte[] getPkBytes() {
        return pkBytes;
    }

    public void setPkBytes(byte[] pkBytes) {
        this.pkBytes = pkBytes;
    }

}
