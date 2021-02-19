package com.gmail.webos21.pds.db;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.HashMap;
import java.util.Map;

import com.gmail.webos21.pds.db.h2.H2Database;
import com.gmail.webos21.pds.db.h2.H2OpenHelper;
import com.gmail.webos21.pds.db.repo.AccountClassRepo;
import com.gmail.webos21.pds.db.repo.AccountClassRepoImpl;
import com.gmail.webos21.pds.db.repo.AccountCodeRepo;
import com.gmail.webos21.pds.db.repo.AccountCodeRepoImpl;
import com.gmail.webos21.pds.db.repo.AddressBookRepo;
import com.gmail.webos21.pds.db.repo.AddressBookRepoImpl;
import com.gmail.webos21.pds.db.repo.AnniversaryRepo;
import com.gmail.webos21.pds.db.repo.AnniversaryRepoImpl;
import com.gmail.webos21.pds.db.repo.BankRecordRepo;
import com.gmail.webos21.pds.db.repo.BankRecordRepoImpl;
import com.gmail.webos21.pds.db.repo.BankRepo;
import com.gmail.webos21.pds.db.repo.BankRepoImpl;
import com.gmail.webos21.pds.db.repo.BudgetRepo;
import com.gmail.webos21.pds.db.repo.BudgetRepoImpl;
import com.gmail.webos21.pds.db.repo.CardRecordRepo;
import com.gmail.webos21.pds.db.repo.CardRecordRepoImpl;
import com.gmail.webos21.pds.db.repo.CardRepo;
import com.gmail.webos21.pds.db.repo.CardRepoImpl;
import com.gmail.webos21.pds.db.repo.DiaryRepo;
import com.gmail.webos21.pds.db.repo.DiaryRepoImpl;
import com.gmail.webos21.pds.db.repo.InsuranceRecordRepo;
import com.gmail.webos21.pds.db.repo.InsuranceRecordRepoImpl;
import com.gmail.webos21.pds.db.repo.InsuranceRepo;
import com.gmail.webos21.pds.db.repo.InsuranceRepoImpl;
import com.gmail.webos21.pds.db.repo.MemoRepo;
import com.gmail.webos21.pds.db.repo.MemoRepoImpl;
import com.gmail.webos21.pds.db.repo.PasswordBookRepo;
import com.gmail.webos21.pds.db.repo.PasswordBookRepoImpl;
import com.gmail.webos21.pds.db.repo.RealEstateRecordRepo;
import com.gmail.webos21.pds.db.repo.RealEstateRecordRepoImpl;
import com.gmail.webos21.pds.db.repo.RealEstateRepo;
import com.gmail.webos21.pds.db.repo.RealEstateRepoImpl;
import com.gmail.webos21.pds.db.repo.RecordRepo;
import com.gmail.webos21.pds.db.repo.RecordRepoImpl;
import com.gmail.webos21.pds.db.repo.RegularPayRepo;
import com.gmail.webos21.pds.db.repo.RegularPayRepoImpl;
import com.gmail.webos21.pds.db.repo.RegularRecordRepo;
import com.gmail.webos21.pds.db.repo.RegularRecordRepoImpl;
import com.gmail.webos21.pds.db.repo.ScheduleRepo;
import com.gmail.webos21.pds.db.repo.ScheduleRepoImpl;
import com.gmail.webos21.pds.db.repo.StockRecordRepo;
import com.gmail.webos21.pds.db.repo.StockRecordRepoImpl;
import com.gmail.webos21.pds.db.repo.StockRepo;
import com.gmail.webos21.pds.db.repo.StockRepoImpl;
import com.gmail.webos21.pds.db.repo.TitlesRepo;
import com.gmail.webos21.pds.db.repo.TitlesRepoImpl;
import com.gmail.webos21.pds.web.log.Log;

public class PdsDbHelper extends H2OpenHelper {

