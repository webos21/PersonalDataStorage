package com.gmail.webos21.pds.app;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.util.Log;

public class PdsWebHelper {

    private static final String TAG = "PdsWebHelper";

    private ServiceConnection mServiceConnection;
    private PdsWebService mService;

    public PdsWebHelper(Context context) {
        mServiceConnection = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                Log.i(TAG, "[PdsWebHelper::ServiceConnection] onServiceConnected - " + name);
                mService = ((PdsWebService.PdsWebServiceBinder) service).getService();
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                Log.i(TAG, "[PdsWebHelper::ServiceConnection] onServiceDisconnected - " + name);
                mServiceConnection = null;
                mService = null;
            }
        };
        context.bindService(new Intent(context, PdsWebService.class).setPackage(context.getPackageName()), mServiceConnection, Context.BIND_AUTO_CREATE);
    }

    public void play() {
        Log.i(TAG, "[PdsWebHelper::play] mService = " + mService);
        if (mService != null) {
            mService.play();
        }
    }

    public boolean isPlaying() {
        Log.i(TAG, "[PdsWebHelper::isPlaying] mService = " + mService);
        if (mService != null) {
            return mService.isPlaying();
        }
        return false;
    }

    public void pause() {
        Log.i(TAG, "[PdsWebHelper::pause] mService = " + mService);
        if (mService != null) {
            mService.pause();
        }
    }

    public void close() {
        Log.i(TAG, "[PdsWebHelper::close] mService = " + mService);
        if (mService != null) {
            mService.close();
        }
    }

    public String getUri() {
        Log.i(TAG, "[PdsWebHelper::getUri] mService = " + mService);
        if (mService != null) {
            return mService.getUri();
        } else {
            return "";
        }
    }

}