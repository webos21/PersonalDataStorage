package com.gmail.webos21.pds.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.gmail.webos21.pds.app.async.NotificationUpdater;

public class NotificationPlayer {

    private static final String TAG = "NotificationPlayer";

    private PdsWebService pws;
    private String chId;
    private boolean fg;

    public NotificationPlayer(PdsWebService service) {
        Log.i(TAG, "[NotificationPlayer::constructor] called...");

        pws = service;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            chId = createNotificationChannel(Consts.NOTI_CHANNEL, Consts.NOTI_CHANNEL_NAME);
        } else {
            chId = Consts.NOTI_CHANNEL;
        }
    }

    public void updateNotificationPlayer() {
        Log.i(TAG, "[NotificationPlayer::updateNotificationPlaer] called...");
        new NotificationUpdater(pws, chId, fg).execute();
    }

    public void removeNotificationPlayer() {
        Log.i(TAG, "[NotificationPlayer::removeNotificationPlayer] called...");
        pws.stopForeground(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            deleteNotificationChannel(chId);
        }
        chId = null;
        fg = false;
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private String createNotificationChannel(String channelId, String channelName) {
        NotificationChannel chan = new NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_NONE);
        chan.setLightColor(Color.BLUE);
        chan.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        NotificationManager nm = (NotificationManager) pws.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.createNotificationChannel(chan);
        return channelId;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void deleteNotificationChannel(String channelId) {
        NotificationManager nm = (NotificationManager) pws.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.deleteNotificationChannel(channelId);
    }

}
