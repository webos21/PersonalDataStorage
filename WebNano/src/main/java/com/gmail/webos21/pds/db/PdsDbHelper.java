package com.gmail.webos21.pds.db;

import com.gmail.webos21.pds.db.h2.H2Database;
import com.gmail.webos21.pds.db.h2.H2OpenHelper;
import com.gmail.webos21.pds.db.repo.PbRepo;
import com.gmail.webos21.pds.db.repo.PbRepoImpl;
import com.gmail.webos21.pds.web.log.Log;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.HashMap;
import java.util.Map;

public class PdsDbHelper extends H2OpenHelper {

	private static final String TAG = "PdsDbHelper";

	private Map<Class<?>, Object> domainRepo;

	public PdsDbHelper(String filePath, String user, String pass, String opts, int version) {
		super(filePath, user, pass, opts, version);
		domainRepo = new HashMap<Class<?>, Object>();
		initRepository();
	}

	private void initRepository() {
		domainRepo.put(PbRepo.class, new PbRepoImpl(this));
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
