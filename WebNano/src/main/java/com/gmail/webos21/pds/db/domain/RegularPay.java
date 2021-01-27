package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class RegularPay {

    private Long id;
    private Date wdate;
    private String title;
    private Long deposit;
    private Long withdrawal;
    private String accountCode;
    private Integer monthDay;
    private Date sdate;
    private Date edate;
    private String memo;

    public RegularPay(Long id, Date wdate, String title,
                      Long deposit, Long withdrawal, String accountCode,
                      Integer monthDay, Date sdate, Date edate, String memo) {
        this.id = id;
        this.wdate = wdate;
        this.title = title;
        this.deposit = deposit;
        this.withdrawal = withdrawal;
        this.accountCode = accountCode;
        this.monthDay = monthDay;
        this.sdate = sdate;
        this.edate = edate;
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getMonthDay() {
        return monthDay;
    }

    public void setMonthDay(Integer monthDay) {
        this.monthDay = monthDay;
    }

    public Date getSdate() {
        return sdate;
    }

    public void setSdate(Date sdate) {
        this.sdate = sdate;
    }

    public Date getEdate() {
        return edate;
    }

    public void setEdate(Date edate) {
        this.edate = edate;
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
        sb.append("  \"wdate\": \"").append(wdate).append("\",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"deposit\": \"").append(deposit).append("\",\n");
        sb.append("  \"withdrawal\": \"").append(withdrawal).append("\",\n");
        sb.append("  \"accountCode\": \"").append(accountCode).append("\",\n");
        sb.append("  \"monthDay\": \"").append(monthDay).append("\",\n");
        sb.append("  \"sdate\": \"").append(sdate).append("\",\n");
        sb.append("  \"edate\": \"").append(edate).append("\",\n");
        sb.append("  \"memo\": \"").append(memo).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
