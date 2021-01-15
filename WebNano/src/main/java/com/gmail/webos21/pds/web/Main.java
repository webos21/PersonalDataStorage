package com.gmail.webos21.pds.web;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbManager;

import java.io.File;
import java.io.IOException;

public class Main {

    public static final boolean DEBUG = true;

    public static void printUsage() {
        System.out.println("Usage)");
        System.out.println("    java -jar PersonalDataStorage.jar site_src_path db_url");
    }

    public static void main(String[] args) {
        if (args.length < 2) {
            printUsage();
            if (!DEBUG) {
                return;
            }
        }
        try {
            String sitePath = (DEBUG) ? "../WebFront/build/" : args[0];

            File htdoc = new File(sitePath);
            System.out.println("htdoc = " + htdoc.getAbsolutePath());

            PdsDbManager dbMan = PdsDbManager.getInstance();
            dbMan.open(DbConsts.DB_PATH, DbConsts.DB_USER, DbConsts.DB_PASS, DbConsts.DB_OPTS, DbConsts.DB_VERSION);

            PdsWebServer ws = new PdsWebServer("0.0.0.0", 28080, htdoc);
            ws.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        } catch (IOException ioe) {
            System.err.println("Couldn't start server:\n" + ioe);
        }
    }
}
