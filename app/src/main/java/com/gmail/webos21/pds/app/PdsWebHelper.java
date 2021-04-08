package com.gmail.webos21.pds.app;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;

public class PdsWebHelper {
    private ServiceConnection mServiceConnection;
    private PdsWebService mService;

    public PdsWebHelper(Context context) {
        mServiceConnection = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                mService = ((PdsWebService.PdsWebServiceBinder) service).getService();
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                mServiceConnection = null;
                mService = null;
            }
        };
        context.bindService(new Intent(context, PdsWebService.class).setPackage(context.getPackageName()), mServiceConnection, Context.BIND_AUTO_CREATE);
    }

    public void play() {
        if (mService != null) {
            mService.play();
        }
    }

    public void togglePlay() {
        if (isPlaying()) {
            mService.pause();
        } else {
            mService.play();
        }
    }

    public boolean isPlaying() {
        if (mService != null) {
            return mService.isPlaying();
        }
        return false;
    }

    public void pause() {
        if (mService != null) {
            mService.pause();
        }
    }

    public String getUri() {
        if (mService != null) {
            return mService.getUri();
        } else {
            return "";
        }
    }

}