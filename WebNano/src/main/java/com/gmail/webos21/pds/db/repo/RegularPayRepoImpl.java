package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.RegularPay;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class RegularPayRepoImpl implements RegularPayRepo {

    private PdsDbHelper opener;

    public RegularPayRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<RegularPay> findRows() {
        List<RegularPay> aList = new ArrayList<RegularPay>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REGULAR_PAY, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RegularPay aRow = new RegularPay(
                        /* id ------------- */rset.getLong(1),
                        /* wdate ---------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3),
                        /* deposit -------- */rset.getLong(4),
                        /* withdrawal ----- */rset.getLong(5),
                        /* account_code --- */rset.getString(6),
                        /* month_day ------ */rset.getInt(7),
                        /* sdate ---------- */rset.getLong(8),
                        /* edate ---------- */rset.getLong(9),
                        /* memo ----------- */rset.getString(10));
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
            opener.debugDump(DbConsts.TB_REGULAR_PAY);
        }

        return aList;
    }

    @Override
    public List<RegularPay> findRows(String keyString) {
        List<RegularPay> aList = new ArrayList<RegularPay>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_REGULAR_PAY + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RegularPay aRow = new RegularPay(
                        /* id ------------- */rset.getLong(1),
                        /* wdate ---------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3),
                        /* deposit -------- */rset.getLong(4),
                        /* withdrawal ----- */rset.getLong(5),
                        /* account_code --- */rset.getString(6),
                        /* month_day ------ */rset.getInt(7),
                        /* sdate ---------- */rset.getLong(8),
                        /* edate ---------- */rset.getLong(9),
                        /* memo ----------- */rset.getString(10));
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
    public RegularPay getRow(Long id) {
        RegularPay aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REGULAR_PAY + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new RegularPay(
                    /* id ------------- */rset.getLong(1),
                    /* wdate ---------- */rset.getLong(2),
                    /* title ---------- */rset.getString(3),
                    /* deposit -------- */rset.getLong(4),
                    /* withdrawal ----- */rset.getLong(5),
                    /* account_code --- */rset.getString(6),
                    /* month_day ------ */rset.getInt(7),
                    /* sdate ---------- */rset.getLong(8),
                    /* edate ---------- */rset.getLong(9),
                    /* memo ----------- */rset.getString(10));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public RegularPay getRow(RegularPay aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(RegularPay newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REGULAR_PAY + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("month_day", newRow.getMonthDay());
                    cv.put("sdate", newRow.getSdate().getTime());
                    cv.put("edate", newRow.getEdate().getTime());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_REGULAR_PAY, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("month_day", newRow.getMonthDay());
                    cv.put("sdate", newRow.getSdate().getTime());
                    cv.put("edate", newRow.getEdate().getTime());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_REGULAR_PAY, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("wdate", newRow.getWdate().getTime());
                cv.put("title", newRow.getTitle());
                cv.put("deposit", newRow.getDeposit());
                cv.put("withdrawal", newRow.getWithdrawal());
                cv.put("account_code", newRow.getAccountCode());
                cv.put("month_day", newRow.getMonthDay());
                cv.put("sdate", newRow.getSdate().getTime());
                cv.put("edate", newRow.getEdate().getTime());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_REGULAR_PAY, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_REGULAR_PAY, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(RegularPay aRow) {
        return deleteRow(aRow.getId());
    }

}
