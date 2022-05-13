package com.gmail.webos21.android.ild;

import android.content.Context;
import android.os.Build;
import android.os.Environment;

import java.io.File;

public class FileCache {

    private File cacheDir;

    public FileCache(Context context) {
        // Find the dir at SDCARD to save cached images
        if (Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED)) {
            cacheDir = context.getExternalCacheDir();
        } else {
            // if checking on simulator the create cache dir in your application
            // context
            cacheDir = context.getCacheDir();
        }

        if (!cacheDir.exists()) {
            // create cache dir in your application context
            cacheDir.mkdirs();
        }
    }

    public File getFile(String url) {
        String cacheFileName = null;
        if (url.startsWith("https://t3.gstatic.com/faviconV2")) {
            cacheFileName = "R" + Integer.toHexString(url.hashCode()) + "-favicon.ico";
        } else {
            int posLastDot = url.lastIndexOf('.');
            int posLastSlash = url.lastIndexOf('/');

            String suffix = url.substring(posLastDot);
            String filename = url.substring(posLastSlash + 1, posLastDot);
            cacheFileName = "R" + Integer.toHexString(url.hashCode()) + "-"
                    + filename + suffix;
        }

        File f = new File(cacheDir, cacheFileName);
        return f;

    }

    public void clear() {
        // list all files inside cache directory
        File[] files = cacheDir.listFiles();
        if (files == null) {
            return;
        }

        // delete all cache directory files
        for (File f : files) {
            f.delete();
        }
    }

}
