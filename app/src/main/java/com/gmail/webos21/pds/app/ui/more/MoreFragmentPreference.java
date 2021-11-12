package com.gmail.webos21.pds.app.ui.more;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceFragmentCompat;

import com.gmail.webos21.pds.app.R;

public class MoreFragmentPreference extends PreferenceFragmentCompat implements SharedPreferences.OnSharedPreferenceChangeListener {

    private static final String TAG = "MoreFragmentPreference";

    private String name;

    private int getPreferencesByCategory(String s) {
        if ("about".equals(s)) {
            return R.xml.more_about;
        }
        if ("test".equals(s)) {
            return R.xml.more_screen;
        }
        return -1;
    }

    @Override
    public void onCreatePreferences(Bundle savedInstanceState, String rootKey) {

        Log.d(TAG, "savedInstanceState = " + savedInstanceState);
        Log.d(TAG, "rootKey = " + rootKey);

        this.name = rootKey;

        int rId = getPreferencesByCategory(name);
        setPreferencesFromResource(rId, null);

        switch (rId) {
            case R.xml.more_about: {
                break;
            }
            case R.xml.more_screen: {
                break;
            }
            default:
                break;
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        getPreferenceScreen().getSharedPreferences().unregisterOnSharedPreferenceChangeListener(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        getPreferenceScreen().getSharedPreferences().registerOnSharedPreferenceChangeListener(this);
    }

    @Override
    public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
        Log.d(TAG, "SharedPreferences = " + sharedPreferences + " / key =" + key);
    }

}
