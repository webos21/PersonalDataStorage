package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Anniversary;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class AnniversaryRepoImpl implements AnniversaryRepo {

	private PdsDbHelper opener;

	public AnniversaryRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<Anniversary> findRows() {
		List<Anniversary> aList = new ArrayList<Anniversary>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery("SELECT id, title, apply_date, lunar, holiday FROM " + DbConsts.TB_ANNIVERSARY,
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Anniversary aRow = new Anniversary( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* title ---------- */rset.getString(2), // indent
						/* apply_date ----- */rset.getString(3), // indent
						/* lunar ---------- */rset.getInt(4), // indent
						/* holiday -------- */rset.getInt(5)); // indent
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
			opener.debugDump(DbConsts.TB_ANNIVERSARY);
		}

		return aList;
	}

	@Override
	public List<Anniversary> findRows(String keyString) {
		List<Anniversary> aList = new ArrayList<Anniversary>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title, apply_date, lunar, holiday " + // indent
					/* indent -------- */ " FROM " + DbConsts.TB_ANNIVERSARY + " " + // indent
					/* indent -------- */ " WHERE (title LIKE ?)", // indent
					new String[] { "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Anniversary aRow = new Anniversary( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* title ---------- */rset.getString(2), // indent
						/* apply_date ----- */rset.getString(3), // indent
						/* lunar ---------- */rset.getInt(4), // indent
						/* holiday -------- */rset.getInt(5)); // indent
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
	public Anniversary getRow(Long id) {
		Anniversary aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery("SELECT id, title, apply_date, lunar, holiday FROM " + DbConsts.TB_ANNIVERSARY
					+ " WHERE id = " + id, null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new Anniversary( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* title ---------- */rset.getString(2), // indent
					/* apply_date ----- */rset.getString(3), // indent
					/* lunar ---------- */rset.getInt(4), // indent
					/* holiday -------- */rset.getInt(5)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public Anniversary getRow(Anniversary aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(Anniversary newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery("SELECT id, title, apply_date, lunar, holiday FROM " + DbConsts.TB_ANNIVERSARY
						+ " WHERE id = " + newRow.getId(), null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("title", newRow.getTitle());
					cv.put("apply_date", newRow.getApplyDate());
					cv.put("lunar", newRow.getLunar());
					cv.put("holiday", newRow.getHoliday());
					db.update(DbConsts.TB_ANNIVERSARY, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("title", newRow.getTitle());
					cv.put("apply_date", newRow.getApplyDate());
					cv.put("lunar", newRow.getLunar());
					cv.put("holiday", newRow.getHoliday());
					db.insert(DbConsts.TB_ANNIVERSARY, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("title", newRow.getTitle());
				cv.put("apply_date", newRow.getApplyDate());
				cv.put("lunar", newRow.getLunar());
				cv.put("holiday", newRow.getHoliday());
				db.insert(DbConsts.TB_ANNIVERSARY, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_ANNIVERSARY, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(Anniversary aRow) {
		return deleteRow(aRow.getId());
	}

}
