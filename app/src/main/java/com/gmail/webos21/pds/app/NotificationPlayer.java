package com.gmail.webos21.pds.app;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class NotificationPlayer {

    private PdsWebService mService;
    private String mChannelId;
    private boolean isForeground;

    public NotificationPlayer(PdsWebService service) {
        mService = service;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            mChannelId = createNotificationChannel(Consts.NOTI_CHANNEL, Consts.NOTI_CHANNEL_NAME);
        } else {
            mChannelId = Consts.NOTI_CHANNEL;
        }
    }

    @SuppressLint("StaticFieldLeak")
    public void updateNotificationPlayer() {
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                Intent actionPlay = new Intent(Consts.NOTI_ACT_PLAY);
                Intent actionClose = new Intent(Consts.NOTI_ACT_CLOSE);
                PendingIntent togglePlay = PendingIntent.getService(mService, 0, actionPlay, 0);
                PendingIntent close = PendingIntent.getService(mService, 0, actionClose, 0);

                NotificationCompat.Builder builder = new NotificationCompat.Builder(mService, mChannelId);
                builder
                        .setContentTitle("[PDS Web Service]")
                        .setContentText(mService.getUri())
                        .setContentIntent(PendingIntent.getActivity(mService, 0, new Intent(mService, MainActivity.class), 0));

                builder.addAction(new NotificationCompat.Action(mService.isPlaying() ? android.R.drawable.ic_media_pause : android.R.drawable.ic_media_play, "Play", togglePlay));
                builder.addAction(new NotificationCompat.Action(android.R.drawable.ic_menu_close_clear_cancel, "Close", close));
                int[] actionsViewIndexs = new int[]{0, 1};
                builder.setStyle(new androidx.media.app.NotificationCompat.MediaStyle().setShowActionsInCompactView(actionsViewIndexs));
                builder.setSmallIcon(R.mipmap.ic_launcher);

                Notification notification = builder.build();

                NotificationManagerCompat.from(mService).notify(Consts.NOTI_PLAYER_ID, notification);

                if (!isForeground) {
                    isForeground = true;
                    // 서비스를 Foreground 상태로 만든다
                    mService.startForeground(Consts.NOTI_PLAYER_ID, notification);
                }

                return null;
            }
        }.execute();
    }

    public void removeNotificationPlayer() {
        mService.stopForeground(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            deleteNotificationChannel(mChannelId);
        }
        isForeground = false;
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private String createNotificationChannel(String channelId, String channelName) {
        NotificationChannel chan = new NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_NONE);
        chan.setLightColor(Color.BLUE);
        chan.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        NotificationManager nm = (NotificationManager) mService.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.createNotificationChannel(chan);
        return channelId;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void deleteNotificationChannel(String channelId) {
        NotificationManager nm = (NotificationManager) mService.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.deleteNotificationChannel(channelId);
    }

}
