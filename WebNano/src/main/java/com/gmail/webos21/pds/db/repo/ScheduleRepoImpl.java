package com.gmail.webos21.pds.db.repo;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Schedule;
import com.gmail.webos21.pds.db.h2.H2Database;

public class ScheduleRepoImpl implements ScheduleRepo {

	private PdsDbHelper opener;

	public ScheduleRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<Schedule> findRows() {
		List<Schedule> aList = new ArrayList<Schedule>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title, pdate, readok, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_SCHEDULE, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Schedule aRow = new Schedule( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* title ---------- */rset.getString(2), // indent
						/* pdate ---------- */rset.getLong(3), // indent
						/* readok --------- */rset.getInt(4), // indent
						/* memo ----------- */rset.getString(5)); // indent
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
			opener.debugDump(DbConsts.TB_SCHEDULE);
		}

		return aList;
	}

	@Override
	public List<Schedule> findRows(String keyString) {
		List<Schedule> aList = new ArrayList<Schedule>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title, pdate, readok, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_SCHEDULE + // indent
					/* indent -------- */ " WHERE (title LIKE ?) OR " + // indent
					/* indent -------- */ "        (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Schedule aRow = new Schedule( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* title ---------- */rset.getString(2), // indent
						/* pdate ---------- */rset.getLong(3), // indent
						/* readok --------- */rset.getInt(4), // indent
						/* memo ----------- */rset.getString(5)); // indent
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
	public List<Schedule> findRows(int year, int month) {
		List<Schedule> aList = new ArrayList<Schedule>();

		try {
			Date sdate = DbConsts.SDF_DATE.parse(String.format("%04d-%02d-%02d", year, month, 1));
			Date edate = DbConsts.SDF_DATE.parse(String.format("%04d-%02d-%02d", year, (month + 1), 1));

			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title, pdate, readok, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_SCHEDULE + // indent
					/* indent -------- */ " WHERE pdate >= ? AND pdate < ?", // indent
					new String[] { Long.toString(sdate.getTime()), Long.toString(edate.getTime()) });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Schedule aRow = new Schedule( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* title ---------- */rset.getString(2), // indent
						/* pdate ---------- */rset.getLong(3), // indent
						/* readok --------- */rset.getInt(4), // indent
						/* memo ----------- */rset.getString(5)); // indent
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
	public Schedule getRow(Long id) {
		Schedule aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, title, pdate, readok, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_SCHEDULE + // indent
					/* indent -------- */ " WHERE id = " + id, // indent
					null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new Schedule( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* title ---------- */rset.getString(2), // indent
					/* pdate ---------- */rset.getLong(3), // indent
					/* readok --------- */rset.getInt(4), // indent
					/* memo ----------- */rset.getString(5)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public Schedule getRow(Schedule aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(Schedule newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery( // indent
						/* indent -------- */ "SELECT id, title, pdate, readok, memo " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_SCHEDULE + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("title", newRow.getTitle());
					cv.put("pdate", newRow.getPdate().getTime());
					cv.put("readok", newRow.getReadOk());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_SCHEDULE, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("title", newRow.getTitle());
					cv.put("pdate", newRow.getPdate().getTime());
					cv.put("readok", newRow.getReadOk());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_SCHEDULE, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("title", newRow.getTitle());
				cv.put("pdate", newRow.getPdate().getTime());
				cv.put("readok", newRow.getReadOk());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_SCHEDULE, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_SCHEDULE, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(Schedule aRow) {
		return deleteRow(aRow.getId());
	}

}
