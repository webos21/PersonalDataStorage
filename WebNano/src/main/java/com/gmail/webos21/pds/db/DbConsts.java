package com.gmail.webos21.pds.db;

import java.text.SimpleDateFormat;

public class DbConsts {
    public static final boolean DB_DEBUG = true;

    public static final String DB_PATH = "~/pds";
    public static final String DB_USER = "sa";
    public static final String DB_PASS = "filekey sa";
    public static final String DB_OPTS = ";CIPHER=AES;TRACE_LEVEL_FILE=0;TRACE_LEVEL_SYSTEM_OUT=0";

    public static final int DB_VERSION = 1;

    public static final SimpleDateFormat SDF_DATE = new SimpleDateFormat("yyyy-MM-dd");

    public static final String TB_ACCOUNT_CLASS = "tb_account_class";
    public static final String TB_ACCOUNT_CODE = "tb_account_code";
    public static final String TB_ADDRESSBOOK = "tb_addressbook";
    public static final String TB_ANNIVERSARY = "tb_anniversary";
    public static final String TB_BANK = "tb_bank";
    public static final String TB_BANK_RECORD = "tb_bank_record";
    public static final String TB_BUDGET = "tb_budget";
    public static final String TB_CARD = "tb_card";
    public static final String TB_CARD_RECORD = "tb_card_record";
    public static final String TB_DIARY = "tb_diary";
    public static final String TB_INSURANCE = "tb_insurance";
    public static final String TB_INSURANCE_RECORD = "tb_insurance_record";
    public static final String TB_MEMO = "tb_memo";
    public static final String TB_REALESTATE = "tb_realestate";
    public static final String TB_REALESTATE_RECORD = "tb_realestate_record";
    public static final String TB_RECORD = "tb_record";
    public static final String TB_REGULAR_PAY = "tb_regular_pay";
    public static final String TB_REGULAR_RECORD = "tb_regular_record";
    public static final String TB_SCHEDULE = "tb_schedule";
    public static final String TB_STOCK = "tb_stock";
    public static final String TB_STOCK_RECORD = "tb_stock_record";
    public static final String TB_TITLES = "tb_titles";
    public static final String TB_USER = "tb_user";

    public static final String TB_PASSWORD_BOOK = "tb_password_book";

    public static final String CREATE_TB_ACCOUNT_CLASS = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_ACCOUNT_CLASS + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	title            VARCHAR(255)" +
            /* Indent */");";

    public static final String CREATE_TB_ACCOUNT_CODE = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_ACCOUNT_CODE + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	account_code     CHAR(2), " +
            /* Indent */"	title            VARCHAR(255)" +
            /* Indent */");";

    public static final String CREATE_TB_ADDRESSBOOK = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_ADDRESSBOOK + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	full_name        VARCHAR(127), " +
            /* Indent */"	mobile           VARCHAR(32), " +
            /* Indent */"	category         VARCHAR(127), " +
            /* Indent */"	telephone        VARCHAR(32), " +
            /* Indent */"	fax              VARCHAR(32), " +
            /* Indent */"	email            VARCHAR(127), " +
            /* Indent */"	homepage         VARCHAR(127), " +
            /* Indent */"	postcode         VARCHAR(255), " +
            /* Indent */"	address          VARCHAR(255), " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_ANNIVERSARY = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_ANNIVERSARY + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	apply_year       INT, " +
            /* Indent */"	apply_date       CHAR(4), " +
            /* Indent */"	lunar            INT, " +
            /* Indent */"	holiday          INT" +
            /* Indent */");";

