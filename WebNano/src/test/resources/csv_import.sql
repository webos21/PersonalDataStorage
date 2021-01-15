
CREATE TABLE IF NOT EXISTS  tb_account_class (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	title            VARCHAR(255)
) AS SELECT * FROM CSVREAD('tb_account_class.txt');




CREATE TABLE IF NOT EXISTS  tb_account_code (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	account_code     CHAR(2),
	title            VARCHAR(255)
) AS SELECT * FROM CSVREAD('tb_account_code.txt');



CREATE TABLE IF NOT EXISTS  tb_addressbook (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	full_name        VARCHAR(127),
	mobile           VARCHAR(32),
	category         VARCHAR(127),
	telephone        VARCHAR(32),
	fax              VARCHAR(32),
	email            VARCHAR(127),
	homepage         VARCHAR(127),
	postcode         VARCHAR(255),
	address          VARCHAR(255),
	memo             VARCHAR(4000)
) AS SELECT * FROM CSVREAD('tb_addressbook.txt');




CREATE TABLE IF NOT EXISTS  tb_anniversary (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	title            VARCHAR(255),
	apply_date       CHAR(4),
	lunar            INT,
	holiday          INT
) AS SELECT id, title, apply_date,
            CASEWHEN(lunar='음력', 1, 0),
            CASEWHEN(holiday='휴일', 1, 0)
       FROM CSVREAD('tb_anniversary.txt');




CREATE TABLE IF NOT EXISTS  tb_bank (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	bank_name        VARCHAR(127),
	account_name     VARCHAR(127),
	holder           VARCHAR(127),
	account_number   VARCHAR(64),
	initial_balance  BIGINT,
	account_password VARCHAR(32),
	issue_date       BIGINT,
	expire_date      BIGINT,
	arrange          BIGINT,
	notused          INT,
	memo             VARCHAR(4000)
) AS SELECT id, bank_name, account_name, holder, account_number, initial_balance, account_password,
            (EXTRACT(EPOCH FROM TO_DATE(issue_date, 'YYYY-MM-DD')) * 1000),
            (EXTRACT(EPOCH FROM TO_DATE(expire_date, 'YYYY-MM-DD')) * 1000),
            arrange, inuse, memo
       FROM CSVREAD('tb_bank.txt');




SELECT id, account_id,
            EXTRACT(EPOCH FROM TO_DATE(transaction_date, 'YYYY-MM-DD')),
            title, deposit, withdrawal, memo
         FROM CSVREAD('tb_bank_record.txt');

CREATE TABLE IF NOT EXISTS  tb_bank_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	account_id       BIGINT,
	transaction_date BIGINT,
	title            VARCHAR(255),
	deposit          BIGINT,
	withdrawal       BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, account_id,
            (EXTRACT(EPOCH FROM TO_DATE(transaction_date, 'YYYY-MM-DD')) * 1000),
            title, deposit, withdrawal, memo
         FROM CSVREAD('tb_bank_record.txt');



CREATE TABLE IF NOT EXISTS  tb_budget (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	budget_date      BIGINT,
	deposit          BIGINT,
	withdrawal       BIGINT,
	account_code     CHAR(2),
	memo             VARCHAR(4000)
) AS SELECT id, (EXTRACT(EPOCH FROM TO_DATE(budget_date, 'YYYY-MM-DD')) * 1000),
             deposit, withdrawal, account_code, memo
          FROM CSVREAD('tb_budget.txt');



CREATE TABLE IF NOT EXISTS  tb_card (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	company          VARCHAR(127),
	card_name        VARCHAR(127),
	card_number      VARCHAR(32),
	card_password    CHAR(4),
	valid_year       INT,
	valid_month      INT,
	charge_date      INT,
	cvc_number       INT,
	bank_id          BIGINT,
	credit_limit     BIGINT,
	cash_advance    BIGINT,
	card_loan        BIGINT,
	issue_date       BIGINT,
	refresh_normal   INT,
	refresh_short    INT,
	arrange          BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, company, card_name, card_number, card_password, valid_year, valid_month, charge_date, cvc_number,
            bank_id, credit_limit, cash_advance, card_loan,
            (EXTRACT(EPOCH FROM TO_DATE(issue_date, 'YYYY-MM-DD')) * 1000),
            refresh_normal, refresh_short, arrange, memo
       FROM CSVREAD('tb_card.txt');



CREATE TABLE IF NOT EXISTS  tb_card_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	card_id          BIGINT,
	transaction_date BIGINT,
	title            VARCHAR(255),
	price            BIGINT,
	commission       BIGINT,
	installment      INT,
	installment_id   BIGINT,
	installment_turn INT,
	amount           BIGINT,
	remainder        BIGINT,
	settlement_date  BIGINT,
	paid             INT,
	memo             VARCHAR(4000)
) AS SELECT id, card_id,
            (EXTRACT(EPOCH FROM TO_DATE(transaction_date, 'YYYY-MM-DD')) * 1000),
            title, price, commission, installment, installment_id, installment_turn, amount, remainder,
            (EXTRACT(EPOCH FROM TO_DATE(settlement_date, 'YYYY-MM-DD')) * 1000),
            paid, memo
       FROM CSVREAD('tb_card_record.txt');



