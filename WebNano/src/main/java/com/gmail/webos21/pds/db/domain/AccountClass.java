package com.gmail.webos21.pds.db.domain;

public class AccountClass {
    private Long id;
    private String title;

    public AccountClass(Long id, String title) {
        this.id = id;
        this.title = title;
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

    public String toJson() {
        StringBuilder sb = new StringBuilder();

        sb.append('{').append('\n');
        sb.append("  \"id\": ").append(id).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
