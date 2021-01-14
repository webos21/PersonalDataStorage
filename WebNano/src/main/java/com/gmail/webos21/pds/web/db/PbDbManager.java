package com.gmail.webos21.pds.web.db;

public class PbDbManager {

    private static volatile PbDbManager instance;

    private PbDbHelper dbHelper;

    private PbDbManager() {
    }

    public static PbDbManager getInstance() {
        if (instance != null) {
            return instance;
        }
        synchronized (PbDbManager.class) {
            if (instance != null) {
                return instance;
            }
            instance = new PbDbManager();
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

    public void open(String dbPath, String dbUser, String dbPass, int dbVersion) {
        this.dbHelper = new PbDbHelper(dbPath, dbUser, dbPass, dbVersion);
    }

    public void close() {
        if (this.dbHelper != null) {
            this.dbHelper.close();
            this.dbHelper = null;
        }
    }

    public PbDbInterface getPbDbInterface() {
        return this.dbHelper;
    }
}
