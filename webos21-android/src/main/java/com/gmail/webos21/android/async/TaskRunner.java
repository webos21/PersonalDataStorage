package com.gmail.webos21.android.async;

import android.os.Handler;
import android.os.Looper;

import org.jetbrains.annotations.Nullable;

import java.util.concurrent.Callable;
import java.util.concurrent.Executor;

public class TaskRunner {
    private final Executor executor;
    private final Handler handler = new Handler(Looper.getMainLooper());

    public TaskRunner(Executor executor) {
        this.executor = executor;
    }

    public <R> void executeAsync(Callable<R> callable) {
        executeAsync(callable, null);
    }

    public <R> void executeAsync(Callable<R> callable, @Nullable Callback<R> callback) {
        executor.execute(() -> {
            try {
                final R result = callable.call();
                if (callback != null) {
                    handler.post(() -> {
                        callback.onComplete(result);
                    });
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public interface Callback<R> {
        void onComplete(R result);
    }

}
