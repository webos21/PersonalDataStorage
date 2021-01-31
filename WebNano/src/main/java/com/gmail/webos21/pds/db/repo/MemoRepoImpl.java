package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Memo;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MemoRepoImpl implements MemoRepo {

    private PdsDbHelper opener;

    public MemoRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<Memo> findRows() {
        List<Memo> aList = new ArrayList<Memo>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_MEMO, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Memo aRow = new Memo(
                        /* id ------------- */rset.getLong(1),
                        /* wdate ---------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3),
                        /* content -------- */rset.getString(4));
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
            opener.debugDump(DbConsts.TB_MEMO);
        }

        return aList;
    }

    @Override
    public List<Memo> findRows(String keyString) {
        List<Memo> aList = new ArrayList<Memo>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_MEMO + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "       (content LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Memo aRow = new Memo(
                        /* id ------------- */rset.getLong(1),
                        /* wdate ---------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3),
                        /* content -------- */rset.getString(4));
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
    public Memo getRow(Long id) {
        Memo aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_MEMO + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Memo(
                    /* id ------------- */rset.getLong(1),
                    /* wdate ---------- */rset.getLong(2),
                    /* title ---------- */rset.getString(3),
                    /* content -------- */rset.getString(4));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public Memo getRow(Memo aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(Memo newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_MEMO + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("content", newRow.getContent());
                    db.update(DbConsts.TB_MEMO, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("content", newRow.getContent());
                    db.insert(DbConsts.TB_MEMO, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("wdate", newRow.getWdate().getTime());
                cv.put("title", newRow.getTitle());
                cv.put("content", newRow.getContent());
                db.insert(DbConsts.TB_MEMO, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_MEMO, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(Memo aRow) {
        return deleteRow(aRow.getId());
    }

}