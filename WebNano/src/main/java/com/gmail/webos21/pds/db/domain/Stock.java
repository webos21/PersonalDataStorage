package com.gmail.webos21.pds.db.domain;

import java.util.Date;

import com.gmail.webos21.pds.db.JsonHelper;

public class Stock {

    private Long id;
    private String company;
    private String accountName;
    private String accountNumber;
    private String holder;
    private Long deposit;
    private Long estimate;
    private Date estimateDate;
    private Long arrange;
    private String memo;

    public Stock(Long id, String company, String accountName, String accountNumber, String holder,
                 Long deposit, Long estimate, Date estimateDate, Long arrange, String memo) {
        this.id = id;
        this.company = company;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.holder = holder;
        this.deposit = deposit;
        this.estimate = estimate;
        this.estimateDate = estimateDate;
        this.arrange = arrange;
        this.memo = memo;
    }

    public Stock(Long id, String company, String accountName, String accountNumber, String holder,
                 Long deposit, Long estimate, Long estimateDate, Long arrange, String memo) {
        this.id = id;
        this.company = company;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.holder = holder;
        this.deposit = deposit;
        this.estimate = estimate;
        this.estimateDate = new Date(estimateDate);
        this.arrange = arrange;
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public Long getDeposit() {
        return deposit;
    }

    public void setDeposit(Long deposit) {
        this.deposit = deposit;
    }

    public Long getEstimate() {
        return estimate;
    }

    public void setEstimate(Long estimate) {
        this.estimate = estimate;
    }

    public Date getEstimateDate() {
        return estimateDate;
    }

    public void setEstimateDate(Date estimateDate) {
        this.estimateDate = estimateDate;
    }

    public Long getArrange() {
        return arrange;
    }

    public void setArrange(Long arrange) {
        this.arrange = arrange;
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
        sb.append("  \"company\": \"").append(company).append("\",\n");
        sb.append("  \"accountName\": \"").append(accountName).append("\",\n");
        sb.append("  \"accountNumber\": \"").append(accountNumber).append("\",\n");
        sb.append("  \"holder\": \"").append(holder).append("\",\n");
        sb.append("  \"deposit\": ").append(deposit).append(",\n");
        sb.append("  \"estimate\": ").append(estimate).append(",\n");
        sb.append("  \"estimateDate\": ").append(estimateDate.getTime()).append(",\n");
        sb.append("  \"arrange\": ").append(arrange).append(",\n");
        sb.append("  \"memo\": \"").append(JsonHelper.escape(memo)).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
