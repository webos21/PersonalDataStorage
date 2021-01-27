package com.gmail.webos21.pds.db.domain;

public class Titles {

    private Long id;
    private Long used;
    private String title;

    public Titles(Long id, Long used, String title) {
        this.id = id;
        this.used = used;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsed() {
        return used;
    }

    public void setUsed(Long used) {
        this.used = used;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String toJson() {
        StringBuilder sb = new StringBuilder();

        sb.append('{').append('\n');
        sb.append("  \"id\": ").append(id).append(",\n");
        sb.append("  \"used\": \"").append(used).append("\",\n");
        sb.append("  \"title\": \"").append(title).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
