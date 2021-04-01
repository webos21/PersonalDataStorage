package com.gmail.webos21.pds.db.domain;

import java.util.Date;

import com.gmail.webos21.pds.db.JsonHelper;

public class Insurance {

    private Long id;
    private String company;
    private String product;
    private String insuranceType;
    private String policyType;
    private String contractId;
    private String policyHolder;
    private String insured;
    private Integer payCountTotal;
    private Integer payCountDone;
    private Long premiumVolume;
    private String premiumMode;
    private String arranger;
    private Integer contractStatus;
    private Date contractDate;
    private Date maturityDate;
    private String memo;

    public Insurance(Long id, String company, String product, String insuranceType,
                     String policyType, String contractId, String policyHolder, String insured,
                     Integer payCountTotal, Integer payCountDone, Long premiumVolume,
                     String premiumMode, String arranger, Integer contractStatus,
                     Date contractDate, Date maturityDate, String memo) {
        this.id = id;
        this.company = company;
        this.product = product;
        this.insuranceType = insuranceType;
        this.policyType = policyType;
        this.contractId = contractId;
        this.policyHolder = policyHolder;
        this.insured = insured;
        this.payCountTotal = payCountTotal;
        this.payCountDone = payCountDone;
        this.premiumVolume = premiumVolume;
        this.premiumMode = premiumMode;
        this.arranger = arranger;
        this.contractStatus = contractStatus;
        this.contractDate = contractDate;
        this.maturityDate = maturityDate;
        this.memo = memo;
    }

    public Insurance(Long id, String company, String product, String insuranceType,
                     String policyType, String contractId, String policyHolder, String insured,
                     Integer payCountTotal, Integer payCountDone, Long premiumVolume,
                     String premiumMode, String arranger, Integer contractStatus,
                     Long contractDate, Long maturityDate, String memo) {
        this.id = id;
        this.company = company;
        this.product = product;
        this.insuranceType = insuranceType;
        this.policyType = policyType;
        this.contractId = contractId;
        this.policyHolder = policyHolder;
        this.insured = insured;
        this.payCountTotal = payCountTotal;
        this.payCountDone = payCountDone;
        this.premiumVolume = premiumVolume;
        this.premiumMode = premiumMode;
        this.arranger = arranger;
        this.contractStatus = contractStatus;
        this.contractDate = new Date(contractDate);
        this.maturityDate = new Date(maturityDate);
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

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(String insuranceType) {
        this.insuranceType = insuranceType;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public String getPolicyHolder() {
        return policyHolder;
    }

    public void setPolicyHolder(String policyHolder) {
        this.policyHolder = policyHolder;
    }

    public String getInsured() {
        return insured;
    }

    public void setInsured(String insured) {
        this.insured = insured;
    }

    public Integer getPayCountTotal() {
        return payCountTotal;
    }

    public void setPayCountTotal(Integer payCountTotal) {
        this.payCountTotal = payCountTotal;
    }

    public Integer getPayCountDone() {
        return payCountDone;
    }

    public void setPayCountDone(Integer payCountDone) {
        this.payCountDone = payCountDone;
    }

    public Long getPremiumVolume() {
        return premiumVolume;
    }

    public void setPremiumVolume(Long premiumVolume) {
        this.premiumVolume = premiumVolume;
    }

    public String getPremiumMode() {
        return premiumMode;
    }

    public void setPremiumMode(String premiumMode) {
        this.premiumMode = premiumMode;
    }

    public String getArranger() {
        return arranger;
    }

    public void setArranger(String arranger) {
        this.arranger = arranger;
    }

    public Integer getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(Integer contractStatus) {
        this.contractStatus = contractStatus;
    }

    public Date getContractDate() {
        return contractDate;
    }

    public void setContractDate(Date contractDate) {
        this.contractDate = contractDate;
    }

    public Date getMaturityDate() {
        return maturityDate;
    }

    public void setMaturityDate(Date maturityDate) {
        this.maturityDate = maturityDate;
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
        sb.append("  \"product\": \"").append(product).append("\",\n");
        sb.append("  \"insuranceType\": \"").append(insuranceType).append("\",\n");
        sb.append("  \"policyType\": \"").append(policyType).append("\",\n");
        sb.append("  \"contractId\": \"").append(contractId).append("\",\n");
        sb.append("  \"policyHolder\": \"").append(policyHolder).append("\",\n");
        sb.append("  \"insured\": \"").append(insured).append("\",\n");
        sb.append("  \"payCountTotal\": ").append(payCountTotal).append(",\n");
        sb.append("  \"payCountDone\": ").append(payCountDone).append(",\n");
        sb.append("  \"premiumVolume\": ").append(premiumVolume).append(",\n");
        sb.append("  \"premiumMode\": \"").append(premiumMode).append("\",\n");
        sb.append("  \"arranger\": \"").append(arranger).append("\",\n");
        sb.append("  \"contractStatus\": ").append(contractStatus).append(",\n");
        sb.append("  \"contractDate\": ").append(contractDate.getTime()).append(",\n");
        sb.append("  \"maturityDate\": ").append(maturityDate.getTime()).append(",\n");
        sb.append("  \"memo\": \"").append(JsonHelper.escape(memo)).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
