package com.gmail.webos21.pds.db.domain;

import java.util.Date;

import com.gmail.webos21.pds.db.JsonHelper;

public class RealEstateRecord {

    private Long id;
    private Long realEstateId;
    private Date transactionDate;
    private String title;
    private Long deposit;
    private Long withdrawal;
    private String memo;

    public RealEstateRecord(Long id, Long realEstateId, Date transactionDate,
                            String title, Long deposit, Long withdrawal, String memo) {
        this.id = id;
        this.realEstateId = realEstateId;
        this.transactionDate = transactionDate;
        this.title = title;
        this.deposit = deposit;
        this.withdrawal = withdrawal;
        this.memo = memo;
    }

    public RealEstateRecord(Long id, Long realEstateId, Long transactionDate,
                            String title, Long deposit, Long withdrawal, String memo) {
        this.id = id;
        this.realEstateId = realEstateId;
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

    public Long getRealEstateId() {
        return realEstateId;
    }

    public void setRealEstateId(Long realEstateId) {
        this.realEstateId = realEstateId;
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
        sb.append("  \"realEstateId\": ").append(realEstateId).append(",\n");
        sb.append("  \"transactionDate\": ").append(transactionDate.getTime()).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"deposit\": ").append(deposit).append(",\n");
        sb.append("  \"withdrawal\": ").append(withdrawal).append(",\n");
        sb.append("  \"memo\": \"").append(JsonHelper.escape(memo)).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
