package com.gmail.webos21.pds.web;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.pds.web.db.PbDbManager;

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

			PbDbManager dbMan = PbDbManager.getInstance();
			dbMan.open(Consts.DB_PATH, Consts.DB_USER, Consts.DB_PASS, Consts.DB_VERSION);

			PbWebServer ws = new PbWebServer("0.0.0.0", 28080, htdoc);
			ws.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
		} catch (IOException ioe) {
			System.err.println("Couldn't start server:\n" + ioe);
		}
	}
}
