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

    private PdsWebHelper pwh;
    private boolean loginRequired = true;

    @Override
    public void onCreate() {
        super.onCreate();
        if (Consts.DEBUG) {
            Log.i(TAG, "onCreate!!!!!!");
        }

        pwh = new PdsWebHelper(getApplicationContext());
        dbOpen();
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        if (Consts.DEBUG) {
            Log.i(TAG, "onTerminate!!!!!!");
        }
        loginRequired = true;
    }

    public boolean isLoginRequired() {
        return loginRequired;
    }

    public void setLoginRequired(boolean flag) {
        this.loginRequired = flag;
    }

    public PdsWebHelper getPdsWebHelper() {
        return pwh;
    }

    public boolean isDbOpen() {
        PdsDbManager dbMan = PdsDbManager.getInstance();
        return dbMan.isOpen();
    }

    public void dbOpen() {
        PdsDbManager dbMan = PdsDbManager.getInstance();
        File dataDir = new File(getFilesDir(), "pds");
        dbMan.open(dataDir.getAbsolutePath(), DbConsts.DB_USER, DbConsts.DB_PASS, DbConsts.DB_OPTS, DbConsts.DB_VERSION);
    }

    public void dbClose() {
        PdsDbManager dbMan = PdsDbManager.getInstance();
        dbMan.close();
    }
}
