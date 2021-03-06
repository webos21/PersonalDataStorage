package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.AccountClass;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class AccountClassRepoImpl implements AccountClassRepo {

	private PdsDbHelper opener;

	public AccountClassRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<AccountClass> findRows() {
		List<AccountClass> aList = new ArrayList<AccountClass>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_ACCOUNT_CLASS, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				AccountClass aRow = new AccountClass( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* title ---------- */rset.getString(2)); // indent
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
			opener.debugDump(DbConsts.TB_ACCOUNT_CLASS);
		}

		return aList;
	}

	@Override
	public List<AccountClass> findRows(String keyString) {
		List<AccountClass> aList = new ArrayList<AccountClass>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_ACCOUNT_CLASS + " " + // indent
					/* indent -------- */ " WHERE (title LIKE ?)", // indent
					new String[] { "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				AccountClass aRow = new AccountClass( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* title ---------- */rset.getString(2)); // indent
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
	public AccountClass getRow(Long id) {
		AccountClass aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_ACCOUNT_CLASS + " " + // indent
					/* indent -------- */ " WHERE id = " + id, null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new AccountClass( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* title --------- */rset.getString(2)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public AccountClass getRow(AccountClass aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(AccountClass newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery( // indent
						/* indent -------- */ "SELECT id, title " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_ACCOUNT_CLASS + " " + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("title", newRow.getTitle());
					db.update(DbConsts.TB_ACCOUNT_CLASS, cv, " id = ? ",
							new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					cv.put("id", newRow.getId());
					cv.put("title", newRow.getTitle());
					db.insert(DbConsts.TB_ACCOUNT_CLASS, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("title", newRow.getTitle());
				db.insert(DbConsts.TB_ACCOUNT_CLASS, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_ACCOUNT_CLASS, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(AccountClass aRow) {
		return deleteRow(aRow.getId());
	}

}
