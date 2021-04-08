package com.gmail.webos21.pds.web;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.web.log.ConsoleLog;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;

public class Main {

    public static void main(String[] args) {
        String sitePath = "../WebFront/build/";
        String fsPath = "/";
        String dbPath = DbConsts.DB_PATH;
        String dbUser = DbConsts.DB_USER;
        String dbPass = DbConsts.DB_PASS;
        String dbOpts = DbConsts.DB_OPTS;
        int dbVersion = DbConsts.DB_VERSION;

        if (args.length > 0) {
            sitePath = args[0];
        }
        if (args.length > 1) {
            fsPath = args[1];
        }
        if (args.length > 2) {
            dbPath = args[2];
        }
        if (args.length > 3) {
            dbUser = args[3];
        }
        if (args.length > 4) {
            dbPass = args[4];
        }
        if (args.length > 5) {
            dbOpts = args[5];
        }
        if (args.length > 6) {
            dbVersion = Integer.parseInt(args[6]);
        }

        System.out.println("####################################");
        System.out.println("# Current Working Parameter)");
        String cmdline = String.format("#   java -jar PersonalDataStorage.jar \"%s\" \"%s\" \"%s\" \"%s\" \"%s\" \"%s\" %d",
                sitePath, fsPath, dbPath, dbUser, dbPass, dbOpts, dbVersion);
        System.out.println(cmdline);
        System.out.println("------------------------------------");
        System.out.println("# You can change the any parameters referencing the above command line.");
        System.out.println("####################################\n");

        try {
            File htdoc = new File(sitePath);
            File fs = new File(fsPath);

            PdsDbManager dbMan = PdsDbManager.getInstance();
            dbMan.open(dbPath, dbUser, dbPass, dbOpts, dbVersion);

            String accessCode = OnetimePass.genOtp();

            InetAddress ip = InetAddress.getLocalHost();
            System.out.println("Access with web-browser) http://" + ip.getHostAddress() + ":28080/");
            System.out.println("            Access Code) " + accessCode);

            PdsWebServer ws = new PdsWebServer("0.0.0.0", 28080, OnetimePass.encryptOtp(accessCode), htdoc, fs);
            ws.setUiLog(new ConsoleLog());
            ws.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);

        } catch (IOException ioe) {
            System.err.println("Couldn't start server:\n" + ioe);
        }
    }
}
