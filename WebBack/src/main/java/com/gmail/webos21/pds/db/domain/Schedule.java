package com.gmail.webos21.pds.db.domain;

import java.util.Date;

import com.gmail.webos21.pds.db.JsonHelper;

public class Schedule {

    private Long id;
    private String title;
    private Date pdate;
    private Integer readOk;
    private String memo;

    public Schedule(Long id, String title, Date pdate, Integer readOk, String memo) {
        this.id = id;
        this.title = title;
        this.pdate = pdate;
        this.readOk = readOk;
        this.memo = memo;
    }

    public Schedule(Long id, String title, Long pdate, Integer readOk, String memo) {
        this.id = id;
        this.title = title;
        this.pdate = new Date(pdate);
        this.readOk = readOk;
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getPdate() {
        return pdate;
    }

    public void setPdate(Date pdate) {
        this.pdate = pdate;
    }

    public Integer getReadOk() {
        return readOk;
    }

    public void setReadOk(Integer readOk) {
        this.readOk = readOk;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }


    public String toJson() {
        StringBuilder sb = new StringBuilder();

        sb.append('{').append('\n');
        sb.append("  \"id\": ").append(id).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"pdate\": ").append(pdate.getTime()).append(",\n");
        sb.append("  \"readOk\": ").append(readOk).append(",\n");
        sb.append("  \"memo\": \"").append(JsonHelper.escape(memo)).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
