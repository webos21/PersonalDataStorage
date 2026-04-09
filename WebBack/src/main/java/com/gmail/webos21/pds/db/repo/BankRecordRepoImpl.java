package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.BankRecord;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class BankRecordRepoImpl implements BankRecordRepo {

	private PdsDbHelper opener;

	public BankRecordRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<BankRecord> findRows() {
		List<BankRecord> aList = new ArrayList<BankRecord>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, account_id, transaction_date, title, deposit, withdrawal, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_BANK_RECORD // indent
					, null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				BankRecord aRow = new BankRecord( // indent
						/* id ------------- */rset.getLong(1), /* account_id ----- */rset.getLong(2),
						/* transaction_date */rset.getLong(3), /* title ---------- */rset.getString(4),
						/* deposit -------- */rset.getLong(5), /* withdrawal ----- */rset.getLong(6),
						/* memo ----------- */rset.getString(7));
				aList.add(aRow);
			} while (rset.next());

			if (rset != null) {
				rset.close();
			}
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (DbConsts.DB_DEBUG) {
			opener.debugDump(DbConsts.TB_BANK_RECORD);
		}

		return aList;
	}

	@Override
	public List<BankRecord> findRows(String keyString) {
		List<BankRecord> aList = new ArrayList<BankRecord>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, account_id, transaction_date, title, deposit, withdrawal, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_BANK_RECORD + " " + // indent
					/* indent -------- */ " WHERE (title LIKE ?) OR " + // indent
					/* indent -------- */ "        (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				BankRecord aRow = new BankRecord( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* account_id ----- */rset.getLong(2), // indent
						/* transaction_date */rset.getLong(3), // indent
						/* title ---------- */rset.getString(4), // indent
						/* deposit -------- */rset.getLong(5), // indent
						/* withdrawal ----- */rset.getLong(6), // indent
						/* memo ----------- */rset.getString(7)); // indent
				aList.add(aRow);
			} while (rset.next());

			if (rset != null) {
				rset.close();
			}
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aList;
	}

	@Override
	public BankRecord getRow(Long id) {
		BankRecord aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, account_id, transaction_date, title, deposit, withdrawal, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_BANK_RECORD + // indent
					/* indent -------- */ " WHERE id = " + id, null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new BankRecord( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* account_id ----- */rset.getLong(2), // indent
					/* transaction_date */rset.getLong(3), // indent
					/* title ---------- */rset.getString(4), // indent
					/* deposit -------- */rset.getLong(5), // indent
					/* withdrawal ----- */rset.getLong(6), // indent
					/* memo ----------- */rset.getString(7)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public BankRecord getRow(BankRecord aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(BankRecord newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery( // indent
						/* indent -------- */ "SELECT id, account_id, transaction_date, title, " + // indent
						/* indent -------- */ "       deposit, withdrawal, memo " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_BANK_RECORD + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId() // indent
						, null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("account_id", newRow.getAccountId());
					cv.put("transaction_date", newRow.getTransactionDate().getTime());
					cv.put("title", newRow.getTitle());
					cv.put("deposit", newRow.getDeposit());
					cv.put("withdrawal", newRow.getWithdrawal());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_BANK_RECORD, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("account_id", newRow.getAccountId());
					cv.put("transaction_date", newRow.getTransactionDate().getTime());
					cv.put("title", newRow.getTitle());
					cv.put("deposit", newRow.getDeposit());
					cv.put("withdrawal", newRow.getWithdrawal());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_BANK_RECORD, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("account_id", newRow.getAccountId());
				cv.put("transaction_date", newRow.getTransactionDate().getTime());
				cv.put("title", newRow.getTitle());
				cv.put("deposit", newRow.getDeposit());
				cv.put("withdrawal", newRow.getWithdrawal());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_BANK_RECORD, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_BANK_RECORD, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(BankRecord aRow) {
		return deleteRow(aRow.getId());
	}

}
