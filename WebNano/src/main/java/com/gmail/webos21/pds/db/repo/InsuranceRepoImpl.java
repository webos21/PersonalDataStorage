package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Insurance;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class InsuranceRepoImpl implements InsuranceRepo {

	private PdsDbHelper opener;

	public InsuranceRepoImpl(PdsDbHelper opener) {
		this.opener = opener;
	}

	@Override
	public List<Insurance> findRows() {
		List<Insurance> aList = new ArrayList<Insurance>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, company, product, insurance_type, policy_type, " + // indent
					/* indent -------- */ "       contract_id, policy_holder, insured, pay_count_total, " + // indent
					/* indent -------- */ "       pay_count_done, premium_volume, premium_mode, arranger, " + // indent
					/* indent -------- */ "       contract_status, contract_date, maturity_date, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_INSURANCE, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Insurance aRow = new Insurance( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* company -------- */rset.getString(2), // indent
						/* product -------- */rset.getString(3), // indent
						/* insurance_type - */rset.getString(4), // indent
						/* policy_type ---- */rset.getString(5), // indent
						/* contract_id ---- */rset.getString(6), // indent
						/* policy_holder -- */rset.getString(7), // indent
						/* insured -------- */rset.getString(8), // indent
						/* pay_count_total- */rset.getInt(9), // indent
						/* pay_count_done - */rset.getInt(10), // indent
						/* premium_volume - */rset.getLong(11), // indent
						/* premium_mode --- */rset.getString(12), // indent
						/* arranger ------- */rset.getString(13), // indent
						/* contract_status- */rset.getInt(14), // indent
						/* contract_date -- */rset.getLong(15), // indent
						/* maturity_date -- */rset.getLong(16), // indent
						/* memo ----------- */rset.getString(17)); // indent
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
			opener.debugDump(DbConsts.TB_INSURANCE);
		}

		return aList;
	}

	@Override
	public List<Insurance> findRows(String keyString) {
		List<Insurance> aList = new ArrayList<Insurance>();

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, company, product, insurance_type, policy_type, " + // indent
					/* indent -------- */ "       contract_id, policy_holder, insured, pay_count_total, " + // indent
					/* indent -------- */ "       pay_count_done, premium_volume, premium_mode, arranger, " + // indent
					/* indent -------- */ "       contract_status, contract_date, maturity_date, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_INSURANCE + // indent
					/* indent -------- */ " WHERE (company LIKE ?) OR " + // indent
					/* indent -------- */ "       (product LIKE ?) OR " + // indent
					/* indent -------- */ "          (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				Insurance aRow = new Insurance( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* company -------- */rset.getString(2), // indent
						/* product -------- */rset.getString(3), // indent
						/* insurance_type - */rset.getString(4), // indent
						/* policy_type ---- */rset.getString(5), // indent
						/* contract_id ---- */rset.getString(6), // indent
						/* policy_holder -- */rset.getString(7), // indent
						/* insured -------- */rset.getString(8), // indent
						/* pay_count_total- */rset.getInt(9), // indent
						/* pay_count_done - */rset.getInt(10), // indent
						/* premium_volume - */rset.getLong(11), // indent
						/* premium_mode --- */rset.getString(12), // indent
						/* arranger ------- */rset.getString(13), // indent
						/* contract_status- */rset.getInt(14), // indent
						/* contract_date -- */rset.getLong(15), // indent
						/* maturity_date -- */rset.getLong(16), // indent
						/* memo ----------- */rset.getString(17)); // indent
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
	public Insurance getRow(Long id) {
		Insurance aRow = null;

		try {
			H2Database db = opener.getReadableDatabase();
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, company, product, insurance_type, policy_type, " + // indent
					/* indent -------- */ "       contract_id, policy_holder, insured, pay_count_total, " + // indent
					/* indent -------- */ "       pay_count_done, premium_volume, premium_mode, arranger, " + // indent
					/* indent -------- */ "       contract_status, contract_date, maturity_date, memo " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_INSURANCE + // indent
					/* indent -------- */ " WHERE id = " + id, // indent
					null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new Insurance( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* company -------- */rset.getString(2), // indent
					/* product -------- */rset.getString(3), // indent
					/* insurance_type - */rset.getString(4), // indent
					/* policy_type ---- */rset.getString(5), // indent
					/* contract_id ---- */rset.getString(6), // indent
					/* policy_holder -- */rset.getString(7), // indent
					/* insured -------- */rset.getString(8), // indent
					/* pay_count_total- */rset.getInt(9), // indent
					/* pay_count_done - */rset.getInt(10), // indent
					/* premium_volume - */rset.getLong(11), // indent
					/* premium_mode --- */rset.getString(12), // indent
					/* arranger ------- */rset.getString(13), // indent
					/* contract_status- */rset.getInt(14), // indent
					/* contract_date -- */rset.getLong(15), // indent
					/* maturity_date -- */rset.getLong(16), // indent
					/* memo ----------- */rset.getString(17)); // indent
			rset.close();
			db.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return aRow;
	}

	@Override
	public Insurance getRow(Insurance aRow) {
		return getRow(aRow.getId());
	}

	@Override
	public boolean updateRow(Insurance newRow) {
		try {
			H2Database db = opener.getWritableDatabase();
			ResultSet rset = null;

			if (newRow.getId() != null) {
				rset = db.rawQuery( // indent
						/* indent -------- */ "SELECT id, company, product, insurance_type, policy_type, " + // indent
						/* indent -------- */ "       contract_id, policy_holder, insured, pay_count_total, " + // indent
						/* indent -------- */ "       pay_count_done, premium_volume, premium_mode, arranger, " + // indent
						/* indent -------- */ "       contract_status, contract_date, maturity_date, memo " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_INSURANCE + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
				if (rset != null && rset.first()) {
					rset.close();

					ContentValues cv = new ContentValues();
					cv.put("company", newRow.getCompany());
					cv.put("product", newRow.getProduct());
					cv.put("insurance_type", newRow.getInsuranceType());
					cv.put("policy_type", newRow.getPolicyType());
					cv.put("contract_id", newRow.getContractId());
					cv.put("policy_holder", newRow.getPolicyHolder());
					cv.put("insured", newRow.getInsured());
					cv.put("pay_count_total", newRow.getPayCountTotal());
					cv.put("pay_count_done", newRow.getPayCountTotal());
					cv.put("premium_volume", newRow.getPremiumVolume());
					cv.put("premium_mode", newRow.getPremiumMode());
					cv.put("arranger", newRow.getArranger());
					cv.put("contract_status", newRow.getContractStatus());
					cv.put("contract_date", newRow.getContractDate().getTime());
					cv.put("maturity_date", newRow.getMaturityDate().getTime());
					cv.put("memo", newRow.getMemo());
					db.update(DbConsts.TB_INSURANCE, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
				} else {
					ContentValues cv = new ContentValues();
					// cv.put("id", newRow.getId());
					cv.put("company", newRow.getCompany());
					cv.put("product", newRow.getProduct());
					cv.put("insurance_type", newRow.getInsuranceType());
					cv.put("policy_type", newRow.getPolicyType());
					cv.put("contract_id", newRow.getContractId());
					cv.put("policy_holder", newRow.getPolicyHolder());
					cv.put("insured", newRow.getInsured());
					cv.put("pay_count_total", newRow.getPayCountTotal());
					cv.put("pay_count_done", newRow.getPayCountTotal());
					cv.put("premium_volume", newRow.getPremiumVolume());
					cv.put("premium_mode", newRow.getPremiumMode());
					cv.put("arranger", newRow.getArranger());
					cv.put("contract_status", newRow.getContractStatus());
					cv.put("contract_date", newRow.getContractDate().getTime());
					cv.put("maturity_date", newRow.getMaturityDate().getTime());
					cv.put("memo", newRow.getMemo());
					db.insert(DbConsts.TB_INSURANCE, null, cv);
				}
			} else {
				ContentValues cv = new ContentValues();
				cv.put("company", newRow.getCompany());
				cv.put("product", newRow.getProduct());
				cv.put("insurance_type", newRow.getInsuranceType());
				cv.put("policy_type", newRow.getPolicyType());
				cv.put("contract_id", newRow.getContractId());
				cv.put("policy_holder", newRow.getPolicyHolder());
				cv.put("insured", newRow.getInsured());
				cv.put("pay_count_total", newRow.getPayCountTotal());
				cv.put("pay_count_done", newRow.getPayCountTotal());
				cv.put("premium_volume", newRow.getPremiumVolume());
				cv.put("premium_mode", newRow.getPremiumMode());
				cv.put("arranger", newRow.getArranger());
				cv.put("contract_status", newRow.getContractStatus());
				cv.put("contract_date", newRow.getContractDate().getTime());
				cv.put("maturity_date", newRow.getMaturityDate().getTime());
				cv.put("memo", newRow.getMemo());
				db.insert(DbConsts.TB_INSURANCE, null, cv);
			}

			db.close();
		} catch (Exception e) {

		}

		return true;
	}

	@Override
	public int deleteRow(Long id) {
		H2Database db = opener.getWritableDatabase();
		int result = db.delete(DbConsts.TB_INSURANCE, "id = " + id, null);
		db.close();

		return result;
	}

	@Override
	public int deleteRow(Insurance aRow) {
		return deleteRow(aRow.getId());
	}

}