	private static final String TAG = "PdsDbHelper";

	private Map<Class<?>, Object> domainRepo;

	public PdsDbHelper(String filePath, String user, String pass, String opts, int version) {
		super(filePath, user, pass, opts, version);
		domainRepo = new HashMap<Class<?>, Object>();
		initRepository();
	}

	private void initRepository() {
		domainRepo.put(AccountClassRepo.class, new AccountClassRepoImpl(this));
		domainRepo.put(AccountCodeRepo.class, new AccountCodeRepoImpl(this));
		domainRepo.put(AddressBookRepo.class, new AddressBookRepoImpl(this));
		domainRepo.put(AnniversaryRepo.class, new AnniversaryRepoImpl(this));
		domainRepo.put(BankRecordRepo.class, new BankRecordRepoImpl(this));
		domainRepo.put(BankRepo.class, new BankRepoImpl(this));
		domainRepo.put(BudgetRepo.class, new BudgetRepoImpl(this));
		domainRepo.put(CardRecordRepo.class, new CardRecordRepoImpl(this));
		domainRepo.put(CardRepo.class, new CardRepoImpl(this));
		domainRepo.put(DiaryRepo.class, new DiaryRepoImpl(this));
		domainRepo.put(InsuranceRecordRepo.class, new InsuranceRecordRepoImpl(this));
		domainRepo.put(InsuranceRepo.class, new InsuranceRepoImpl(this));
		domainRepo.put(MemoRepo.class, new MemoRepoImpl(this));
		domainRepo.put(PasswordBookRepo.class, new PasswordBookRepoImpl(this));
		domainRepo.put(RealEstateRecordRepo.class, new RealEstateRecordRepoImpl(this));
		domainRepo.put(RealEstateRepo.class, new RealEstateRepoImpl(this));
		domainRepo.put(RecordRepo.class, new RecordRepoImpl(this));
		domainRepo.put(RegularPayRepo.class, new RegularPayRepoImpl(this));
		domainRepo.put(RegularRecordRepo.class, new RegularRecordRepoImpl(this));
		domainRepo.put(ScheduleRepo.class, new ScheduleRepoImpl(this));
		domainRepo.put(StockRecordRepo.class, new StockRecordRepoImpl(this));
		domainRepo.put(StockRepo.class, new StockRepoImpl(this));
		domainRepo.put(TitlesRepo.class, new TitlesRepoImpl(this));
	}

	@Override
	public void onCreate(H2Database db) {
		if (DbConsts.DB_DEBUG) {
			Log.d(TAG, "onCreate [" + getFilePath() + "]");
		}
		db.execSQL(DbConsts.CREATE_TB_ACCOUNT_CLASS);
		db.execSQL(DbConsts.CREATE_TB_ACCOUNT_CODE);
		db.execSQL(DbConsts.CREATE_TB_ADDRESSBOOK);
		db.execSQL(DbConsts.CREATE_TB_ANNIVERSARY);
		db.execSQL(DbConsts.CREATE_TB_BANK);
		db.execSQL(DbConsts.CREATE_TB_BANK_RECORD);
		db.execSQL(DbConsts.CREATE_TB_BUDGET);
		db.execSQL(DbConsts.CREATE_TB_CARD);
		db.execSQL(DbConsts.CREATE_TB_CARD_RECORD);
		db.execSQL(DbConsts.CREATE_TB_DIARY);
		db.execSQL(DbConsts.CREATE_TB_INSURANCE);
		db.execSQL(DbConsts.CREATE_TB_INSURANCE_RECORD);
		db.execSQL(DbConsts.CREATE_TB_MEMO);
		db.execSQL(DbConsts.CREATE_TB_REALESTATE);
		db.execSQL(DbConsts.CREATE_TB_REALESTATE_RECORD);
		db.execSQL(DbConsts.CREATE_TB_RECORD);
		db.execSQL(DbConsts.CREATE_TB_REGULAR_PAY);
		db.execSQL(DbConsts.CREATE_TB_REGULAR_RECORD);
		db.execSQL(DbConsts.CREATE_TB_SCHEDULE);
		db.execSQL(DbConsts.CREATE_TB_STOCK);
		db.execSQL(DbConsts.CREATE_TB_STOCK_RECORD);
		db.execSQL(DbConsts.CREATE_TB_TITLES);
		db.execSQL(DbConsts.CREATE_TB_PASSWORD_BOOK);
	}

