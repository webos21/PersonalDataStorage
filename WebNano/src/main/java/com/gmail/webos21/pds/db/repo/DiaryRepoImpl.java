package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Diary;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class DiaryRepoImpl implements DiaryRepo {

	private PdsDbHelper opener;

	public DiaryRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<Diary> findRows() {
		List<Diary> aList = new ArrayList<Diary>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery("SELECT id, wdate, weather, title, content FROM " + DbConsts.TB_DIARY, null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Diary aRow = new Diary( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* wdate ---------- */rset.getLong(2), // indent
						/* weather -------- */rset.getInt(3), // indent
						/* title ---------- */rset.getString(4), // indent
						/* content -------- */rset.getString(5)); // indent
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
			opener.debugDump(DbConsts.TB_DIARY);
		}

		return aList;
	}

	@Override
	public List<Diary> findRows(String keyString) {
		List<Diary> aList = new ArrayList<Diary>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, wdate, weather, title, content " + // indent
					/* indent -------- */ " FROM " + DbConsts.TB_DIARY + " " + // indent
					/* indent -------- */ " WHERE (title LIKE ?) OR " + // indent
					/* indent -------- */ "        (content LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Diary aRow = new Diary( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* wdate ---------- */rset.getLong(2), // indent
						/* weather -------- */rset.getInt(3), // indent
						/* title ---------- */rset.getString(4), // indent
						/* content -------- */rset.getString(5)); // indent
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
	public Diary getRow(Long id) {
		Diary aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery(
					"SELECT id, wdate, weather, title, content FROM " + DbConsts.TB_DIARY + " WHERE id = " + id, null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new Diary( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* wdate ---------- */rset.getLong(2), // indent
					/* weather -------- */rset.getInt(3), // indent
					/* title ---------- */rset.getString(4), // indent
					/* content -------- */rset.getString(5)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public Diary getRow(Diary aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(Diary newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery("SELECT id, wdate, weather, title, content FROM " + DbConsts.TB_DIARY
						+ " WHERE id = " + newRow.getId(), null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("wdate", newRow.getWdate().getTime());
					cv.put("weather", newRow.getWeather());
					cv.put("title", newRow.getTitle());
					cv.put("content", newRow.getContent());
					db.update(DbConsts.TB_DIARY, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("wdate", newRow.getWdate().getTime());
					cv.put("weather", newRow.getWeather());
					cv.put("title", newRow.getTitle());
					cv.put("content", newRow.getContent());
					db.insert(DbConsts.TB_DIARY, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("wdate", newRow.getWdate().getTime());
				cv.put("weather", newRow.getWeather());
				cv.put("title", newRow.getTitle());
				cv.put("content", newRow.getContent());
				db.insert(DbConsts.TB_DIARY, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_DIARY, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(Diary aRow) {
		return deleteRow(aRow.getId());
	}

}
