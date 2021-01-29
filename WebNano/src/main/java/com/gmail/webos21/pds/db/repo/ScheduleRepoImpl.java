package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Schedule;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ScheduleRepoImpl implements ScheduleRepo {

    private PdsDbHelper opener;

    public ScheduleRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<Schedule> findRows() {
        List<Schedule> aList = new ArrayList<Schedule>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_SCHEDULE, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Schedule aRow = new Schedule(
                        /* id ------------- */rset.getLong(1),
                        /* title ---------- */rset.getString(2),
                        /* pdate ---------- */rset.getLong(3),
                        /* readok --------- */rset.getInt(4),
                        /* memo ----------- */rset.getString(5));
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
            opener.debugDump(DbConsts.TB_SCHEDULE);
        }

        return aList;
    }

    @Override
    public List<Schedule> findRows(String keyString) {
        List<Schedule> aList = new ArrayList<Schedule>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_SCHEDULE + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Schedule aRow = new Schedule(
                        /* id ------------- */rset.getLong(1),
                        /* title ---------- */rset.getString(2),
                        /* pdate ---------- */rset.getLong(3),
                        /* readok --------- */rset.getInt(4),
                        /* memo ----------- */rset.getString(5));
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
    public Schedule getRow(Long id) {
        Schedule aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_SCHEDULE + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Schedule(
                    /* id ------------- */rset.getLong(1),
                    /* title ---------- */rset.getString(2),
                    /* pdate ---------- */rset.getLong(3),
                    /* readok --------- */rset.getInt(4),
                    /* memo ----------- */rset.getString(5));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public Schedule getRow(Schedule aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(Schedule newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_SCHEDULE + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("title", newRow.getTitle());
                    cv.put("pdate", newRow.getPdate().getTime());
                    cv.put("readok", newRow.getReadOk());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_SCHEDULE, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("title", newRow.getTitle());
                    cv.put("pdate", newRow.getPdate().getTime());
                    cv.put("readok", newRow.getReadOk());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_SCHEDULE, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("title", newRow.getTitle());
                cv.put("pdate", newRow.getPdate().getTime());
                cv.put("readok", newRow.getReadOk());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_SCHEDULE, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_SCHEDULE, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(Schedule aRow) {
        return deleteRow(aRow.getId());
    }

}
