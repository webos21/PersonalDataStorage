package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.RealEstateRecord;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class RealEstateRecordRepoImpl implements RealEstateRecordRepo {

	private PdsDbHelper opener;

	public RealEstateRecordRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<RealEstateRecord> findRows() {
		List<RealEstateRecord> aList = new ArrayList<RealEstateRecord>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery(// indent
					/* indent -------- */"SELECT id, realestate_id, transaction_date, " + // indent
					/* indent -------- */"       title, deposit, withdrawal, memo " + // indent
					/* indent -------- */"  FROM " + DbConsts.TB_REALESTATE_RECORD, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				RealEstateRecord aRow = new RealEstateRecord( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* realestate_id -- */rset.getLong(2), // indent
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

		if (DbConsts.DB_DEBUG) {
			opener.debugDump(DbConsts.TB_REALESTATE_RECORD);
		}

		return aList;
	}

	@Override
	public List<RealEstateRecord> findRows(String keyString) {
		List<RealEstateRecord> aList = new ArrayList<RealEstateRecord>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, realestate_id, transaction_date, " + // indent
					/* indent -------- */ "       title, deposit, withdrawal, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_REALESTATE_RECORD + // indent
					/* indent -------- */ " WHERE (title LIKE ?) OR " + // indent
					/* indent -------- */ "        (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				RealEstateRecord aRow = new RealEstateRecord(// indent
						/* id ------------- */rset.getLong(1), // indent
						/* realestate_id -- */rset.getLong(2), // indent
						/* transaction_date */rset.getLong(3), // indent
						/* title ---------- */rset.getString(4), // indent
						/* deposit -------- */rset.getLong(5), // indent
						/* withdrawal ----- */rset.getLong(6), // indent
						/* memo ----------- */rset.getString(7));// indent
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
	public RealEstateRecord getRow(Long id) {
		RealEstateRecord aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery(// indent
					/* indent -------- */ "SELECT id, realestate_id, transaction_date, " + // indent
					/* indent -------- */ "       title, deposit, withdrawal, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_REALESTATE_RECORD + // indent
					/* indent -------- */ " WHERE id = " + id, // indent
					null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new RealEstateRecord(// indent
					/* id ------------- */rset.getLong(1), // indent
					/* realestate_id -- */rset.getLong(2), // indent
					/* transaction_date */rset.getLong(3), // indent
					/* title ---------- */rset.getString(4), // indent
					/* deposit -------- */rset.getLong(5), // indent
					/* withdrawal ----- */rset.getLong(6), // indent
					/* memo ----------- */rset.getString(7));// indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public RealEstateRecord getRow(RealEstateRecord aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(RealEstateRecord newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery(// indent
						/* indent -------- */ "SELECT id, realestate_id, transaction_date, " + // indent
						/* indent -------- */ "       title, deposit, withdrawal, memo " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_REALESTATE_RECORD + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("realestate_id", newRow.getRealEstateId());
					cv.put("transaction_date", newRow.getTransactionDate().getTime());
					cv.put("title", newRow.getTitle());
					cv.put("deposit", newRow.getDeposit());
					cv.put("withdrawal", newRow.getWithdrawal());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_REALESTATE_RECORD, cv, " id = ? ",
							new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("realestate_id", newRow.getRealEstateId());
					cv.put("transaction_date", newRow.getTransactionDate().getTime());
					cv.put("title", newRow.getTitle());
					cv.put("deposit", newRow.getDeposit());
					cv.put("withdrawal", newRow.getWithdrawal());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_REALESTATE_RECORD, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("realestate_id", newRow.getRealEstateId());
				cv.put("transaction_date", newRow.getTransactionDate().getTime());
				cv.put("title", newRow.getTitle());
				cv.put("deposit", newRow.getDeposit());
				cv.put("withdrawal", newRow.getWithdrawal());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_REALESTATE_RECORD, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_REALESTATE_RECORD, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(RealEstateRecord aRow) {
		return deleteRow(aRow.getId());
	}

}
