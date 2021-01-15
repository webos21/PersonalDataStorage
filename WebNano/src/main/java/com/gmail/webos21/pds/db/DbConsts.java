package com.gmail.webos21.pds.db;

import java.text.SimpleDateFormat;

public class DbConsts {
    public static final boolean DB_DEBUG = true;

    public static final String DB_PATH = "~/pds";
    public static final String DB_USER = "sa";
    public static final String DB_PASS = "filekey sa";
    public static final String DB_OPTS = ";CIPHER=AES;TRACE_LEVEL_FILE=0;TRACE_LEVEL_SYSTEM_OUT=0";

    public static final int DB_VERSION = 1;

    public static final SimpleDateFormat SDF_DATE = new SimpleDateFormat("yyyy-MM-dd");

}
