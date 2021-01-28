package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class Diary {

    private Long id;
    private Date wdate;
    private Integer weather;
    private String title;
    private String content;

    public Diary(Long id, Date wdate, Integer weather, String title, String content) {
        this.id = id;
        this.wdate = wdate;
        this.weather = weather;
        this.title = title;
        this.content = content;
    }

    public Diary(Long id, Long wdate, Integer weather, String title, String content) {
        this.id = id;
        this.wdate = new Date(wdate);
        this.weather = weather;
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

    public Integer getWeather() {
        return weather;
    }

    public void setWeather(Integer weather) {
        this.weather = weather;
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
        sb.append("  \"weather\": ").append(weather).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"content\": \"").append(content).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
