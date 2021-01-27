package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class Budget {

    private Long id;
    private Date budgetDate;
    private Long deposit;
    private Long withdrawal;
    private String accountCode;
    private String memo;

    public Budget(Long id, Date budgetDate, Long deposit, Long withdrawal, String accountCode, String memo) {
        this.id = id;
        this.budgetDate = budgetDate;
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

    public Date getBudgetDate() {
        return budgetDate;
    }

    public void setBudgetDate(Date budgetDate) {
        this.budgetDate = budgetDate;
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
        sb.append("  \"budgetDate\": \"").append(budgetDate).append("\",\n");
        sb.append("  \"deposit\": \"").append(deposit).append("\",\n");
        sb.append("  \"withdrawal\": \"").append(withdrawal).append("\",\n");
        sb.append("  \"accountCode\": \"").append(accountCode).append("\",\n");
        sb.append("  \"memo\": \"").append(memo).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
