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
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_INSURANCE, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Insurance aRow = new Insurance(
                        /* id ------------- */rset.getLong(1),
                        /* company -------- */rset.getString(2),
                        /* product -------- */rset.getString(3),
                        /* insurance_type - */rset.getString(4),
                        /* policy_type ---- */rset.getString(5),
                        /* contract_id ---- */rset.getString(6),
                        /* policy_holder -- */rset.getString(7),
                        /* insured -------- */rset.getString(8),
                        /* pay_count_total- */rset.getInt(9),
                        /* pay_count_done - */rset.getInt(10),
                        /* premium_volume - */rset.getLong(11),
                        /* premium_mode --- */rset.getString(12),
                        /* arranger ------- */rset.getString(13),
                        /* contract_status- */rset.getInt(14),
                        /* contract_date -- */rset.getLong(15),
                        /* maturity_date -- */rset.getLong(16),
                        /* memo ----------- */rset.getString(17));
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
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_INSURANCE + " " +
                            /* intent -------- */ " WHERE (company LIKE ?) OR " +
                            /* intent -------- */ "       (product LIKE ?) OR " +
                            /* intent -------- */ "          (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Insurance aRow = new Insurance(
                        /* id ------------- */rset.getLong(1),
                        /* company -------- */rset.getString(2),
                        /* product -------- */rset.getString(3),
                        /* insurance_type - */rset.getString(4),
                        /* policy_type ---- */rset.getString(5),
                        /* contract_id ---- */rset.getString(6),
                        /* policy_holder -- */rset.getString(7),
                        /* insured -------- */rset.getString(8),
                        /* pay_count_total- */rset.getInt(9),
                        /* pay_count_done - */rset.getInt(10),
                        /* premium_volume - */rset.getLong(11),
                        /* premium_mode --- */rset.getString(12),
                        /* arranger ------- */rset.getString(13),
                        /* contract_status- */rset.getInt(14),
                        /* contract_date -- */rset.getLong(15),
                        /* maturity_date -- */rset.getLong(16),
                        /* memo ----------- */rset.getString(17));
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
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_INSURANCE + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Insurance(
                    /* id ------------- */rset.getLong(1),
                    /* company -------- */rset.getString(2),
                    /* product -------- */rset.getString(3),
                    /* insurance_type - */rset.getString(4),
                    /* policy_type ---- */rset.getString(5),
                    /* contract_id ---- */rset.getString(6),
                    /* policy_holder -- */rset.getString(7),
                    /* insured -------- */rset.getString(8),
                    /* pay_count_total- */rset.getInt(9),
                    /* pay_count_done - */rset.getInt(10),
                    /* premium_volume - */rset.getLong(11),
                    /* premium_mode --- */rset.getString(12),
                    /* arranger ------- */rset.getString(13),
                    /* contract_status- */rset.getInt(14),
                    /* contract_date -- */rset.getLong(15),
                    /* maturity_date -- */rset.getLong(16),
                    /* memo ----------- */rset.getString(17));
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
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_INSURANCE + " WHERE id = " + newRow.getId(), null);
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
                    db.update(DbConsts.TB_INSURANCE, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
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
