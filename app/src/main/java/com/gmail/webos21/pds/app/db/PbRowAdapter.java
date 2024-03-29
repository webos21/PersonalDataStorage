package com.gmail.webos21.pds.app.db;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.core.content.res.ResourcesCompat;

import com.gmail.webos21.android.ild.ImageLoader;
import com.gmail.webos21.pds.app.R;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.domain.PasswordBook;
import com.gmail.webos21.pds.db.repo.PasswordBookRepo;

import java.util.List;

public class PbRowAdapter extends BaseAdapter {

    private List<PasswordBook> passwordBooks;
    private PasswordBookRepo pbDb;

    private ImageLoader imgLoader;

    private boolean bShowIcon;

    public PbRowAdapter(Context context, boolean showIcon) {
        PdsDbManager dbMan = PdsDbManager.getInstance();

        pbDb = dbMan.getRepository(PasswordBookRepo.class);
        passwordBooks = pbDb.findRows();

        this.bShowIcon = showIcon;
    }

    @Override
    public int getCount() {
        return passwordBooks.size();
    }

    @Override
    public Object getItem(int position) {
        return passwordBooks.get(position);
    }

    @Override
    public long getItemId(int position) {
        return passwordBooks.get(position).getId();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final int pos = position;
        final Context context = parent.getContext();

        // "listview_item" Layout을 inflate하여 convertView 참조 획득.
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.pbrow, parent, false);
        }

        if (imgLoader == null) {
            imgLoader = new ImageLoader(context, R.drawable.ic_gt);
        }

        // 화면에 표시될 View(Layout이 inflate된)으로부터 위젯에 대한 참조 획득
        ImageView iconImageView = (ImageView) convertView.findViewById(R.id.iv_favicon);
        TextView titleTextView = (TextView) convertView.findViewById(R.id.tv_title);
        TextView descTextView = (TextView) convertView.findViewById(R.id.tv_url);

        // Data Set(listViewItemList)에서 position에 위치한 데이터 참조 획득
        PasswordBook pbData = passwordBooks.get(position);

        // 아이템 내 각 위젯에 데이터 반영
        if (bShowIcon) {
            imgLoader.DisplayImage("https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + pbData.getSiteUrl(), iconImageView);
        } else {
            iconImageView.setImageDrawable(ResourcesCompat.getDrawable(context.getResources(), R.drawable.ic_gt, null));
        }
        titleTextView.setText("[" + pbData.getSiteType() + "] " + pbData.getSiteName());
        descTextView.setText(pbData.getSiteUrl());

        return convertView;
    }

    public void refresh() {
        notifyDataSetChanged();
    }

    public void searchItems(String w) {
        passwordBooks.clear();
        passwordBooks = pbDb.findRows(w);
        notifyDataSetChanged();
    }

    public void searchAll() {
        passwordBooks.clear();
        passwordBooks = pbDb.findRows();
        notifyDataSetChanged();
    }

    public void setShowIcon(boolean bShowIcon) {
        this.bShowIcon = bShowIcon;
        notifyDataSetChanged();
    }
}
