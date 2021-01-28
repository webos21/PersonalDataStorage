package com.gmail.webos21.pds.db.domain;

import java.util.Date;

public class Card {

    private Long id;
    private String company;
    private String cardName;
    private String cardNumber;
    private String cardPassword;
    private Integer validYear;
    private Integer validMonth;
    private Integer chargeDate;
    private Integer cvcNumber;
    private Long bankId;
    private Long creditLimit;
    private Long cashAdvance;
    private Long cardLoan;
    private Date issueDate;
    private Integer refreshNormal;
    private Integer refreshShort;
    private Long arrange;
    private String memo;

    public Card(Long id, String company, String cardName, String cardNumber, String cardPassword,
                Integer validYear, Integer validMonth, Integer chargeDate, Integer cvcNumber,
                Long bankId, Long creditLimit, Long cashAdvance, Long cardLoan, Date issueDate,
                Integer refreshNormal, Integer refreshShort, Long arrange, String memo) {
        this.id = id;
        this.company = company;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.cardPassword = cardPassword;
        this.validYear = validYear;
        this.validMonth = validMonth;
        this.chargeDate = chargeDate;
        this.cvcNumber = cvcNumber;
        this.bankId = bankId;
        this.creditLimit = creditLimit;
        this.cashAdvance = cashAdvance;
        this.cardLoan = cardLoan;
        this.issueDate = issueDate;
        this.refreshNormal = refreshNormal;
        this.refreshShort = refreshShort;
        this.arrange = arrange;
        this.memo = memo;
    }

    public Card(Long id, String company, String cardName, String cardNumber, String cardPassword,
                Integer validYear, Integer validMonth, Integer chargeDate, Integer cvcNumber,
                Long bankId, Long creditLimit, Long cashAdvance, Long cardLoan, Long issueDate,
                Integer refreshNormal, Integer refreshShort, Long arrange, String memo) {
        this.id = id;
        this.company = company;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.cardPassword = cardPassword;
        this.validYear = validYear;
        this.validMonth = validMonth;
        this.chargeDate = chargeDate;
        this.cvcNumber = cvcNumber;
        this.bankId = bankId;
        this.creditLimit = creditLimit;
        this.cashAdvance = cashAdvance;
        this.cardLoan = cardLoan;
        this.issueDate = new Date(issueDate);
        this.refreshNormal = refreshNormal;
        this.refreshShort = refreshShort;
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

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardPassword() {
        return cardPassword;
    }

    public void setCardPassword(String cardPassword) {
        this.cardPassword = cardPassword;
    }

    public Integer getValidYear() {
        return validYear;
    }

    public void setValidYear(Integer validYear) {
        this.validYear = validYear;
    }

    public Integer getValidMonth() {
        return validMonth;
    }

    public void setValidMonth(Integer validMonth) {
        this.validMonth = validMonth;
    }

    public Integer getChargeDate() {
        return chargeDate;
    }

    public void setChargeDate(Integer chargeDate) {
        this.chargeDate = chargeDate;
    }

    public Integer getCvcNumber() {
        return cvcNumber;
    }

    public void setCvcNumber(Integer cvcNumber) {
        this.cvcNumber = cvcNumber;
    }

    public Long getBankId() {
        return bankId;
    }

    public void setBankId(Long bankId) {
        this.bankId = bankId;
    }

    public Long getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(Long creditLimit) {
        this.creditLimit = creditLimit;
    }

    public Long getCashAdvance() {
        return cashAdvance;
    }

    public void setCashAdvance(Long cashAdvance) {
        this.cashAdvance = cashAdvance;
    }

    public Long getCardLoan() {
        return cardLoan;
    }

    public void setCardLoan(Long cardLoan) {
        this.cardLoan = cardLoan;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public Integer getRefreshNormal() {
        return refreshNormal;
    }

    public void setRefreshNormal(Integer refreshNormal) {
        this.refreshNormal = refreshNormal;
    }

    public Integer getRefreshShort() {
        return refreshShort;
    }

    public void setRefreshShort(Integer refreshShort) {
        this.refreshShort = refreshShort;
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
        sb.append("  \"cardName\": \"").append(cardName).append("\",\n");
        sb.append("  \"cardNumber\": \"").append(cardNumber).append("\",\n");
        sb.append("  \"cardPassword\": \"").append(cardPassword).append("\",\n");
        sb.append("  \"validYear\": ").append(validYear).append(",\n");
        sb.append("  \"validMonth\": ").append(validMonth).append(",\n");
        sb.append("  \"chargeDate\": ").append(chargeDate).append(",\n");
        sb.append("  \"cvcNumber\": ").append(cvcNumber).append(",\n");
        sb.append("  \"bankId\": ").append(bankId).append(",\n");
        sb.append("  \"creditLimit\": ").append(creditLimit).append(",\n");
        sb.append("  \"cashAdvance\": ").append(cashAdvance).append(",\n");
        sb.append("  \"cardLoan\": ").append(cardLoan).append(",\n");
        sb.append("  \"issueDate\": ").append(issueDate.getTime()).append(",\n");
        sb.append("  \"refreshNormal\": ").append(refreshNormal).append(",\n");
        sb.append("  \"refreshShort\": ").append(refreshShort).append(",\n");
        sb.append("  \"arrange\": ").append(arrange).append(",\n");
        sb.append("  \"memo\": \"").append(memo).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
