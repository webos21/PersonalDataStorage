package com.gmail.webos21.pds.app;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceManager;

import org.osmdroid.config.Configuration;
import org.osmdroid.tileprovider.tilesource.OnlineTileSourceBase;
import org.osmdroid.util.MapTileIndex;
import org.osmdroid.views.CustomZoomButtonsController;
import org.osmdroid.views.MapView;
import org.osmdroid.views.overlay.ScaleBarOverlay;
import org.osmdroid.views.overlay.compass.CompassOverlay;
import org.osmdroid.views.overlay.compass.InternalCompassOrientationProvider;
import org.osmdroid.views.overlay.mylocation.GpsMyLocationProvider;
import org.osmdroid.views.overlay.mylocation.MyLocationNewOverlay;

public class MapActivity extends AppCompatActivity {

    private static final String TAG = "MapActivity";

    private MapView map;

    private MyLocationNewOverlay mLocationOverlay;
    private CompassOverlay mCompassOverlay;
    private ScaleBarOverlay mScaleBarOverlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Configuration.getInstance().load(this, PreferenceManager.getDefaultSharedPreferences(this));

        SharedPreferences shpref = getSharedPreferences(Consts.PREF_FILE, MODE_PRIVATE);
        getDelegate().setLocalNightMode(shpref.getInt(Consts.PREF_THEME, -1));

        setContentView(R.layout.activity_map);

        if (Consts.DEBUG) {
            Log.i(TAG, "onCreate!!!!!!!!!!!!!");
        }

        map = (MapView) findViewById(R.id.map);
        map.setTileSource(new OnlineTileSourceBase("vworld", 6, 18, 256, ".png",
                new String[]{"http://api.vworld.kr/req/wmts/1.0.0/3488D70F-D4B6-3A4C-BDD1-EB2437407725/Base/"}) {
            @Override
            public String getTileURLString(long pMapTileIndex) {
                return getBaseUrl()
                        + MapTileIndex.getZoom(pMapTileIndex)
                        + "/" + MapTileIndex.getY(pMapTileIndex)
                        + "/" + MapTileIndex.getX(pMapTileIndex)
                        + mImageFilenameEnding;
            }
        });

        mLocationOverlay = new MyLocationNewOverlay(new GpsMyLocationProvider(this), map);
        mLocationOverlay.enableMyLocation();
        map.getOverlays().add(mLocationOverlay);

        mCompassOverlay = new CompassOverlay(this, new InternalCompassOrientationProvider(this), map);
        mCompassOverlay.enableCompass();
        map.getOverlays().add(mCompassOverlay);

        mScaleBarOverlay = new ScaleBarOverlay(map);
        mScaleBarOverlay.setAlignBottom(true);
        mScaleBarOverlay.setAlignRight(true);
        map.getOverlays().add(mScaleBarOverlay);

        map.getZoomController().setVisibility(CustomZoomButtonsController.Visibility.SHOW_AND_FADEOUT);
        map.setMultiTouchControls(true);

        ActionBar ab = getSupportActionBar();
        ab.setTitle("지도");
        ab.setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case android.R.id.home:
                finish();
                return true;
            default:
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onStart() {
        super.onStart();

        if (Consts.DEBUG) {
            Log.i(TAG, "onStart!!!!!!!!!!!!!");
        }

        mLocationOverlay.runOnFirstFix(new Runnable() {
            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        map.getController().animateTo(mLocationOverlay.getMyLocation(), 18.0D, 1500L);
                    }
                });
            }
        });
    }

    public void onResume() {
        super.onResume();

        if (Consts.DEBUG) {
            Log.i(TAG, "onResume!!!!!!!!!!!!!");
        }

        map.onResume();
    }

    public void onPause() {
        super.onPause();

        if (Consts.DEBUG) {
            Log.i(TAG, "onPause!!!!!!!!!!!!!");
        }

        map.onPause();
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

}
