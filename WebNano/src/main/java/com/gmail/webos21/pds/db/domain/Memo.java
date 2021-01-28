package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class Memo {

    private Long id;
    private Date wdate;
    private String title;
    private String content;

    public Memo(Long id, Date wdate, String title, String content) {
        this.id = id;
        this.wdate = wdate;
        this.title = title;
        this.content = content;
    }

    public Memo(Long id, Long wdate, String title, String content) {
        this.id = id;
        this.wdate = new Date(wdate);
        this.title = title;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getWdate() {
        return wdate;
    }

    public void setWdate(Date wdate) {
        this.wdate = wdate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public String toJson() {
        StringBuilder sb = new StringBuilder();

        sb.append('{').append('\n');
        sb.append("  \"id\": ").append(id).append(",\n");
        sb.append("  \"wdate\": ").append(wdate.getTime()).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"content\": \"").append(content).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
