package com.gmail.webos21.pds.db.domain;

import java.util.Date;

import com.gmail.webos21.pds.db.JsonHelper;

public class BankRecord {

    private Long id;
    private Long accountId;
    private Date transactionDate;
    private String title;
    private Long deposit;
    private Long withdrawal;
    private String memo;

    public BankRecord(Long id, Long accountId, Date transactionDate,
                      String title, Long deposit, Long withdrawal, String memo) {
        this.id = id;
        this.accountId = accountId;
        this.transactionDate = transactionDate;
        this.title = title;
        this.deposit = deposit;
        this.withdrawal = withdrawal;
        this.memo = memo;
    }

    public BankRecord(Long id, Long accountId, Long transactionDate,
                      String title, Long deposit, Long withdrawal, String memo) {
        this.id = id;
        this.accountId = accountId;
        this.transactionDate = new Date(transactionDate);
        this.title = title;
        this.deposit = deposit;
        this.withdrawal = withdrawal;
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
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
        sb.append("  \"accountId\": ").append(accountId).append(",\n");
        sb.append("  \"transactionDate\": ").append(transactionDate.getTime()).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"deposit\": ").append(deposit).append(",\n");
        sb.append("  \"withdrawal\": ").append(withdrawal).append(",\n");
        sb.append("  \"memo\": \"").append(JsonHelper.escape(memo)).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
