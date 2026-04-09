package com.gmail.webos21.pds.db.domain;

import java.util.Date;

import com.gmail.webos21.pds.db.JsonHelper;

public class RealEstate {

    private Long id;
    private String estateType;
    private String title;
    private String holder;
    private Long estimate;
    private Long loan;
    private Date acquisitionDate;
    private Date estimateDate;
    private Long arrange;
    private String memo;

    public RealEstate(Long id, String estateType, String title, String holder, Long estimate,
                      Long loan, Date acquisitionDate, Date estimateDate, Long arrange, String memo) {
        this.id = id;
        this.estateType = estateType;
        this.title = title;
        this.holder = holder;
        this.estimate = estimate;
        this.loan = loan;
        this.acquisitionDate = acquisitionDate;
        this.estimateDate = estimateDate;
        this.arrange = arrange;
        this.memo = memo;
    }

    public RealEstate(Long id, String estateType, String title, String holder, Long estimate,
                      Long loan, Long acquisitionDate, Long estimateDate, Long arrange, String memo) {
        this.id = id;
        this.estateType = estateType;
        this.title = title;
        this.holder = holder;
        this.estimate = estimate;
        this.loan = loan;
        this.acquisitionDate = new Date(acquisitionDate);
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

    public String getEstateType() {
        return estateType;
    }

    public void setEstateType(String estateType) {
        this.estateType = estateType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public Long getEstimate() {
        return estimate;
    }

    public void setEstimate(Long estimate) {
        this.estimate = estimate;
    }

    public Long getLoan() {
        return loan;
    }

    public void setLoan(Long loan) {
        this.loan = loan;
    }

    public Date getAcquisitionDate() {
        return acquisitionDate;
    }

    public void setAcquisitionDate(Date acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
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
        sb.append("  \"estateType\": \"").append(estateType).append("\",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"holder\": \"").append(holder).append("\",\n");
        sb.append("  \"estimate\": ").append(estimate).append(",\n");
        sb.append("  \"loan\": ").append(loan).append(",\n");
        sb.append("  \"acquisitionDate\": ").append(acquisitionDate.getTime()).append(",\n");
        sb.append("  \"estimateDate\": ").append(estimateDate.getTime()).append(",\n");
        sb.append("  \"arrange\": ").append(arrange).append(",\n");
        sb.append("  \"memo\": \"").append(JsonHelper.escape(memo)).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
