package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Record;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class RecordRepoImpl implements RecordRepo {

    private PdsDbHelper opener;

    public RecordRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<Record> findRows() {
        List<Record> aList = new ArrayList<Record>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_RECORD, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Record aRow = new Record(
                        /* id ------------- */rset.getLong(1),
                        /* wdate ---------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3),
                        /* deposit -------- */rset.getLong(4),
                        /* withdrawal ----- */rset.getLong(5),
                        /* account_code --- */rset.getString(6),
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
            opener.debugDump(DbConsts.TB_RECORD);
        }

        return aList;
    }

    @Override
    public List<Record> findRows(String keyString) {
        List<Record> aList = new ArrayList<Record>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_RECORD + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Record aRow = new Record(
                        /* id ------------- */rset.getLong(1),
                        /* wdate ---------- */rset.getLong(2),
                        /* title ---------- */rset.getString(3),
                        /* deposit -------- */rset.getLong(4),
                        /* withdrawal ----- */rset.getLong(5),
                        /* account_code --- */rset.getString(6),
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
    public Record getRow(Long id) {
        Record aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_RECORD + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Record(
                    /* id ------------- */rset.getLong(1),
                    /* wdate ---------- */rset.getLong(2),
                    /* title ---------- */rset.getString(3),
                    /* deposit -------- */rset.getLong(4),
                    /* withdrawal ----- */rset.getLong(5),
                    /* account_code --- */rset.getString(6),
                    /* memo ----------- */rset.getString(7));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public Record getRow(Record aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(Record newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_RECORD + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_RECORD, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("wdate", newRow.getWdate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("withdrawal", newRow.getWithdrawal());
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_RECORD, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("wdate", newRow.getWdate().getTime());
                cv.put("title", newRow.getTitle());
                cv.put("deposit", newRow.getDeposit());
                cv.put("withdrawal", newRow.getWithdrawal());
                cv.put("account_code", newRow.getAccountCode());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_RECORD, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_RECORD, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(Record aRow) {
        return deleteRow(aRow.getId());
    }

}
