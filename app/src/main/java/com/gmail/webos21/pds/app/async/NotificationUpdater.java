package com.gmail.webos21.pds.app.async;

import android.app.Notification;
import android.app.PendingIntent;
import android.content.Intent;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.gmail.webos21.pds.app.Consts;
import com.gmail.webos21.pds.app.MainActivity;
import com.gmail.webos21.pds.app.PdsWebService;
import com.gmail.webos21.pds.app.R;

import java.util.concurrent.Callable;

public class NotificationUpdater implements Callable<Void> {

    private PdsWebService service;
    private String channelId;
    private boolean foreground;

    public NotificationUpdater(PdsWebService svc, String chId, boolean fg) {
        this.service = svc;
        this.channelId = chId;
        this.foreground = fg;
    }

    @Override
    public Void call() {
        Intent actionPlay = new Intent(Consts.NOTI_ACT_PLAY);
        Intent actionClose = new Intent(Consts.NOTI_ACT_CLOSE);
        PendingIntent togglePlay = PendingIntent.getService(service, 0, actionPlay, 0);
        PendingIntent close = PendingIntent.getService(service, 0, actionClose, 0);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(service, channelId);
        builder
                .setContentTitle("[PDS Web Service]")
                .setContentText(service.getUri())
                .setContentIntent(PendingIntent.getActivity(service, 0, new Intent(service, MainActivity.class), 0));

        builder.addAction(new NotificationCompat.Action(service.isPlaying() ? android.R.drawable.ic_media_pause : android.R.drawable.ic_media_play, "Play", togglePlay));
        builder.addAction(new NotificationCompat.Action(android.R.drawable.ic_menu_close_clear_cancel, "Close", close));
        int[] actionsViewIndexs = new int[]{0, 1};
        builder.setStyle(new androidx.media.app.NotificationCompat.MediaStyle().setShowActionsInCompactView(actionsViewIndexs));
        builder.setSmallIcon(R.mipmap.ic_launcher);

        Notification notification = builder.build();

        NotificationManagerCompat.from(service).notify(Consts.NOTI_PLAYER_ID, notification);

        if (!foreground) {
            // 서비스를 Foreground 상태로 만든다
            service.startForeground(Consts.NOTI_PLAYER_ID, notification);
        }

        return null;
    }
}