	private void dropTables(H2Database db) {
		db.execSQL(DbConsts.DROP_TB_ACCOUNT_CLASS);
		db.execSQL(DbConsts.DROP_TB_ACCOUNT_CODE);
		db.execSQL(DbConsts.DROP_TB_ADDRESSBOOK);
		db.execSQL(DbConsts.DROP_TB_ANNIVERSARY);
		db.execSQL(DbConsts.DROP_TB_BANK);
		db.execSQL(DbConsts.DROP_TB_BANK_RECORD);
		db.execSQL(DbConsts.DROP_TB_BUDGET);
		db.execSQL(DbConsts.DROP_TB_CARD);
		db.execSQL(DbConsts.DROP_TB_CARD_RECORD);
		db.execSQL(DbConsts.DROP_TB_DIARY);
		db.execSQL(DbConsts.DROP_TB_INSURANCE);
		db.execSQL(DbConsts.DROP_TB_INSURANCE_RECORD);
		db.execSQL(DbConsts.DROP_TB_MEMO);
		db.execSQL(DbConsts.DROP_TB_REALESTATE);
		db.execSQL(DbConsts.DROP_TB_REALESTATE_RECORD);
		db.execSQL(DbConsts.DROP_TB_RECORD);
		db.execSQL(DbConsts.DROP_TB_REGULAR_PAY);
		db.execSQL(DbConsts.DROP_TB_REGULAR_RECORD);
		db.execSQL(DbConsts.DROP_TB_SCHEDULE);
		db.execSQL(DbConsts.DROP_TB_STOCK);
		db.execSQL(DbConsts.DROP_TB_STOCK_RECORD);
		db.execSQL(DbConsts.DROP_TB_TITLES);
		db.execSQL(DbConsts.DROP_TB_PASSWORD_BOOK);
	}

	@Override
	public void onUpgrade(H2Database db, int oldVersion, int newVersion) {
		if (DbConsts.DB_DEBUG) {
			Log.d(TAG, "onUpgrade [" + getFilePath() + "] oldVer = " + oldVersion + ", newVer = " + newVersion);
		}
		if (oldVersion != newVersion) {
			dropTables(db);
			onCreate(db);
		}
	}

	@SuppressWarnings("unchecked")
	public <T> T getRepository(Class<T> in) {
		Log.d(TAG, "Request Class = " + in.getName());
		return (T) domainRepo.get(in);
	}

	public void debugDump(String tableName) {
		try {
			H2Database db = getReadableDatabase();
			ResultSet rset = db.rawQuery("SELECT * FROM " + tableName, null);
			if (rset == null) {
				return;
			}

			ResultSetMetaData rmd = rset.getMetaData();

			int nCol = rmd.getColumnCount();
			StringBuilder sb = new StringBuilder();
			for (int i = 1; i <= nCol; i++) {
				sb.append(rmd.getColumnName(i)).append('(').append(i).append(')').append('\t').append('|');
			}
			if (DbConsts.DB_DEBUG) {
				Log.d(TAG, sb.toString());
			}

			sb.delete(0, sb.length());

			rset.first();
			do {
				for (int c = 1; c <= nCol; c++) {
					sb.append(rset.getString(c)).append('\t').append('|');
				}
				sb.append('\n');
			} while (rset.next());

			if (DbConsts.DB_DEBUG) {
				Log.d(TAG, sb.toString());
			}

			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
