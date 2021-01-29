package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.InsuranceRecord;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class InsuranceRecordRepoImpl implements InsuranceRecordRepo {

    private PdsDbHelper opener;

    public InsuranceRecordRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<InsuranceRecord> findRows() {
        List<InsuranceRecord> aList = new ArrayList<InsuranceRecord>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_INSURANCE_RECORD, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                InsuranceRecord aRow = new InsuranceRecord(
                        /* id ------------- */rset.getLong(1),
                        /* insurance_id --- */rset.getLong(2),
                        /* transaction_date */rset.getLong(3),
                        /* title ---------- */rset.getString(4),
                        /* deposit -------- */rset.getLong(5),
                        /* withdrawal ----- */rset.getLong(6),
                        /* memo ----------- */rset.getString(7));
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
            opener.debugDump(DbConsts.TB_INSURANCE_RECORD);
        }

        return aList;
    }

    @Override
    public List<InsuranceRecord> findRows(String keyString) {
        List<InsuranceRecord> aList = new ArrayList<InsuranceRecord>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_INSURANCE_RECORD + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                InsuranceRecord aRow = new InsuranceRecord(
                        /* id ------------- */rset.getLong(1),
                        /* insurance_id --- */rset.getLong(2),
                        /* transaction_date */rset.getLong(3),
                        /* title ---------- */rset.getString(4),
                        /* deposit -------- */rset.getLong(5),
                        /* withdrawal ----- */rset.getLong(6),
                        /* memo ----------- */rset.getString(7));
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
    public InsuranceRecord getRow(Long id) {
        InsuranceRecord aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_INSURANCE_RECORD + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new InsuranceRecord(
                    /* id ------------- */rset.getLong(1),
                    /* insurance_id --- */rset.getLong(2),
                    /* transaction_date */rset.getLong(3),
                    /* title ---------- */rset.getString(4),
                    /* deposit -------- */rset.getLong(5),
                    /* withdrawal ----- */rset.getLong(6),
                    /* memo ----------- */rset.getString(7));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public InsuranceRecord getRow(InsuranceRecord aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(InsuranceRecord newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_INSURANCE_RECORD + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("insurance_id", newRow.getInsuranceId());
                    cv.put("transaction_date", newRow.getTransactionDate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_INSURANCE_RECORD, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("insurance_id", newRow.getInsuranceId());
                    cv.put("transaction_date", newRow.getTransactionDate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_INSURANCE_RECORD, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("insurance_id", newRow.getInsuranceId());
                cv.put("transaction_date", newRow.getTransactionDate().getTime());
                cv.put("title", newRow.getTitle());
                cv.put("deposit", newRow.getDeposit());
                cv.put("withdrawal", newRow.getWithdrawal());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_INSURANCE_RECORD, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_INSURANCE_RECORD, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(InsuranceRecord aRow) {
        return deleteRow(aRow.getId());
    }

}
