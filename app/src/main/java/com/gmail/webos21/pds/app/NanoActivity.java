package com.gmail.webos21.pds.app;

import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.text.format.Formatter;
import android.text.method.ScrollingMovementMethod;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.gmail.webos21.pds.app.web.StaticResourceExtractor;

import java.io.File;

public class NanoActivity extends AppCompatActivity {

    private final static String NO_SERVICE = "NO SERVICE!!";
    private final static String WEB_ADDR_ANY = "0.0.0.0";
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

        tvIpAddr = (TextView) findViewById(R.id.tv_ip_addr);
        tvLog = (TextView) findViewById(R.id.tv_log);

        dwsl = new DirWebSwitchListener();
        pwsl = new PbWebSwitchListener();

        swPbWeb = (Switch) findViewById(R.id.sw_pb_web);
        swDirWeb = (Switch) findViewById(R.id.sw_dir_web);

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
            new StaticResourceExtractor(this, "static", pwdir.getPath()).execute();
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
        String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());
        return ip;
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
                pwh.play();
            } else {
                NanoActivity.this.tvIpAddr.setText(NanoActivity.NO_SERVICE);
                pwh.pause();
            }
        }
    }

}
