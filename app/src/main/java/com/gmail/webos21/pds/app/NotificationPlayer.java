package com.gmail.webos21.pds.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.gmail.webos21.android.async.TaskRunner;
import com.gmail.webos21.pds.app.async.NotificationUpdater;

import java.util.concurrent.Executors;

public class NotificationPlayer {

    private static final String TAG = "NotificationPlayer";

    private final PdsWebService pws;
    private final TaskRunner tr;
    private String chId;
    private boolean fg;

    public NotificationPlayer(PdsWebService service) {
        Log.i(TAG, "[NotificationPlayer::constructor] called...");

        pws = service;
        tr = new TaskRunner(Executors.newSingleThreadExecutor());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            chId = createNotificationChannel();
        } else {
            chId = Consts.NOTI_CHANNEL;
        }
    }

    public void updateNotificationPlayer() {
        Log.i(TAG, "[NotificationPlayer::updateNotificationPlayer] called...");
        tr.executeAsync(new NotificationUpdater(pws, chId, fg));
    }

    @SuppressWarnings("deprecation")
    public void removeNotificationPlayer() {
        Log.i(TAG, "[NotificationPlayer::removeNotificationPlayer] called...");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            pws.stopForeground(Service.STOP_FOREGROUND_REMOVE);
            deleteNotificationChannel(chId);
        } else {
            pws.stopForeground(true);
        }
        chId = null;
        fg = false;
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private String createNotificationChannel() {
        NotificationChannel nch = new NotificationChannel(Consts.NOTI_CHANNEL, Consts.NOTI_CHANNEL_NAME, NotificationManager.IMPORTANCE_NONE);
        nch.setLightColor(Color.BLUE);
        nch.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        NotificationManager nm = (NotificationManager) pws.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.createNotificationChannel(nch);
        return Consts.NOTI_CHANNEL;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void deleteNotificationChannel(String channelId) {
        NotificationManager nm = (NotificationManager) pws.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.deleteNotificationChannel(channelId);
    }

}
