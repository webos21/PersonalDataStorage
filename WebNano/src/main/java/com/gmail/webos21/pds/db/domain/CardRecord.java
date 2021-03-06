package com.gmail.webos21.pds.db.domain;

import java.util.Date;

import com.gmail.webos21.pds.db.JsonHelper;

public class CardRecord {

	private Long id;
	private Long cardId;
	private Date transactionDate;
	private String title;
	private Long price;
	private Long commission;
	private Integer installment;
	private Long installmentId;
	private Integer installmentTurn;
	private Long amount;
	private Long remainder;
	private Date settlementDate;
	private String accountCode;
	private Integer paid;
	private String memo;

	public CardRecord(Long id, Long cardId, Date transactionDate, String title, Long price, Long commission,
			Integer installment, Long installmentId, Integer installmentTurn, Long amount, Long remainder,
			Date settlementDate, String accountCode, Integer paid, String memo) {
		this.id = id;
		this.cardId = cardId;
		this.transactionDate = transactionDate;
		this.title = title;
		this.price = price;
		this.commission = commission;
		this.installment = installment;
		this.installmentId = installmentId;
		this.installmentTurn = installmentTurn;
		this.amount = amount;
		this.remainder = remainder;
		this.settlementDate = settlementDate;
		this.accountCode = accountCode;
		this.paid = paid;
		this.memo = memo;
	}

	public CardRecord(Long id, Long cardId, Long transactionDate, String title, Long price, Long commission,
			Integer installment, Long installmentId, Integer installmentTurn, Long amount, Long remainder,
			Long settlementDate, String accountCode, Integer paid, String memo) {
		this.id = id;
		this.cardId = cardId;
		this.transactionDate = new Date(transactionDate);
		this.title = title;
		this.price = price;
		this.commission = commission;
		this.installment = installment;
		this.installmentId = installmentId;
		this.installmentTurn = installmentTurn;
		this.amount = amount;
		this.remainder = remainder;
		this.settlementDate = new Date(settlementDate);
		this.accountCode = accountCode;
		this.paid = paid;
		this.memo = memo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCardId() {
		return cardId;
	}

	public void setCardId(Long cardId) {
		this.cardId = cardId;
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

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Long getCommission() {
		return commission;
	}

	public void setCommission(Long commission) {
		this.commission = commission;
	}

	public Integer getInstallment() {
		return installment;
	}

	public void setInstallment(Integer installment) {
		this.installment = installment;
	}

	public Long getInstallmentId() {
		return installmentId;
	}

	public void setInstallmentId(Long installmentId) {
		this.installmentId = installmentId;
	}

	public Integer getInstallmentTurn() {
		return installmentTurn;
	}

	public void setInstallmentTurn(Integer installmentTurn) {
		this.installmentTurn = installmentTurn;
	}

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public Long getRemainder() {
		return remainder;
	}

	public void setRemainder(Long remainder) {
		this.remainder = remainder;
	}

	public Date getSettlementDate() {
		return settlementDate;
	}

	public void setSettlementDate(Date settlementDate) {
		this.settlementDate = settlementDate;
	}
	
	public String getAccountCode() {
		return accountCode;
	}
	
	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}

	public Integer getPaid() {
		return paid;
	}

	public void setPaid(Integer paid) {
		this.paid = paid;
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
		sb.append("  \"cardId\": ").append(cardId).append(",\n");
		sb.append("  \"transactionDate\": ").append(transactionDate.getTime()).append(",\n");
		sb.append("  \"title\": \"").append(title).append("\",\n");
		sb.append("  \"price\": ").append(price).append(",\n");
		sb.append("  \"commission\": ").append(commission).append(",\n");
		sb.append("  \"installment\": ").append(installment).append(",\n");
		sb.append("  \"installmentId\": ").append(installmentId).append(",\n");
		sb.append("  \"installmentTurn\": ").append(installmentTurn).append(",\n");
		sb.append("  \"amount\": ").append(amount).append(",\n");
		sb.append("  \"remainder\": ").append(remainder).append(",\n");
		sb.append("  \"settlementDate\": ").append(settlementDate.getTime()).append(",\n");
		sb.append("  \"accountCode\": \"").append(accountCode).append("\",\n");
		sb.append("  \"paid\": ").append(paid).append(",\n");
		sb.append("  \"memo\": \"").append(JsonHelper.escape(memo)).append("\"\n");
		sb.append('}').append('\n');

		return sb.toString();
	}

}
