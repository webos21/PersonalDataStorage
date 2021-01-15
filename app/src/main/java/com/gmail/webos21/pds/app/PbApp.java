package com.gmail.webos21.pds.app;

import android.app.Application;
import android.os.Environment;
import android.util.Log;

import androidx.appcompat.app.AppCompatDelegate;

import com.gmail.webos21.pds.web.db.PbDbManager;

import java.io.File;

public class PbApp extends Application {

    private static final String TAG = "PbApp";

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

        PbDbManager dbMan = PbDbManager.getInstance();
        File dataDir = new File(getFilesDir(), "pds");
        dbMan.open(dataDir.getAbsolutePath(), "sa", "filekey sa", Consts.DB_VERSION);
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
