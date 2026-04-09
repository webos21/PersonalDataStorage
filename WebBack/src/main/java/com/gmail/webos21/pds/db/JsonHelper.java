package com.gmail.webos21.pds.db;

public class JsonHelper {
	public static String escape(String str) {
		if (str == null || str.length() == 0) {
			return "";
		}
		return str.replaceAll("\\n", "\\\\n").replaceAll("\\r", "\\\\r").replaceAll("\\t", "\\\\t").replaceAll("\"",
				"\\\\\"");
	}
}
