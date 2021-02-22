package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.PasswordBook;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class PasswordBookRepoImpl implements PasswordBookRepo {

	private PdsDbHelper opener;

	public PasswordBookRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<PasswordBook> findRows() {
		List<PasswordBook> aList = new ArrayList<PasswordBook>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery("SELECT id, surl, sname, stype, myid, mypw, reg_date, fix_date, memo FROM "
					+ DbConsts.TB_PASSWORD_BOOK, null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				PasswordBook aRow = new PasswordBook( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* surl ----------- */rset.getString(2), // indent
						/* sname ---------- */rset.getString(3), // indent
						/* stype ---------- */rset.getString(4), // indent
						/* myid ----------- */rset.getString(5), // indent
						/* mypw ----------- */rset.getString(6), // indent
						/* reg_date ------- */rset.getLong(7), // indent
						/* fix_date ------- */rset.getLong(8), // indent
						/* memo ----------- */rset.getString(9)); // indent
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
			opener.debugDump(DbConsts.TB_PASSWORD_BOOK);
		}

		return aList;
	}

	@Override
	public List<PasswordBook> findRows(String keyString) {
		List<PasswordBook> aList = new ArrayList<PasswordBook>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, surl, sname, stype, myid, mypw, reg_date, fix_date, memo " + // indent
					/* indent -------- */ " FROM " + DbConsts.TB_PASSWORD_BOOK + " " + // indent
					/* indent -------- */ " WHERE (surl LIKE ?) OR " + // indent
					/* indent -------- */ "        (sname LIKE ?) OR " + // indent
					/* indent -------- */ "        (stype LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				PasswordBook aRow = new PasswordBook( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* surl ----------- */rset.getString(2), // indent
						/* sname ---------- */rset.getString(3), // indent
						/* stype ---------- */rset.getString(4), // indent
						/* myid ----------- */rset.getString(5), // indent
						/* mypw ----------- */rset.getString(6), // indent
						/* reg_date ------- */rset.getLong(7), // indent
						/* fix_date ------- */rset.getLong(8), // indent
						/* memo ----------- */rset.getString(9)); // indent
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
	public PasswordBook getRow(Long id) {
		PasswordBook aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_PASSWORD_BOOK + " WHERE id = " + id, null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new PasswordBook( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* surl ----------- */rset.getString(2), // indent
					/* sname ---------- */rset.getString(3), // indent
					/* stype ---------- */rset.getString(4), // indent
					/* myid ----------- */rset.getString(5), // indent
					/* mypw ----------- */rset.getString(6), // indent
					/* reg_date ------- */rset.getLong(7), // indent
					/* fix_date ------- */rset.getLong(8), // indent
					/* memo ----------- */rset.getString(9)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public PasswordBook getRow(PasswordBook aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(PasswordBook newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_PASSWORD_BOOK + " WHERE id = " + newRow.getId(),
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("surl", newRow.getSiteUrl());
					cv.put("sname", newRow.getSiteName());
					cv.put("stype", newRow.getSiteType());
					cv.put("myid", newRow.getMyId());
					cv.put("mypw", newRow.getMyPw());
					cv.put("reg_date", newRow.getRegDate().getTime());
					cv.put("fix_date", newRow.getFixDate().getTime());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_PASSWORD_BOOK, cv, " id = ? ",
							new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("surl", newRow.getSiteUrl());
					cv.put("sname", newRow.getSiteName());
					cv.put("stype", newRow.getSiteType());
					cv.put("myid", newRow.getMyId());
					cv.put("mypw", newRow.getMyPw());
					cv.put("reg_date", newRow.getRegDate().getTime());
					cv.put("fix_date", newRow.getFixDate().getTime());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_PASSWORD_BOOK, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("surl", newRow.getSiteUrl());
				cv.put("sname", newRow.getSiteName());
				cv.put("stype", newRow.getSiteType());
				cv.put("myid", newRow.getMyId());
				cv.put("mypw", newRow.getMyPw());
				cv.put("reg_date", newRow.getRegDate().getTime());
				cv.put("fix_date", newRow.getFixDate().getTime());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_PASSWORD_BOOK, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_PASSWORD_BOOK, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(PasswordBook aRow) {
		return deleteRow(aRow.getId());
	}

}
