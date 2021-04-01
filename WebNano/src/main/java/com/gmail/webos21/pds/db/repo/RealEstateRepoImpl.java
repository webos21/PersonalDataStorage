package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.RealEstate;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class RealEstateRepoImpl implements RealEstateRepo {

	private PdsDbHelper opener;

	public RealEstateRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<RealEstate> findRows() {
		List<RealEstate> aList = new ArrayList<RealEstate>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery(// indent
					/* indent -------- */ "SELECT id, estate_type, title, holder, estimate, loan, " + // indent
					/* indent -------- */ "       acquisition_date, estimate_date, arrange, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_REALESTATE, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				RealEstate aRow = new RealEstate(// indent
						/* id ------------- */rset.getLong(1), // indent
						/* estate_type ---- */rset.getString(2), // indent
						/* title ---------- */rset.getString(3), // indent
						/* holder --------- */rset.getString(4), // indent
						/* estimate ------- */rset.getLong(5), // indent
						/* loan ----------- */rset.getLong(6), // indent
						/* acquisition_date */rset.getLong(7), // indent
						/* estimate_date -- */rset.getLong(8), // indent
						/* arrange -------- */rset.getLong(9), // indent
						/* memo ----------- */rset.getString(10));// indent
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
			opener.debugDump(DbConsts.TB_REALESTATE);
		}

		return aList;
	}

	@Override
	public List<RealEstate> findRows(String keyString) {
		List<RealEstate> aList = new ArrayList<RealEstate>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery(// indent
					/* indent -------- */ "SELECT id, estate_type, title, holder, estimate, loan, " + // indent
					/* indent -------- */ "       acquisition_date, estimate_date, arrange, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_REALESTATE + // indent
					/* indent -------- */ " WHERE (title LIKE ?) OR " + // indent
					/* indent -------- */ "        (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				RealEstate aRow = new RealEstate(// indent
						/* id ------------- */rset.getLong(1), // indent
						/* estate_type ---- */rset.getString(2), // indent
						/* title ---------- */rset.getString(3), // indent
						/* holder --------- */rset.getString(4), // indent
						/* estimate ------- */rset.getLong(5), // indent
						/* loan ----------- */rset.getLong(6), // indent
						/* acquisition_date */rset.getLong(7), // indent
						/* estimate_date -- */rset.getLong(8), // indent
						/* arrange -------- */rset.getLong(9), // indent
						/* memo ----------- */rset.getString(10));// indent
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
	public RealEstate getRow(Long id) {
		RealEstate aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery(// indent
					/* indent -------- */ "SELECT id, estate_type, title, holder, estimate, loan, " + // indent
					/* indent -------- */ "       acquisition_date, estimate_date, arrange, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_REALESTATE + // indent
					/* indent -------- */ " WHERE id = " + id, // indent
					null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new RealEstate(// indent
					/* id ------------- */rset.getLong(1), // indent
					/* estate_type ---- */rset.getString(2), // indent
					/* title ---------- */rset.getString(3), // indent
					/* holder --------- */rset.getString(4), // indent
					/* estimate ------- */rset.getLong(5), // indent
					/* loan ----------- */rset.getLong(6), // indent
					/* acquisition_date */rset.getLong(7), // indent
					/* estimate_date -- */rset.getLong(8), // indent
					/* arrange -------- */rset.getLong(9), // indent
					/* memo ----------- */rset.getString(10));// indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public RealEstate getRow(RealEstate aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(RealEstate newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery(// indent
						/* indent -------- */ "SELECT id, estate_type, title, holder, estimate, loan, " + // indent
						/* indent -------- */ "       acquisition_date, estimate_date, arrange, memo " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_REALESTATE + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("estate_type", newRow.getEstateType());
					cv.put("title", newRow.getTitle());
					cv.put("holder", newRow.getHolder());
					cv.put("estimate", newRow.getEstimate());
					cv.put("loan", newRow.getLoan());
					cv.put("acquisition_date", newRow.getAcquisitionDate().getTime());
					cv.put("estimate_date", newRow.getEstimateDate().getTime());
					cv.put("arrange", newRow.getArrange());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_REALESTATE, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("estate_type", newRow.getEstateType());
					cv.put("title", newRow.getTitle());
					cv.put("holder", newRow.getHolder());
					cv.put("estimate", newRow.getEstimate());
					cv.put("loan", newRow.getLoan());
					cv.put("acquisition_date", newRow.getAcquisitionDate().getTime());
					cv.put("estimate_date", newRow.getEstimateDate().getTime());
					cv.put("arrange", newRow.getArrange());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_REALESTATE, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("estate_type", newRow.getEstateType());
				cv.put("title", newRow.getTitle());
				cv.put("holder", newRow.getHolder());
				cv.put("estimate", newRow.getEstimate());
				cv.put("loan", newRow.getLoan());
				cv.put("acquisition_date", newRow.getAcquisitionDate().getTime());
				cv.put("estimate_date", newRow.getEstimateDate().getTime());
				cv.put("arrange", newRow.getArrange());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_REALESTATE, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_REALESTATE, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(RealEstate aRow) {
		return deleteRow(aRow.getId());
	}

}
