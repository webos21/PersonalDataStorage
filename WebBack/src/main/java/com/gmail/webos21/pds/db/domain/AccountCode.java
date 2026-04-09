package com.gmail.webos21.pds.db.domain;

public class AccountCode {
    private Long id;
    private String accountCode;
    private String title;

    public AccountCode(Long id, String accountCode, String title) {
        this.id = id;
        this.accountCode = accountCode;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
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
        sb.append("  \"accountCode\": \"").append(accountCode).append("\",\n");
        sb.append("  \"title\": \"").append(title).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }


}
