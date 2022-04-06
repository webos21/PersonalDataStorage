package com.gmail.webos21.pds.app.ui.webservice;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.text.method.ScrollingMovementMethod;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.gmail.webos21.android.async.TaskRunner;
import com.gmail.webos21.pds.app.BuildConfig;
import com.gmail.webos21.pds.app.PdsApp;
import com.gmail.webos21.pds.app.PdsWebHelper;
import com.gmail.webos21.pds.app.databinding.FragmentWebserviceBinding;
import com.gmail.webos21.pds.app.web.StaticResourceExtractor;
import com.google.android.material.switchmaterial.SwitchMaterial;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.concurrent.Executors;

public class WebserviceFragment extends Fragment {

    private final static String NO_SERVICE = "NO SERVICE!!";
    private final static int WEB_PORT = 9999;

    private WebserviceViewModel webserviceViewModel;
    private FragmentWebserviceBinding binding;

    private TextView tvIpAddr;
    private TextView tvLog;

    private SwitchMaterial swPbWeb;
    private SwitchMaterial swDirWeb;

    private DirWebSwitchListener dwsl;
    private PbWebSwitchListener pwsl;

    private String ipAddress;
    private File pwdir;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        webserviceViewModel =
                new ViewModelProvider(this).get(WebserviceViewModel.class);

        binding = FragmentWebserviceBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        tvIpAddr = binding.tvIpAddr;
        tvLog = binding.tvLog;

        dwsl = new DirWebSwitchListener();
        pwsl = new PbWebSwitchListener();

        swPbWeb = binding.swPbWeb;
        swDirWeb = binding.swDirWeb;

        swPbWeb.setOnCheckedChangeListener(pwsl);
        swDirWeb.setOnCheckedChangeListener(dwsl);

        tvLog.setText("");
        tvLog.setMovementMethod(new ScrollingMovementMethod());

        pwdir = getActivity().getFilesDir();

        tvIpAddr.setText(NO_SERVICE);

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }


    @Override
    public void onStart() {
        super.onStart();

        File indexHtml = new File(pwdir, "index.html");
        if (!indexHtml.exists()) {
            TaskRunner tr = new TaskRunner(Executors.newSingleThreadExecutor());
            tr.executeAsync(new StaticResourceExtractor(getActivity(), "static", pwdir.getPath()));
        }

        PdsApp app = (PdsApp) getActivity().getApplicationContext();
        PdsWebHelper pwh = app.getPdsWebHelper();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            requestIpAddress();
        }

        swPbWeb.setOnCheckedChangeListener(null);
        if (pwh.isPlaying()) {
            String addr = pwh.getUri();
            WebserviceFragment.this.tvIpAddr.setText(addr);
            swPbWeb.setChecked(true);
        } else {
            swPbWeb.setChecked(false);
        }
        swPbWeb.setOnCheckedChangeListener(pwsl);

    }

    @Override
    public void onStop() {
        super.onStop();
        if (swDirWeb.isChecked()) {
            swDirWeb.setChecked(false);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.S)
    private void requestIpAddress() {
        final NetworkRequest request =
                new NetworkRequest.Builder()
                        .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                        .build();
        final ConnectivityManager connectivityManager =
                getActivity().getSystemService(ConnectivityManager.class);
        final ConnectivityManager.NetworkCallback networkCallback = new ConnectivityManager.NetworkCallback() {
            @Override
            public void onAvailable(Network network) {
            }

            @Override
            public void onCapabilitiesChanged(Network network, NetworkCapabilities networkCapabilities) {
                WifiInfo wifiInfo = (WifiInfo) networkCapabilities.getTransportInfo();
                ByteBuffer bb = ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN);
                byte[] hostAddr = bb.putInt(wifiInfo.getIpAddress()).array();
                try {
                    ipAddress = InetAddress.getByAddress(hostAddr).getHostAddress();
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
            }
        };
        connectivityManager.requestNetwork(request, networkCallback); // For request
    }

    private String getIpAddress() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
            WifiManager wm = (WifiManager) getActivity().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            ByteBuffer bb = ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN);
            byte[] hostAddr = bb.putInt(wm.getConnectionInfo().getIpAddress()).array();
            try {
                ipAddress = InetAddress.getByAddress(hostAddr).getHostAddress();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }
        return ipAddress;
    }

    @RequiresApi(api = Build.VERSION_CODES.R)
    private boolean hasAllFilesPermission() {
        return Environment.isExternalStorageManager();
    }

    private class DirWebSwitchListener implements Switch.OnCheckedChangeListener {
        @Override
        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
            if (isChecked) {
                String addr = "http://" + getIpAddress() + ":" + WebserviceFragment.WEB_PORT + "/";
                WebserviceFragment.this.tvIpAddr.setText(addr);
            } else {
                WebserviceFragment.this.tvIpAddr.setText(WebserviceFragment.NO_SERVICE);
            }
        }
    }

    private class PbWebSwitchListener implements Switch.OnCheckedChangeListener {
        @Override
        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
            PdsApp app = (PdsApp) getActivity().getApplicationContext();
            PdsWebHelper pwh = app.getPdsWebHelper();
            if (isChecked) {
                if (Build.VERSION.SDK_INT >= 30 && !WebserviceFragment.this.hasAllFilesPermission()) {
                    Uri uri = Uri.parse("package:" + BuildConfig.APPLICATION_ID);
                    Intent i = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION, uri);
                    startActivity(i);
                } else {
                    WebserviceFragment.this.tvIpAddr.setText("알림 영역을 확인해 주세요.");
                    pwh.play();
                }
            } else {
                WebserviceFragment.this.tvIpAddr.setText(WebserviceFragment.NO_SERVICE);
                pwh.close();
            }
        }
    }

}