    public static final String CREATE_TB_BANK = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_BANK + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	bank_name        VARCHAR(127), " +
            /* Indent */"	account_name     VARCHAR(127), " +
            /* Indent */"	holder           VARCHAR(127), " +
            /* Indent */"	account_number   VARCHAR(64), " +
            /* Indent */"	initial_balance  BIGINT, " +
            /* Indent */"	account_password VARCHAR(32), " +
            /* Indent */"	issue_date       BIGINT, " +
            /* Indent */"	expire_date      BIGINT, " +
            /* Indent */"	arrange          BIGINT, " +
            /* Indent */"	notused          INT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_BANK_RECORD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_BANK_RECORD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	account_id       BIGINT, " +
            /* Indent */"	transaction_date BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_BUDGET = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_BUDGET + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	budget_date      BIGINT, " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	account_code     CHAR(2), " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_CARD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_CARD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	company          VARCHAR(127), " +
            /* Indent */"	card_name        VARCHAR(127), " +
            /* Indent */"	card_number      VARCHAR(32), " +
            /* Indent */"	card_password    CHAR(4), " +
            /* Indent */"	valid_year       INT, " +
            /* Indent */"	valid_month      INT, " +
            /* Indent */"	charge_date      INT, " +
            /* Indent */"	cvc_number       INT, " +
            /* Indent */"	bank_id          BIGINT, " +
            /* Indent */"	credit_limit     BIGINT, " +
            /* Indent */"	cash_advance     BIGINT, " +
            /* Indent */"	card_loan        BIGINT, " +
            /* Indent */"	issue_date       BIGINT, " +
            /* Indent */"	refresh_normal   INT, " +
            /* Indent */"	refresh_short    INT, " +
            /* Indent */"	arrange          BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_CARD_RECORD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_CARD_RECORD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	card_id          BIGINT, " +
            /* Indent */"	transaction_date BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	price            BIGINT, " +
            /* Indent */"	commission       BIGINT, " +
            /* Indent */"	installment      INT, " +
            /* Indent */"	installment_id   BIGINT, " +
            /* Indent */"	installment_turn INT, " +
            /* Indent */"	amount           BIGINT, " +
            /* Indent */"	remainder        BIGINT, " +
            /* Indent */"	settlement_date  BIGINT, " +
            /* Indent */"	paid             INT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_DIARY = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_DIARY + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	wdate            BIGINT, " +
            /* Indent */"	weather          INT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	content          VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_INSURANCE = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_INSURANCE + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	company          VARCHAR(127), " +
            /* Indent */"	product          VARCHAR(127), " +
            /* Indent */"	insurance_type   VARCHAR(32), " +
            /* Indent */"	policy_type      VARCHAR(32), " +
            /* Indent */"	contract_id      VARCHAR(32), " +
            /* Indent */"	policy_holder    VARCHAR(127), " +
            /* Indent */"	insured          VARCHAR(127), " +
            /* Indent */"	pay_count_total  INT, " +
            /* Indent */"	pay_count_done   INT, " +
            /* Indent */"	premium_volume   BIGINT, " +
            /* Indent */"	premium_mode     VARCHAR(32), " +
            /* Indent */"	arranger         VARCHAR(127), " +
            /* Indent */"	contract_status  INT, " +
            /* Indent */"	contract_date    BIGINT, " +
            /* Indent */"	maturity_date    BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_INSURANCE_RECORD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_INSURANCE_RECORD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	insurance_id     BIGINT, " +
            /* Indent */"	transaction_date BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_MEMO = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_MEMO + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	wdate            BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	content          VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_REALESTATE = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_REALESTATE + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	estate_type      VARCHAR(127), " +
            /* Indent */"	title            VARCHAR(127), " +
            /* Indent */"	holder           VARCHAR(127), " +
            /* Indent */"	estimate         BIGINT, " +
            /* Indent */"	loan             BIGINT, " +
            /* Indent */"	acquisition_date BIGINT, " +
            /* Indent */"	estimate_date    BIGINT, " +
            /* Indent */"	arrange          BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_REALESTATE_RECORD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_REALESTATE_RECORD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	realestate_id    BIGINT, " +
            /* Indent */"	transaction_date BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_RECORD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_RECORD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	wdate            BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	account_code     CHAR(2), " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_REGULAR_PAY = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_REGULAR_PAY + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	wdate            BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	account_code     CHAR(2), " +
            /* Indent */"	month_day        INT, " +
            /* Indent */"	sdate            BIGINT, " +
            /* Indent */"	edate            BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_REGULAR_RECORD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_REGULAR_RECORD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	regular_pay_id   BIGINT, " +
            /* Indent */"	wdate            BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	account_code     CHAR(2), " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_SCHEDULE = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_SCHEDULE + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	pdate            BIGINT, " +
            /* Indent */"	readok           INT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_STOCK = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_STOCK + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	company          VARCHAR(127), " +
            /* Indent */"	account_name     VARCHAR(127), " +
            /* Indent */"	account_number   VARCHAR(32), " +
            /* Indent */"	holder           VARCHAR(127), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	estimate         BIGINT, " +
            /* Indent */"	estimate_date    BIGINT, " +
            /* Indent */"	arrange          BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_STOCK_RECORD = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_STOCK_RECORD + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	stock_id         BIGINT, " +
            /* Indent */"	transaction_date BIGINT, " +
            /* Indent */"	title            VARCHAR(255), " +
            /* Indent */"	deposit          BIGINT, " +
            /* Indent */"	withdrawal       BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000)" +
            /* Indent */");";

