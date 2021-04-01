package com.gmail.webos21.pds.db.repo;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Record;
import com.gmail.webos21.pds.db.h2.H2Database;

public class RecordRepoImpl implements RecordRepo {

	private PdsDbHelper opener;

	public RecordRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<Record> findRows() {
		List<Record> aList = new ArrayList<Record>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, wdate, title, deposit, withdrawal, " + // indent
					/* indent -------- */ "       account_code, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_RECORD, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Record aRow = new Record( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* wdate ---------- */rset.getLong(2), // indent
						/* title ---------- */rset.getString(3), // indent
						/* deposit -------- */rset.getLong(4), // indent
						/* withdrawal ----- */rset.getLong(5), // indent
						/* account_code --- */rset.getString(6), // indent
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

		if (DbConsts.DB_DEBUG) {
			opener.debugDump(DbConsts.TB_RECORD);
		}

		return aList;
	}

	@Override
	public List<Record> findRows(String keyString) {
		List<Record> aList = new ArrayList<Record>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, wdate, title, deposit, withdrawal, " + // indent
					/* indent -------- */ "       account_code, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_RECORD + // indent
					/* indent -------- */ " WHERE (title LIKE ?) OR " + // indent
					/* indent -------- */ "        (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Record aRow = new Record( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* wdate ---------- */rset.getLong(2), // indent
						/* title ---------- */rset.getString(3), // indent
						/* deposit -------- */rset.getLong(4), // indent
						/* withdrawal ----- */rset.getLong(5), // indent
						/* account_code --- */rset.getString(6), // indent
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
	public List<Record> findRows(int year, int month) {
		List<Record> aList = new ArrayList<Record>();

		try {
			Date sdate = DbConsts.SDF_DATE.parse(String.format("%04d-%02d-%02d", year, month, 1));
			Date edate = DbConsts.SDF_DATE.parse(String.format("%04d-%02d-%02d", year, (month + 1), 1));

			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, wdate, title, deposit, withdrawal, " + // indent
					/* indent -------- */ "       account_code, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_RECORD + // indent
					/* indent -------- */ " WHERE wdate >= ? AND wdate < ?", // indent
					new String[] { Long.toString(sdate.getTime()), Long.toString(edate.getTime()) });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Record aRow = new Record( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* wdate ---------- */rset.getLong(2), // indent
						/* title ---------- */rset.getString(3), // indent
						/* deposit -------- */rset.getLong(4), // indent
						/* withdrawal ----- */rset.getLong(5), // indent
						/* account_code --- */rset.getString(6), // indent
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
	public Record getRow(Long id) {
		Record aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, wdate, title, deposit, withdrawal, " + // indent
					/* indent -------- */ "       account_code, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_RECORD + // indent
					/* indent -------- */ " WHERE id = " + id, // indent
					null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new Record( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* wdate ---------- */rset.getLong(2), // indent
					/* title ---------- */rset.getString(3), // indent
					/* deposit -------- */rset.getLong(4), // indent
					/* withdrawal ----- */rset.getLong(5), // indent
					/* account_code --- */rset.getString(6), // indent
					/* memo ----------- */rset.getString(7)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public Record getRow(Record aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(Record newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery( // indent
						/* indent -------- */ "SELECT id, wdate, title, deposit, withdrawal, " + // indent
						/* indent -------- */ "       account_code, memo " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_RECORD + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("wdate", newRow.getWdate().getTime());
					cv.put("title", newRow.getTitle());
					cv.put("deposit", newRow.getDeposit());
					cv.put("withdrawal", newRow.getWithdrawal());
					cv.put("account_code", newRow.getAccountCode());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_RECORD, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("wdate", newRow.getWdate().getTime());
					cv.put("title", newRow.getTitle());
					cv.put("deposit", newRow.getDeposit());
					cv.put("withdrawal", newRow.getWithdrawal());
					cv.put("account_code", newRow.getAccountCode());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_RECORD, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("wdate", newRow.getWdate().getTime());
				cv.put("title", newRow.getTitle());
				cv.put("deposit", newRow.getDeposit());
				cv.put("withdrawal", newRow.getWithdrawal());
				cv.put("account_code", newRow.getAccountCode());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_RECORD, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_RECORD, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(Record aRow) {
		return deleteRow(aRow.getId());
	}

}
