package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class InsuranceRecord {

    private Long id;
    private Long insuranceId;
    private Date transactionDate;
    private String title;
    private Long deposit;
    private Long withdrawal;
    private String memo;

    public InsuranceRecord(Long id, Long insuranceId, Date transactionDate, String title,
                           Long deposit, Long withdrawal, String memo) {
        this.id = id;
        this.insuranceId = insuranceId;
        this.transactionDate = transactionDate;
        this.title = title;
        this.deposit = deposit;
        this.withdrawal = withdrawal;
        this.memo = memo;
    }

    public InsuranceRecord(Long id, Long insuranceId, Long transactionDate, String title,
                           Long deposit, Long withdrawal, String memo) {
        this.id = id;
        this.insuranceId = insuranceId;
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

    public Long getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(Long insuranceId) {
        this.insuranceId = insuranceId;
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
        sb.append("  \"insuranceId\": ").append(insuranceId).append(",\n");
        sb.append("  \"transactionDate\": ").append(transactionDate.getTime()).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"deposit\": ").append(deposit).append(",\n");
        sb.append("  \"withdrawal\": ").append(withdrawal).append(",\n");
        sb.append("  \"memo\": \"").append(memo).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
