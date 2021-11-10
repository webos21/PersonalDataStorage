package com.gmail.webos21.pds.app;

import java.text.SimpleDateFormat;

public class Consts {

    public static final boolean DEBUG = true;

    public static final int PERM_REQ_EXTERNAL_STORAGE = 101;

    public static final String EXTRA_ARG_ID = "com.gmail.webos21.pb.id";

    public static final String PREF_FILE = "pb_pref";
    public static final String PREF_PASSKEY = "pref_passkey";
    public static final String PREF_SHOW_ICON = "pref_show_icon";
    public static final String PREF_FINGER = "pref_finger";
    public static final String PREF_THEME = "pref_theme";

    public static final int NOTI_PLAYER_ID = 0x4e534450;
    public static final String NOTI_CHANNEL = "com.gmail.webos21.pds.app.web.channel";
    public static final String NOTI_CHANNEL_NAME = "PDS Web Notification Channel";

    public static final String NOTI_ACT_PLAY = "com.gmail.webos21.pds.app.action.PLAY";
    public static final String NOTI_ACT_CLOSE = "com.gmail.webos21.pds.app.action.CLOSE";
    public static final String NOTI_ACT_STATE_CHANGED = "com.gmail.webos21.pds.app.action.STATE_CHANGED";

    public static final SimpleDateFormat SDF_DATE = new SimpleDateFormat("yyyy-MM-dd");
    public static final SimpleDateFormat SDF_TIME = new SimpleDateFormat("HH:mm:ss");
    public static final SimpleDateFormat SDF_DATETIME = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

}
