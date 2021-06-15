package com.gmail.webos21.pds.app;

import android.content.Intent;
import android.net.Uri;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.text.method.ScrollingMovementMethod;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.gmail.webos21.android.async.TaskRunner;
import com.gmail.webos21.pds.app.web.StaticResourceExtractor;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.concurrent.Executors;

public class NanoActivity extends AppCompatActivity {

    private final static String NO_SERVICE = "NO SERVICE!!";
    private final static int WEB_PORT = 9999;

    private TextView tvIpAddr;
    private TextView tvLog;

    private Switch swPbWeb;
    private Switch swDirWeb;

    private DirWebSwitchListener dwsl;
    private PbWebSwitchListener pwsl;

    private File pwdir;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nano);

        tvIpAddr = findViewById(R.id.tv_ip_addr);
        tvLog = findViewById(R.id.tv_log);

        dwsl = new DirWebSwitchListener();
        pwsl = new PbWebSwitchListener();

        swPbWeb = findViewById(R.id.sw_pb_web);
        swDirWeb = findViewById(R.id.sw_dir_web);

        swPbWeb.setOnCheckedChangeListener(pwsl);
        swDirWeb.setOnCheckedChangeListener(dwsl);

        tvLog.setText("");
        tvLog.setMovementMethod(new ScrollingMovementMethod());

        pwdir = getFilesDir();

        tvIpAddr.setText(NanoActivity.NO_SERVICE);
    }

    @Override
    protected void onStart() {
        super.onStart();

        File indexHtml = new File(pwdir, "index.html");
        if (true || !indexHtml.exists()) {
            TaskRunner tr = new TaskRunner(Executors.newSingleThreadExecutor());
            tr.executeAsync(new StaticResourceExtractor(this, "static", pwdir.getPath()));
        }

        PdsApp app = (PdsApp) getApplicationContext();
        PdsWebHelper pwh = app.getPdsWebHelper();

        swPbWeb.setOnCheckedChangeListener(null);
        if (pwh.isPlaying()) {
            String addr = pwh.getUri();
            NanoActivity.this.tvIpAddr.setText(addr);
            swPbWeb.setChecked(true);
        } else {
            swPbWeb.setChecked(false);
        }
        swPbWeb.setOnCheckedChangeListener(pwsl);

    }

    @Override
    protected void onStop() {
        super.onStop();
        if (swDirWeb.isChecked()) {
            swDirWeb.setChecked(false);
        }
    }

    private String getIpAddress() {
        WifiManager wm = (WifiManager) getApplicationContext().getSystemService(WIFI_SERVICE);
        String ip = null;
        try {
            ByteBuffer bb = ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN);
            byte[] hostAddr = bb.putInt(wm.getConnectionInfo().getIpAddress()).array();
            ip = InetAddress.getByAddress(hostAddr).getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return ip;
    }

    @RequiresApi(Build.VERSION_CODES.R)
    private boolean hasAllFilesPermission() {
        return Environment.isExternalStorageManager();
    }

    private class DirWebSwitchListener implements Switch.OnCheckedChangeListener {
        @Override
        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
            if (isChecked) {
                String addr = "http://" + getIpAddress() + ":" + NanoActivity.WEB_PORT + "/";
                NanoActivity.this.tvIpAddr.setText(addr);
            } else {
                NanoActivity.this.tvIpAddr.setText(NanoActivity.NO_SERVICE);
            }
        }
    }

    private class PbWebSwitchListener implements Switch.OnCheckedChangeListener {
        @Override
        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
            PdsApp app = (PdsApp) getApplicationContext();
            PdsWebHelper pwh = app.getPdsWebHelper();
            if (isChecked) {
                if (Build.VERSION.SDK_INT >= 30 && !NanoActivity.this.hasAllFilesPermission()) {
                        Uri uri = Uri.parse("package:" + BuildConfig.APPLICATION_ID);
                        Intent i = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, uri);
                        startActivity(i);
                } else {
                    NanoActivity.this.tvIpAddr.setText("알림 영역을 확인해 주세요.");
                    pwh.play();
                }
            } else {
                NanoActivity.this.tvIpAddr.setText(NanoActivity.NO_SERVICE);
                pwh.close();
            }
        }
    }

}
