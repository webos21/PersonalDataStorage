package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class Bank {

    private Long id;
    private String bankName;
    private String accountName;
    private String holder;
    private String accountNumber;
    private Long initialBalance;
    private String accountPassword;
    private Date issueDate;
    private Date expireDate;
    private Long arrange;
    private Integer notUsed;
    private String memo;

    public Bank(Long id, String bankName, String accountName, String holder, String accountNumber,
                Long initialBalance, String accountPassword, Date issueDate, Date expireDate, Long arrange, Integer notUsed, String memo) {
        this.id = id;
        this.bankName = bankName;
        this.accountName = accountName;
        this.holder = holder;
        this.accountNumber = accountNumber;
        this.initialBalance = initialBalance;
        this.accountPassword = accountPassword;
        this.issueDate = issueDate;
        this.expireDate = expireDate;
        this.arrange = arrange;
        this.notUsed = notUsed;
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Long getInitialBalance() {
        return initialBalance;
    }

    public void setInitialBalance(Long initialBalance) {
        this.initialBalance = initialBalance;
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    public Long getArrange() {
        return arrange;
    }

    public void setArrange(Long arrange) {
        this.arrange = arrange;
    }

    public Integer getNotUsed() {
        return notUsed;
    }

    public void setNotUsed(Integer notUsed) {
        this.notUsed = notUsed;
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
        sb.append("  \"bankName\": \"").append(bankName).append("\",\n");
        sb.append("  \"accountName\": \"").append(accountName).append("\",\n");
        sb.append("  \"holder\": \"").append(holder).append("\",\n");
        sb.append("  \"accountNumber\": \"").append(accountNumber).append("\",\n");
        sb.append("  \"initialBalance\": \"").append(initialBalance).append("\",\n");
        sb.append("  \"accountPassword\": \"").append(accountPassword).append("\",\n");
        sb.append("  \"issueDate\": \"").append(issueDate).append("\",\n");
        sb.append("  \"expireDate\": \"").append(expireDate).append("\",\n");
        sb.append("  \"arrange\": \"").append(arrange).append("\",\n");
        sb.append("  \"notUsed\": \"").append(notUsed).append("\",\n");
        sb.append("  \"memo\": \"").append(memo).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
