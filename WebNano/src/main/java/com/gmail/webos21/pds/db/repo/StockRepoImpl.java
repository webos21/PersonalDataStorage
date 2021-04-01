package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Stock;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class StockRepoImpl implements StockRepo {

	private PdsDbHelper opener;

	public StockRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<Stock> findRows() {
		List<Stock> aList = new ArrayList<Stock>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, company, account_name, account_number, holder, " + // indent
					/* indent -------- */ "       deposit, estimate, estimate_date, arrange, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_STOCK, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Stock aRow = new Stock( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* company -------- */rset.getString(2), // indent
						/* account_name --- */rset.getString(3), // indent
						/* account_number - */rset.getString(4), // indent
						/* holder --------- */rset.getString(5), // indent
						/* deposit -------- */rset.getLong(6), // indent
						/* estimate ------- */rset.getLong(7), // indent
						/* estimate_date -- */rset.getLong(8), // indent
						/* arrange -------- */rset.getLong(9), // indent
						/* memo ----------- */rset.getString(10)); // indent
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
			opener.debugDump(DbConsts.TB_STOCK);
		}

		return aList;
	}

	@Override
	public List<Stock> findRows(String keyString) {
		List<Stock> aList = new ArrayList<Stock>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, company, account_name, account_number, holder, " + // indent
					/* indent -------- */ "       deposit, estimate, estimate_date, arrange, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_STOCK + // indent
					/* indent -------- */ " WHERE (company LIKE ?) OR " + // indent
					/* indent -------- */ "       (account_name LIKE ?) OR " + // indent
					/* indent -------- */ "       (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Stock aRow = new Stock( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* company -------- */rset.getString(2), // indent
						/* account_name --- */rset.getString(3), // indent
						/* account_number - */rset.getString(4), // indent
						/* holder --------- */rset.getString(5), // indent
						/* deposit -------- */rset.getLong(6), // indent
						/* estimate ------- */rset.getLong(7), // indent
						/* estimate_date -- */rset.getLong(8), // indent
						/* arrange -------- */rset.getLong(9), // indent
						/* memo ----------- */rset.getString(10)); // indent
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
	public Stock getRow(Long id) {
		Stock aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, company, account_name, account_number, holder, " + // indent
					/* indent -------- */ "       deposit, estimate, estimate_date, arrange, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_STOCK + // indent
					/* indent -------- */ " WHERE id = " + id, // indent
					null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new Stock( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* company -------- */rset.getString(2), // indent
					/* account_name --- */rset.getString(3), // indent
					/* account_number - */rset.getString(4), // indent
					/* holder --------- */rset.getString(5), // indent
					/* deposit -------- */rset.getLong(6), // indent
					/* estimate ------- */rset.getLong(7), // indent
					/* estimate_date -- */rset.getLong(8), // indent
					/* arrange -------- */rset.getLong(9), // indent
					/* memo ----------- */rset.getString(10)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public Stock getRow(Stock aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(Stock newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery( // indent
						/* indent -------- */ "SELECT id, company, account_name, account_number, holder, " + // indent
						/* indent -------- */ "       deposit, estimate, estimate_date, arrange, memo " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_STOCK + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("company", newRow.getCompany());
					cv.put("account_name", newRow.getAccountName());
					cv.put("account_number", newRow.getAccountNumber());
					cv.put("holder", newRow.getHolder());
					cv.put("deposit", newRow.getDeposit());
					cv.put("estimate", newRow.getEstimate());
					cv.put("estimate_date", newRow.getEstimateDate().getTime());
					cv.put("arrange", newRow.getArrange());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_STOCK, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("company", newRow.getCompany());
					cv.put("account_name", newRow.getAccountName());
					cv.put("account_number", newRow.getAccountNumber());
					cv.put("holder", newRow.getHolder());
					cv.put("deposit", newRow.getDeposit());
					cv.put("estimate", newRow.getEstimate());
					cv.put("estimate_date", newRow.getEstimateDate().getTime());
					cv.put("arrange", newRow.getArrange());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_STOCK, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("company", newRow.getCompany());
				cv.put("account_name", newRow.getAccountName());
				cv.put("account_number", newRow.getAccountNumber());
				cv.put("holder", newRow.getHolder());
				cv.put("deposit", newRow.getDeposit());
				cv.put("estimate", newRow.getEstimate());
				cv.put("estimate_date", newRow.getEstimateDate().getTime());
				cv.put("arrange", newRow.getArrange());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_STOCK, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_STOCK, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(Stock aRow) {
		return deleteRow(aRow.getId());
	}

}
