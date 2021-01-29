package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Titles;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TitlesRepoImpl implements TitlesRepo {

    private PdsDbHelper opener;

    public TitlesRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<Titles> findRows() {
        List<Titles> aList = new ArrayList<Titles>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_TITLES, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Titles aRow = new Titles(
                        /* id ------------- */rset.getLong(1),
                        /* used ----------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3));
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
            opener.debugDump(DbConsts.TB_TITLES);
        }

        return aList;
    }

    @Override
    public List<Titles> findRows(String keyString) {
        List<Titles> aList = new ArrayList<Titles>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_TITLES + " " +
                            /* intent -------- */ " WHERE (title LIKE ?)",
                    new String[]{"%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Titles aRow = new Titles(
                        /* id ------------- */rset.getLong(1),
                        /* used ----------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3));
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
    public Titles getRow(Long id) {
        Titles aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_TITLES + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Titles(
                    /* id ------------- */rset.getLong(1),
                    /* used ----------- */rset.getLong(2),
                    /* title ---------- */rset.getString(3));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public Titles getRow(Titles aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(Titles newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_TITLES + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("used", newRow.getUsed());
                    cv.put("title", newRow.getTitle());
                    db.update(DbConsts.TB_TITLES, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("used", newRow.getUsed());
                    cv.put("title", newRow.getTitle());
                    db.insert(DbConsts.TB_TITLES, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("used", newRow.getUsed());
                cv.put("title", newRow.getTitle());
                db.insert(DbConsts.TB_TITLES, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_TITLES, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(Titles aRow) {
        return deleteRow(aRow.getId());
    }

}
