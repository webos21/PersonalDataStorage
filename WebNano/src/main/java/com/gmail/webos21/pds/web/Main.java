package com.gmail.webos21.pds.web;

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
			String sitePath = (DEBUG) ? "../FrontEnd/build/" : args[0];

			File htdoc = new File(sitePath);
			System.out.println("htdoc = " + htdoc.getAbsolutePath());

			new PbWebServer("0.0.0.0", 28080, htdoc);
		} catch (IOException ioe) {
			System.err.println("Couldn't start server:\n" + ioe);
		}
	}
}
