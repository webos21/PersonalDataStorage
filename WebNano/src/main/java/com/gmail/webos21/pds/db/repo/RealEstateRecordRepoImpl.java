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
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REALESTATE_RECORD, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RealEstateRecord aRow = new RealEstateRecord(
                        /* id ------------- */rset.getLong(1),
                        /* realestate_id -- */rset.getLong(2),
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
            opener.debugDump(DbConsts.TB_REALESTATE_RECORD);
        }

        return aList;
    }

    @Override
    public List<RealEstateRecord> findRows(String keyString) {
        List<RealEstateRecord> aList = new ArrayList<RealEstateRecord>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_REALESTATE_RECORD + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RealEstateRecord aRow = new RealEstateRecord(
                        /* id ------------- */rset.getLong(1),
                        /* realestate_id -- */rset.getLong(2),
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
    public RealEstateRecord getRow(Long id) {
        RealEstateRecord aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REALESTATE_RECORD + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new RealEstateRecord(
                    /* id ------------- */rset.getLong(1),
                    /* realestate_id -- */rset.getLong(2),
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
    public RealEstateRecord getRow(RealEstateRecord aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(RealEstateRecord newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REALESTATE_RECORD + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("realestate_id", newRow.getRealEstateId());
                    cv.put("transaction_date", newRow.getTransactionDate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_REALESTATE_RECORD, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
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
