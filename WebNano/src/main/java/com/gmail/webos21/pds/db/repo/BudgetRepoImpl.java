package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Budget;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class BudgetRepoImpl implements BudgetRepo {

    private PdsDbHelper opener;

    public BudgetRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<Budget> findRows() {
        List<Budget> aList = new ArrayList<Budget>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_PASSWORD_BOOK, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Budget aRow = new Budget(
                        /* id ------------- */rset.getLong(1),
                        /* surl ----------- */rset.getString(2),
                        /* sname ---------- */rset.getString(3),
                        /* stype ---------- */rset.getString(4),
                        /* myid ----------- */rset.getString(5),
                        /* mypw ----------- */rset.getString(6),
                        /* reg_date ------- */rset.getLong(7),
                        /* fix_date ------- */rset.getLong(8),
                        /* memo ----------- */rset.getString(9));
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
    public List<Budget> findRows(String keyString) {
        List<Budget> aList = new ArrayList<Budget>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_PASSWORD_BOOK + " " +
                            /* intent -------- */ " WHERE (surl LIKE ?) OR " +
                            /* intent -------- */ "        (sname LIKE ?) OR " +
                            /* intent -------- */ "        (stype LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Budget aRow = new Budget(
                        /* id ------------- */rset.getLong(1),
                        /* surl ----------- */rset.getString(2),
                        /* sname ---------- */rset.getString(3),
                        /* stype ---------- */rset.getString(4),
                        /* myid ----------- */rset.getString(5),
                        /* mypw ----------- */rset.getString(6),
                        /* reg_date ------- */rset.getLong(7),
                        /* fix_date ------- */rset.getLong(8),
                        /* memo ----------- */rset.getString(9));
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
    public Budget getRow(Long id) {
        Budget aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_PASSWORD_BOOK + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Budget(
                    /* id ------------- */rset.getLong(1),
                    /* surl ----------- */rset.getString(2),
                    /* sname ---------- */rset.getString(3),
                    /* stype ---------- */rset.getString(4),
                    /* myid ----------- */rset.getString(5),
                    /* mypw ----------- */rset.getString(6),
                    /* reg_date ------- */rset.getLong(7),
                    /* fix_date ------- */rset.getLong(8),
                    /* memo ----------- */rset.getString(9));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public Budget getRow(Budget aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(Budget newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_PASSWORD_BOOK + " WHERE id = " + newRow.getId(), null);
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
                    db.update(DbConsts.TB_PASSWORD_BOOK, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
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
    public int deleteRow(Budget aRow) {
        return deleteRow(aRow.getId());
    }

}
