package com.gmail.webos21.pds.db;

public class PdsDbManager {

    private static volatile PdsDbManager instance;

    private PdsDbHelper dbHelper;

    private PdsDbManager() {
    }

    public static PdsDbManager getInstance() {
        if (instance != null) {
            return instance;
        }
        synchronized (PdsDbManager.class) {
            if (instance != null) {
                return instance;
            }
            instance = new PdsDbManager();
        }
        return instance;
    }

    public void destroy() {
        if (dbHelper != null) {
            dbHelper.close();
            dbHelper = null;
        }
        if (instance != null) {
            instance = null;
        }
    }

    public void open(String dbPath, String dbUser, String dbPass, String dbOpts, int dbVersion) {
        this.dbHelper = new PdsDbHelper(dbPath, dbUser, dbPass, dbOpts, dbVersion);
    }

    public void close() {
        if (this.dbHelper != null) {
            this.dbHelper.close();
            this.dbHelper = null;
        }
    }

    public PdsDbInterface getPbDbInterface() {
        return this.dbHelper;
    }
}
