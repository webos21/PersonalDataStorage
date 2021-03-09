package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Bank;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class BankRepoImpl implements BankRepo {

	private PdsDbHelper opener;

	public BankRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<Bank> findRows() {
		List<Bank> aList = new ArrayList<Bank>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* intent -------- */ "SELECT id, bank_name, account_name, holder, " + // indent
					/* intent -------- */ "       account_number, initial_balance, account_password, " + // indent
					/* intent -------- */ "       issue_date, expire_date, arrange, notused, memo " + // indent
					/* intent -------- */ "  FROM " + DbConsts.TB_BANK, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Bank aRow = new Bank( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* bank_name ------ */rset.getString(2), // indent
						/* account_name --- */rset.getString(3), // indent
						/* holder --------- */rset.getString(4), // indent
						/* account_number - */rset.getString(5), // indent
						/* initial_balance- */rset.getLong(6), // indent
						/* account_password */rset.getString(7), // indent
						/* issue_date ----- */rset.getLong(8), // indent
						/* expire_date ---- */rset.getLong(9), // indent
						/* arrange -------- */rset.getLong(10), // indent
						/* notused -------- */rset.getInt(11), // indent
						/* memo ----------- */rset.getString(12)); // indent
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
			opener.debugDump(DbConsts.TB_BANK);
		}

		return aList;
	}

	@Override
	public List<Bank> findRows(String keyString) {
		List<Bank> aList = new ArrayList<Bank>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* intent -------- */ "SELECT id, bank_name, account_name, holder, " + // indent
					/* intent -------- */ "       account_number, initial_balance, account_password, " + // indent
					/* intent -------- */ "       issue_date, expire_date, arrange, notused, memo " + // indent
					/* intent -------- */ " FROM " + DbConsts.TB_BANK + " " + // indent
					/* intent -------- */ " WHERE (bank_name LIKE ?) OR " + // indent
					/* intent -------- */ "        (account_name LIKE ?) OR " + // indent
					/* intent -------- */ "        (account_number LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Bank aRow = new Bank( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* bank_name ------ */rset.getString(2), // indent
						/* account_name --- */rset.getString(3), // indent
						/* holder --------- */rset.getString(4), // indent
						/* account_number - */rset.getString(5), // indent
						/* initial_balance- */rset.getLong(6), // indent
						/* account_password */rset.getString(7), // indent
						/* issue_date ----- */rset.getLong(8), // indent
						/* expire_date ---- */rset.getLong(9), // indent
						/* arrange -------- */rset.getLong(10), // indent
						/* notused -------- */rset.getInt(11), // indent
						/* memo ----------- */rset.getString(12)); // indent
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
	public Bank getRow(Long id) {
		Bank aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* intent -------- */ "SELECT id, bank_name, account_name, holder, " + // indent
					/* intent -------- */ "       account_number, initial_balance, account_password, " + // indent
					/* intent -------- */ "       issue_date, expire_date, arrange, notused, memo " + // indent
					/* intent -------- */ "  FROM " + DbConsts.TB_BANK + // indent
					/* intent -------- */ " WHERE id = " + id, null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new Bank( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* bank_name ------ */rset.getString(2), // indent
					/* account_name --- */rset.getString(3), // indent
					/* holder --------- */rset.getString(4), // indent
					/* account_number - */rset.getString(5), // indent
					/* initial_balance- */rset.getLong(6), // indent
					/* account_password */rset.getString(7), // indent
					/* issue_date ----- */rset.getLong(8), // indent
					/* expire_date ---- */rset.getLong(9), // indent
					/* arrange -------- */rset.getLong(10), // indent
					/* notused -------- */rset.getInt(11), // indent
					/* memo ----------- */rset.getString(12)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public Bank getRow(Bank aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(Bank newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery( // indent
						/* intent -------- */ "SELECT id, bank_name, account_name, holder, " + // indent
						/* intent -------- */ "       account_number, initial_balance, account_password, " + // indent
						/* intent -------- */ "       issue_date, expire_date, arrange, notused, memo " + // indent
						/* intent -------- */ "  FROM " + DbConsts.TB_BANK + // indent
						/* intent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("bank_name", newRow.getBankName());
					cv.put("account_name", newRow.getAccountName());
					cv.put("holder", newRow.getHolder());
					cv.put("account_number", newRow.getAccountNumber());
					cv.put("initial_balance", newRow.getInitialBalance());
					cv.put("account_password", newRow.getAccountPassword());
					cv.put("issue_date", newRow.getIssueDate().getTime());
					cv.put("expire_date", newRow.getExpireDate().getTime());
					cv.put("arrange", newRow.getArrange());
					cv.put("notused", newRow.getNotUsed());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_BANK, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("bank_name", newRow.getBankName());
					cv.put("account_name", newRow.getAccountName());
					cv.put("holder", newRow.getHolder());
					cv.put("account_number", newRow.getAccountNumber());
					cv.put("initial_balance", newRow.getInitialBalance());
					cv.put("account_password", newRow.getAccountPassword());
					cv.put("issue_date", newRow.getIssueDate().getTime());
					cv.put("expire_date", newRow.getExpireDate().getTime());
					cv.put("arrange", newRow.getArrange());
					cv.put("notused", newRow.getNotUsed());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_BANK, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("bank_name", newRow.getBankName());
				cv.put("account_name", newRow.getAccountName());
				cv.put("holder", newRow.getHolder());
				cv.put("account_number", newRow.getAccountNumber());
				cv.put("initial_balance", newRow.getInitialBalance());
				cv.put("account_password", newRow.getAccountPassword());
				cv.put("issue_date", newRow.getIssueDate().getTime());
				cv.put("expire_date", newRow.getExpireDate().getTime());
				cv.put("arrange", newRow.getArrange());
				cv.put("notused", newRow.getNotUsed());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_BANK, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_BANK, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(Bank aRow) {
		return deleteRow(aRow.getId());
	}

}
