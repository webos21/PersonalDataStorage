package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.RegularRecord;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class RegularRecordRepoImpl implements RegularRecordRepo {

    private PdsDbHelper opener;

    public RegularRecordRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<RegularRecord> findRows() {
        List<RegularRecord> aList = new ArrayList<RegularRecord>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REGULAR_RECORD, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RegularRecord aRow = new RegularRecord(
                        /* id ------------- */rset.getLong(1),
                        /* regular_pay_id - */rset.getLong(2),
                        /* wdate ---------- */rset.getLong(3),
                        /* title ---------- */rset.getString(4),
                        /* deposit -------- */rset.getLong(5),
                        /* withdrawal ----- */rset.getLong(6),
                        /* account_code --- */rset.getString(7),
                        /* memo ----------- */rset.getString(8));
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
            opener.debugDump(DbConsts.TB_REGULAR_RECORD);
        }

        return aList;
    }

    @Override
    public List<RegularRecord> findRows(String keyString) {
        List<RegularRecord> aList = new ArrayList<RegularRecord>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_REGULAR_RECORD + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RegularRecord aRow = new RegularRecord(
                        /* id ------------- */rset.getLong(1),
                        /* regular_pay_id - */rset.getLong(2),
                        /* wdate ---------- */rset.getLong(3),
                        /* title ---------- */rset.getString(4),
                        /* deposit -------- */rset.getLong(5),
                        /* withdrawal ----- */rset.getLong(6),
                        /* account_code --- */rset.getString(7),
                        /* memo ----------- */rset.getString(8));
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
    public RegularRecord getRow(Long id) {
        RegularRecord aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REGULAR_RECORD + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new RegularRecord(
                    /* id ------------- */rset.getLong(1),
                    /* regular_pay_id - */rset.getLong(2),
                    /* wdate ---------- */rset.getLong(3),
                    /* title ---------- */rset.getString(4),
                    /* deposit -------- */rset.getLong(5),
                    /* withdrawal ----- */rset.getLong(6),
                    /* account_code --- */rset.getString(7),
                    /* memo ----------- */rset.getString(8));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public RegularRecord getRow(RegularRecord aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(RegularRecord newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REGULAR_RECORD + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("regular_pay_id", newRow.getRegularPayId());
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_REGULAR_RECORD, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("regular_pay_id", newRow.getRegularPayId());
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_REGULAR_RECORD, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("regular_pay_id", newRow.getRegularPayId());
                cv.put("wdate", newRow.getWdate().getTime());
                cv.put("title", newRow.getTitle());
                cv.put("deposit", newRow.getDeposit());
                cv.put("withdrawal", newRow.getWithdrawal());
                cv.put("account_code", newRow.getAccountCode());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_REGULAR_RECORD, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_REGULAR_RECORD, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(RegularRecord aRow) {
        return deleteRow(aRow.getId());
    }

}
