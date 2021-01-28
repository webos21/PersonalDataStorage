package com.gmail.webos21.pds.db.domain;

public class Anniversary {

    private Long id;
    private String title;
    private String applyDate;
    private Integer lunar;
    private Integer holiday;

    public Anniversary(Long id, String title, String applyDate, Integer lunar, Integer holiday) {
        this.id = id;
        this.title = title;
        this.applyDate = applyDate;
        this.lunar = lunar;
        this.holiday = holiday;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(String applyDate) {
        this.applyDate = applyDate;
    }

    public Integer getLunar() {
        return lunar;
    }

    public void setLunar(Integer lunar) {
        this.lunar = lunar;
    }

    public Integer getHoliday() {
        return holiday;
    }

    public void setHoliday(Integer holiday) {
        this.holiday = holiday;
    }


    public String toJson() {
        StringBuilder sb = new StringBuilder();

        sb.append('{').append('\n');
        sb.append("  \"id\": ").append(id).append(",\n");
        sb.append("  \"title\": \"").append(title).append("\",\n");
        sb.append("  \"applyDate\": \"").append(applyDate).append("\",\n");
        sb.append("  \"lunar\": ").append(lunar).append(",\n");
        sb.append("  \"holiday\": ").append(holiday).append("\n");
        sb.append('}').append('\n');

        return sb.toString();
    }


}
