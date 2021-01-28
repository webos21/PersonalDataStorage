package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class RegularRecord {

    private Long id;
    private Long regularPayId;
    private Date wdate;
    private String title;
    private Long deposit;
    private Long withdrawal;
    private String accountCode;
    private String memo;

    public RegularRecord(Long id, Long regularPayId, Date wdate, String title,
                         Long deposit, Long withdrawal, String accountCode, String memo) {
        this.id = id;
        this.regularPayId = regularPayId;
        this.wdate = wdate;
        this.title = title;
        this.deposit = deposit;
        this.withdrawal = withdrawal;
        this.accountCode = accountCode;
        this.memo = memo;
    }

    public RegularRecord(Long id, Long regularPayId, Long wdate, String title,
                         Long deposit, Long withdrawal, String accountCode, String memo) {
        this.id = id;
        this.regularPayId = regularPayId;
        this.wdate = new Date(wdate);
        this.title = title;
        this.deposit = deposit;
        this.withdrawal = withdrawal;
        this.accountCode = accountCode;
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRegularPayId() {
        return regularPayId;
    }

    public void setRegularPayId(Long regularPayId) {
        this.regularPayId = regularPayId;
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

    public Long getDeposit() {
        return deposit;
    }

    public void setDeposit(Long deposit) {
        this.deposit = deposit;
    }

    public Long getWithdrawal() {
        return withdrawal;
    }

    public void setWithdrawal(Long withdrawal) {
        this.withdrawal = withdrawal;
    }

    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
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
        sb.append("  \"regularPayId\": ").append(regularPayId).append(",\n");
        sb.append("  \"wdate\": ").append(wdate.getTime()).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"deposit\": ").append(deposit).append(",\n");
        sb.append("  \"withdrawal\": ").append(withdrawal).append(",\n");
        sb.append("  \"accountCode\": \"").append(accountCode).append("\",\n");
        sb.append("  \"memo\": \"").append(memo).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
