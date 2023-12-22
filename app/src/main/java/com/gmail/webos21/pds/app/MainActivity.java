package com.gmail.webos21.pds.app;

import android.Manifest;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.gmail.webos21.pds.app.databinding.ActivityMainBinding;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private ActivityMainBinding binding;

    private ActivityResultLauncher<Intent> authCfgLauncher;
    private ActivityResultLauncher<Intent> loginLauncher;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        SharedPreferences shpref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        getDelegate().setLocalNightMode(shpref.getInt(Consts.PREF_THEME, -1));

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        BottomNavigationView navView = findViewById(R.id.nav_view);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_dashboard, R.id.navigation_statistics, R.id.navigation_webservice, R.id.navigation_more)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_activity_main);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(binding.navView, navController);


        authCfgLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                (result) -> {
                    if (result.getResultCode() != RESULT_OK) {
                        finish();
                    }
                }
        );

        loginLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                (result) -> {
                    Log.i(TAG, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    Log.i(TAG, "result.getResultCode() = " + result.getResultCode());

                    if (result.getResultCode() == RESULT_OK) {
                        PdsApp app = (PdsApp) getApplicationContext();
                        app.setLoginRequired(false);
                    } else {
                        MainActivity.this.finish();
                    }
                });


    }

    @Override
    protected void onStart() {
        super.onStart();

        PdsApp app = (PdsApp) getApplicationContext();

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart!!!!!!!!!!!!!" + app.isLoginRequired());
        }

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart::CheckPassKey");
        }
        // Check the Passkey
        SharedPreferences pref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        String passkey = pref.getString(Consts.PREF_PASSKEY, "");
        if (passkey == null || passkey.length() == 0) {
            Intent i = new Intent(this, AuthConfigActivity.class);
            authCfgLauncher.launch(i);
            return;
        }

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart::CheckLogin");
        }
        // Check the flag of LOGIN
        if (app.isLoginRequired()) {
            Intent i = new Intent(this, AuthActivity.class);
            loginLauncher.launch(i);
            return;
        }

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart::RequestPermission");
        }
        // Request Permission : WRITE_EXTERNAL_STORAGE
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    Consts.PERM_REQ_EXTERNAL_STORAGE);
            return;
        }

        // Request Permission : ACCESS_FINE_LOCATION
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    Consts.PERM_REQ_FINE_LOCATION);
            return;
        }

        // Request Permission : ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            if (!hasAllFilesPermission()) {
                Uri uri = Uri.parse("package:" + BuildConfig.APPLICATION_ID);
                Intent i = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, uri);
                startActivity(i);
            }
        }

        // Request Permission : ACTION_MANAGE_WRITE_SETTINGS
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.System.canWrite(this)) {
                Intent intent = new Intent(android.provider.Settings.ACTION_MANAGE_WRITE_SETTINGS);
                intent.setData(Uri.parse("package:" + this.getPackageName()));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        }
    }


    @Override
    protected void onStop() {
        super.onStop();

        if (Consts.DEBUG) {
            Log.i(TAG, "onStop!!!!!!!!!!!!!");
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (Consts.DEBUG) {
            Log.i(TAG, "onDestroy!!!!!!!!!!!!!");
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (Consts.DEBUG) {
            Log.i(TAG, "onRequestPermissionsResult!!!!!!!!!!!!!");
        }
        if (requestCode == Consts.PERM_REQ_EXTERNAL_STORAGE) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // OK, nothing to do
            } else {
                Toast.makeText(this, getResources().getString(R.string.err_perm_exflah), Toast.LENGTH_LONG).show();
                finish();
            }
        }
        if (requestCode == Consts.PERM_REQ_FINE_LOCATION) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // OK, nothing to do
            } else {
                Toast.makeText(this, getResources().getString(R.string.err_perm_location), Toast.LENGTH_LONG).show();
                finish();
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem menuitem) {
        int mId = menuitem.getItemId();
        switch (mId) {
            case android.R.id.home:
                getOnBackPressedDispatcher().onBackPressed();
                return true;
            default:
                break;
        }
        return false;
    }


    @RequiresApi(api = Build.VERSION_CODES.R)
    private boolean hasAllFilesPermission() {
        return Environment.isExternalStorageManager();
    }

}