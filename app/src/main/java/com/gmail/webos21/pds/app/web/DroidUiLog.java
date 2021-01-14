package com.gmail.webos21.pds.app.web;

import android.widget.TextView;

import com.gmail.webos21.pds.web.log.UiLog;

public class DroidUiLog implements UiLog {

    private TextView view;

    public DroidUiLog(TextView v) {
        this.view = v;
    }

    public void log(final String msg) {
        view.post(new Runnable() {
            @Override
            public void run() {
                view.append("\n" + msg);

                final int scrollAmount = view.getLayout().getLineTop(view.getLineCount()) - view.getHeight();
                // if there is no need to scroll, scrollAmount will be <=0
                if (scrollAmount > 0)
                    view.scrollTo(0, scrollAmount);
                else
                    view.scrollTo(0, 0);
            }
        });
    }

}