    public static final String CREATE_TB_TITLES = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_TITLES + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	used             BIGINT, " +
            /* Indent */"	title            VARCHAR(255) " +
            /* Indent */");";

    public static final String CREATE_TB_PASSWORD_BOOK = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_PASSWORD_BOOK + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	surl             VARCHAR(100), " +
            /* Indent */"	sname            VARCHAR(100), " +
            /* Indent */"	stype            VARCHAR(100), " +
            /* Indent */"	myid             VARCHAR(100), " +
            /* Indent */"	mypw             VARCHAR(100), " +
            /* Indent */"	reg_date         BIGINT, " +
            /* Indent */"	fix_date         BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000) " +
            /* Indent */");";

    public static final String DROP_TB_ACCOUNT_CLASS /* Indent---- */ = "DROP TABLE IF EXISTS " + TB_ACCOUNT_CLASS + ";";
    public static final String DROP_TB_ACCOUNT_CODE /* Indent----- */ = "DROP TABLE IF EXISTS " + TB_ACCOUNT_CODE + ";";
    public static final String DROP_TB_ADDRESSBOOK /* Indent------ */ = "DROP TABLE IF EXISTS " + TB_ADDRESSBOOK + ";";
    public static final String DROP_TB_ANNIVERSARY /* Indent------ */ = "DROP TABLE IF EXISTS " + TB_ANNIVERSARY + ";";
    public static final String DROP_TB_BANK /* Indent------------- */ = "DROP TABLE IF EXISTS " + TB_BANK + ";";
    public static final String DROP_TB_BANK_RECORD /* Indent------ */ = "DROP TABLE IF EXISTS " + TB_BANK_RECORD + ";";
    public static final String DROP_TB_BUDGET  /* Indent---------- */ = "DROP TABLE IF EXISTS " + TB_BUDGET + ";";
    public static final String DROP_TB_CARD  /* Indent------------ */ = "DROP TABLE IF EXISTS " + TB_CARD + ";";
    public static final String DROP_TB_CARD_RECORD /* Indent------ */ = "DROP TABLE IF EXISTS " + TB_CARD_RECORD + ";";
    public static final String DROP_TB_DIARY /* Indent------------ */ = "DROP TABLE IF EXISTS " + TB_DIARY + ";";
    public static final String DROP_TB_INSURANCE /* Indent-------- */ = "DROP TABLE IF EXISTS " + TB_INSURANCE + ";";
    public static final String DROP_TB_INSURANCE_RECORD /* Indent- */ = "DROP TABLE IF EXISTS " + TB_INSURANCE_RECORD + ";";
    public static final String DROP_TB_MEMO /* Indent------------- */ = "DROP TABLE IF EXISTS " + TB_MEMO + ";";
    public static final String DROP_TB_REALESTATE /* Indent ------ */ = "DROP TABLE IF EXISTS " + TB_REALESTATE + ";";
    public static final String DROP_TB_REALESTATE_RECORD /* Indent */ = "DROP TABLE IF EXISTS " + TB_REALESTATE_RECORD + ";";
    public static final String DROP_TB_RECORD /* Indent----------- */ = "DROP TABLE IF EXISTS " + TB_RECORD + ";";
    public static final String DROP_TB_REGULAR_PAY /* Indent------ */ = "DROP TABLE IF EXISTS " + TB_REGULAR_PAY + ";";
    public static final String DROP_TB_REGULAR_RECORD /* Indent--- */ = "DROP TABLE IF EXISTS " + TB_REGULAR_RECORD + ";";
    public static final String DROP_TB_SCHEDULE /* Indent--------- */ = "DROP TABLE IF EXISTS " + TB_SCHEDULE + ";";
    public static final String DROP_TB_STOCK /* Indent------------ */ = "DROP TABLE IF EXISTS " + TB_STOCK + ";";
    public static final String DROP_TB_STOCK_RECORD /* Indent----- */ = "DROP TABLE IF EXISTS " + TB_STOCK_RECORD + ";";
    public static final String DROP_TB_TITLES /* Indent----------- */ = "DROP TABLE IF EXISTS " + TB_TITLES + ";";
    public static final String DROP_TB_PASSWORD_BOOK /* Indent---- */ = "DROP TABLE IF EXISTS " + TB_PASSWORD_BOOK + ";";

}
