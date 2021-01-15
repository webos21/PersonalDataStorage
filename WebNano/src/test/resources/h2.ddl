
CREATE TABLE IF NOT EXISTS  tb_account_class (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	title            VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS  tb_account_code (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	account_code     CHAR(2), 
	title            VARCHAR(255)
);

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
);

CREATE TABLE IF NOT EXISTS  tb_anniversary (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	title            VARCHAR(255), 
	apply_date       CHAR(4),
	lunar            INT, 
	holiday          INT
);

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
);

CREATE TABLE IF NOT EXISTS  tb_bank_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	account_id       BIGINT, 
	transaction_date BIGINT, 
	title            VARCHAR(255), 
	deposit          BIGINT, 
	withdrawal       BIGINT, 
	memo             VARCHAR(4000)
);

CREATE TABLE IF NOT EXISTS  tb_budget (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	budget_date      BIGINT, 
	deposit          BIGINT, 
	withdrawal       BIGINT, 
	account_code     CHAR(2), 
	memo             VARCHAR(4000)
);

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
	cash_advance     BIGINT,
	card_loan        BIGINT, 
	issue_date       BIGINT, 
	refresh_normal   INT, 
	refresh_short    INT, 
	arrange          BIGINT, 
	memo             VARCHAR(4000)
);

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
);

CREATE TABLE IF NOT EXISTS  tb_diary (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	wdate            BIGINT, 
	weather          INT, 
	title            VARCHAR(255), 
	content          VARCHAR(4000)
);

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
);

CREATE TABLE IF NOT EXISTS  tb_insurance_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	insurance_id     BIGINT, 
	transaction_date BIGINT, 
	title            VARCHAR(255), 
	deposit          BIGINT, 
	withdrawal       BIGINT, 
	memo             VARCHAR(4000)
);

CREATE TABLE IF NOT EXISTS  tb_memo (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	wdate            BIGINT, 
	title            VARCHAR(255), 
	content          VARCHAR(4000)
);

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
);

CREATE TABLE IF NOT EXISTS  tb_realestate_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	realestate_id    BIGINT, 
	transaction_date BIGINT, 
	title            VARCHAR(255), 
	deposit          BIGINT, 
	withdrawal       BIGINT, 
	memo             VARCHAR(4000)
);

CREATE TABLE IF NOT EXISTS  tb_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	wdate            BIGINT, 
	title            VARCHAR(255), 
	deposit          BIGINT, 
	withdrawal       BIGINT, 
	account_code     CHAR(2), 
	memo             VARCHAR(4000)
);

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
);

CREATE TABLE IF NOT EXISTS  tb_regular_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	regular_pay_id   BIGINT, 
	wdate            BIGINT, 
	title            VARCHAR(255), 
	deposit          BIGINT, 
	withdrawal       BIGINT, 
	account_code     CHAR(2), 
	memo             VARCHAR(4000)
);

CREATE TABLE IF NOT EXISTS  tb_schedule (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	title            VARCHAR(255), 
	pdate            BIGINT, 
	readok           INT, 
	memo             VARCHAR(4000)
);

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
);

CREATE TABLE IF NOT EXISTS  tb_stock_record (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	stock_id         BIGINT, 
	transaction_date BIGINT, 
	title            VARCHAR(255), 
	deposit          BIGINT, 
	withdrawal       BIGINT, 
	memo             VARCHAR(4000)
);

CREATE TABLE IF NOT EXISTS  tb_titles (
	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, 
	used             BIGINT, 
	title            VARCHAR(255) 
);

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
);


CREATE TABLE IF NOT EXISTS tb_version (
	version          INTEGER
)
