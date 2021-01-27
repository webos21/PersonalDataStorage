package com.gmail.webos21.pds.db.domain;

public class AddressBook {

    private Long id;
    private String fullName;
    private String mobile;
    private String category;
    private String telephone;
    private String fax;
    private String email;
    private String homepage;
    private String postcode;
    private String address;
    private String memo;

    public AddressBook(Long id, String fullName, String mobile, String category, String telephone, String fax,
                       String email, String homepage, String postcode, String address, String memo) {
        this.id = id;
        this.fullName = fullName;
        this.mobile = mobile;
        this.category = category;
        this.telephone = telephone;
        this.fax = fax;
        this.email = email;
        this.homepage = homepage;
        this.postcode = postcode;
        this.address = address;
        this.memo = memo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHomepage() {
        return homepage;
    }

    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
        sb.append("  \"fullName\": \"").append(fullName).append("\",\n");
        sb.append("  \"mobile\": \"").append(mobile).append("\",\n");
        sb.append("  \"category\": \"").append(category).append("\",\n");
        sb.append("  \"telephone\": \"").append(telephone).append("\",\n");
        sb.append("  \"fax\": \"").append(fax).append("\",\n");
        sb.append("  \"email\": \"").append(email).append("\",\n");
        sb.append("  \"homepage\": \"").append(homepage).append("\",\n");
        sb.append("  \"postcode\": \"").append(postcode).append("\",\n");
        sb.append("  \"address\": \"").append(address).append("\",\n");
        sb.append("  \"memo\": \"").append(memo).append("\"\n");
        sb.append('}').append('\n');

        return sb.toString();
    }

}