CREATE TABLE IF NOT EXISTS  tb_diary (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	wdate            BIGINT,
	weather          INT,
	title            VARCHAR(255),
	content          VARCHAR(4000)
) AS SELECT id,
              (EXTRACT(EPOCH FROM TO_DATE(wdate, 'YYYY-MM-DD')) * 1000),
              weather, title, content
       FROM CSVREAD('tb_diary.txt');




CREATE TABLE IF NOT EXISTS  tb_insurance (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	company          VARCHAR(127),
	product          VARCHAR(127),
	insurance_type   VARCHAR(32),
	policy_type      VARCHAR(32),
	contract_id      VARCHAR(32),
	policy_holder    VARCHAR(127),
	insured          VARCHAR(127),
	pay_count_total  INT,
	pay_count_done   INT,
	premium_volume   BIGINT,
	premium_mode     VARCHAR(32),
	arranger         VARCHAR(127),
	contract_status  INT,
	contract_date    BIGINT,
	maturity_date    BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, company, product, insurance_type, policy_type, contract_id, policy_holder, insured,
            pay_count_total, pay_count_done, premium_volume, premium_mode, arranger,
            CASEWHEN(contract_status='정상', 1, 0),
            (EXTRACT(EPOCH FROM TO_DATE(contract_date, 'YYYY-MM-DD')) * 1000),
            (EXTRACT(EPOCH FROM TO_DATE(maturity_date, 'YYYY-MM-DD')) * 1000),
            memo
       FROM CSVREAD('tb_insurance.txt');



CREATE TABLE IF NOT EXISTS  tb_insurance_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	insurance_id     BIGINT,
	transaction_date BIGINT,
	title            VARCHAR(255),
	deposit          BIGINT,
	withdrawal       BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, insurance_id,
             (EXTRACT(EPOCH FROM TO_DATE(transaction_date, 'YYYY-MM-DD')) * 1000),
             title, deposit, withdrawal, memo
        FROM CSVREAD('tb_insurance_record.txt');



CREATE TABLE IF NOT EXISTS  tb_memo (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	wdate            BIGINT,
	title            VARCHAR(255),
	content          VARCHAR(4000)
) AS SELECT id,
            (EXTRACT(EPOCH FROM TO_DATE(wdate, 'YYYY-MM-DD')) * 1000),
            title, content
       FROM CSVREAD('tb_memo.txt');



CREATE TABLE IF NOT EXISTS  tb_password_book (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	surl             VARCHAR(100),
	sname            VARCHAR(100),
	stype            VARCHAR(100),
	myid             VARCHAR(100),
	mypw             VARCHAR(100),
	reg_date         BIGINT,
	fix_date         BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, surl, sname, stype, myid, mypw,
            (EXTRACT(EPOCH FROM TO_DATE(reg_date, 'YYYY-MM-DD')) * 1000),
            (EXTRACT(EPOCH FROM TO_DATE(fix_date, 'YYYY-MM-DD')) * 1000),
            memo
       FROM CSVREAD('tb_password_book.txt');



CREATE TABLE IF NOT EXISTS  tb_realestate (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	estate_type      VARCHAR(127),
	title            VARCHAR(127),
	holder           VARCHAR(127),
	estimate         BIGINT,
	loan             BIGINT,
	acquisition_date BIGINT,
	estimate_date    BIGINT,
	arrange          BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, estate_type, title, holder, estimate, loan,
             (EXTRACT(EPOCH FROM TO_DATE(acquisition_date, 'YYYY-MM-DD')) * 1000),
             (EXTRACT(EPOCH FROM TO_DATE(estimate_date, 'YYYY-MM-DD')) * 1000),
             arrange, memo
        FROM CSVREAD('tb_realestate.txt');



CREATE TABLE IF NOT EXISTS  tb_realestate_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	realestate_id    BIGINT,
	transaction_date BIGINT,
	title            VARCHAR(255),
	deposit          BIGINT,
	withdrawal       BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, realestate_id,
              (EXTRACT(EPOCH FROM TO_DATE(transaction_date, 'YYYY-MM-DD')) * 1000),
              title, deposit, withdrawal, memo
         FROM CSVREAD('tb_realestate_record.txt');



CREATE TABLE IF NOT EXISTS  tb_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	wdate            BIGINT,
	title            VARCHAR(255),
	deposit          BIGINT,
	withdrawal       BIGINT,
	account_code     CHAR(2),
	memo             VARCHAR(4000)
) AS SELECT id,
            (EXTRACT(EPOCH FROM TO_DATE(wdate, 'YYYY-MM-DD')) * 1000),
            title, deposit, withdrawal, account_code, memo
       FROM CSVREAD('tb_record.txt');



CREATE TABLE IF NOT EXISTS  tb_regular_pay (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	wdate            BIGINT,
	title            VARCHAR(255),
	deposit          BIGINT,
	withdrawal       BIGINT,
	account_code     CHAR(2),
	month_day        INT,
	sdate            BIGINT,
	edate            BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id,
            (EXTRACT(EPOCH FROM TO_DATE(wdate, 'YYYY-MM-DD')) * 1000),
            title, deposit, withdrawal, account_code, month_day,
            (EXTRACT(EPOCH FROM TO_DATE(sdate, 'YYYY-MM-DD')) * 1000),
            (EXTRACT(EPOCH FROM TO_DATE(edate, 'YYYY-MM-DD')) * 1000),
            memo
       FROM CSVREAD('tb_regular_pay.txt');




CREATE TABLE IF NOT EXISTS  tb_regular_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	regular_pay_id   BIGINT,
	wdate            BIGINT,
	title            VARCHAR(255),
	deposit          BIGINT,
	withdrawal       BIGINT,
	account_code     CHAR(2),
	memo             VARCHAR(4000)
) AS SELECT id, regular_pay_id,
             (EXTRACT(EPOCH FROM TO_DATE(wdate, 'YYYY-MM-DD')) * 1000),
             title, deposit, withdrawal, account_code, memo
        FROM CSVREAD('tb_regular_record.txt');



CREATE TABLE IF NOT EXISTS  tb_schedule (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	title            VARCHAR(255),
	pdate            BIGINT,
	readok           INT,
	memo             VARCHAR(4000)
) AS SELECT id, title,
            (EXTRACT(EPOCH FROM TO_DATE(pdate, 'YYYY-MM-DD')) * 1000),
            readok, null
       FROM CSVREAD('tb_schedule.txt');



CREATE TABLE IF NOT EXISTS  tb_stock (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	company          VARCHAR(127),
	account_name     VARCHAR(127),
	account_number   VARCHAR(32),
	holder           VARCHAR(127),
	deposit          BIGINT,
	estimate         BIGINT,
	estimate_date    BIGINT,
	arrange          BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, company, account_name, account_number, holder, deposit, estimate,
            (EXTRACT(EPOCH FROM TO_DATE(estimate_date, 'YYYY-MM-DD')) * 1000),
            arrange, memo
       FROM CSVREAD('tb_stock.txt');



CREATE TABLE IF NOT EXISTS  tb_stock_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	stock_id         BIGINT,
	transaction_date BIGINT,
	title            VARCHAR(255),
	deposit          BIGINT,
	withdrawal       BIGINT,
	memo             VARCHAR(4000)
) AS SELECT id, stock_id,
            (EXTRACT(EPOCH FROM TO_DATE(transaction_date, 'YYYY-MM-DD')) * 1000),
            title, deposit, withdrawal, memo
       FROM CSVREAD('tb_stock_record.txt');




CREATE TABLE IF NOT EXISTS  tb_titles (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT,
	used             BIGINT,
	title            VARCHAR(255)
) AS SELECT * FROM CSVREAD('tb_titles.txt');




CREATE TABLE IF NOT EXISTS tb_version (
	version          INTEGER
);

INSERT INTO tb_version VALUES (1);














