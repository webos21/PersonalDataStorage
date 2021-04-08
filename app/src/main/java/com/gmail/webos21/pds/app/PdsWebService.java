package com.gmail.webos21.pds.app;

import android.app.Service;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.wifi.WifiManager;
import android.os.Binder;
import android.os.Environment;
import android.os.IBinder;
import android.text.format.Formatter;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.pds.web.PdsWebServer;

import java.io.File;
import java.io.IOException;

public class PdsWebService extends Service {

    private final static String WEB_ADDR_ANY = "0.0.0.0";

    private final IBinder mBinder = new PdsWebServiceBinder();

    private PdsWebServer webServer;

    private int port;

    private NotificationPlayer mNotificationPlayer;

    @Override
    public void onCreate() {
        super.onCreate();

        File exdir = Environment.getExternalStorageDirectory();
        File pwdir = getFilesDir();

        port = 9000 + ((int) (Math.random() * 1000));

        SharedPreferences shpref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        String passkey = shpref.getString(Consts.PREF_PASSKEY, "");

        try {
            webServer = new PdsWebServer(WEB_ADDR_ANY, port, passkey, pwdir, exdir);
        } catch (IOException e) {
            e.printStackTrace();
        }
        mNotificationPlayer = new NotificationPlayer(this);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            String action = intent.getAction();
            if (Consts.NOTI_ACT_PLAY.equals(action)) {
                if (isPlaying()) {
                    pause();
                } else {
                    play();
                }
            } else if (Consts.NOTI_ACT_CLOSE.equals(action)) {
                stop();
                removeNotificationPlayer();
            }
        }
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (webServer != null) {
            webServer.stop();
            webServer = null;
        }
        removeNotificationPlayer();
    }

    private void updateNotificationPlayer() {
        if (mNotificationPlayer != null) {
            mNotificationPlayer.updateNotificationPlayer();
        }
    }

    private void removeNotificationPlayer() {
        if (mNotificationPlayer != null) {
            mNotificationPlayer.removeNotificationPlayer();
            mNotificationPlayer = null;
        }
    }

    private void stop() {
        webServer.stop();
    }

    @SuppressWarnings("deprecation")
    public String getUri() {
        WifiManager wm = (WifiManager) getApplicationContext().getSystemService(WIFI_SERVICE);
        String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());

        return "http://" + ip + ":" + port + "/";
    }

    public boolean isPlaying() {
        return webServer.wasStarted();
    }

    public void play() {
        if (!webServer.wasStarted()) {
            try {
                webServer.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
            } catch (IOException e) {
                e.printStackTrace();
            }
            sendBroadcast(new Intent(Consts.NOTI_ACT_STATE_CHANGED)); // 서비스 상태 변경 전송
            updateNotificationPlayer();
        }
    }

    public void pause() {
        if (webServer.wasStarted()) {
            webServer.stop();
            sendBroadcast(new Intent(Consts.NOTI_ACT_STATE_CHANGED)); // 서비스 상태 변경 전송
            updateNotificationPlayer();
        }
    }

    public class PdsWebServiceBinder extends Binder {
        PdsWebService getService() {
            return PdsWebService.this;
        }
    }
}
