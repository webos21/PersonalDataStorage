package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.AccountCode;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class AccountCodeRepoImpl implements AccountCodeRepo {

    private PdsDbHelper opener;

    public AccountCodeRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<AccountCode> findRows() {
        List<AccountCode> aList = new ArrayList<AccountCode>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_ACCOUNT_CODE, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                AccountCode aRow = new AccountCode(
                        /* id ------------- */rset.getLong(1),
                        /* account_code --- */rset.getString(2),
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
            opener.debugDump(DbConsts.TB_ACCOUNT_CODE);
        }

        return aList;
    }

    @Override
    public List<AccountCode> findRows(String keyString) {
        List<AccountCode> aList = new ArrayList<AccountCode>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_ACCOUNT_CODE + " " +
                            /* intent -------- */ " WHERE (title LIKE ?)",
                    new String[]{"%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                AccountCode aRow = new AccountCode(
                        /* id ------------- */rset.getLong(1),
                        /* account_code --- */rset.getString(2),
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
    public AccountCode getRow(Long id) {
        AccountCode aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_ACCOUNT_CODE + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new AccountCode(
                    /* id ------------- */rset.getLong(1),
                    /* account_code --- */rset.getString(2),
                    /* title ---------- */rset.getString(3));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public AccountCode getRow(AccountCode aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(AccountCode newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_ACCOUNT_CODE + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("title", newRow.getTitle());
                    db.update(DbConsts.TB_ACCOUNT_CODE, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("account_code", newRow.getAccountCode());
                    cv.put("title", newRow.getTitle());
                    db.insert(DbConsts.TB_ACCOUNT_CODE, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("account_code", newRow.getAccountCode());
                cv.put("title", newRow.getTitle());
                db.insert(DbConsts.TB_ACCOUNT_CODE, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_ACCOUNT_CODE, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(AccountCode aRow) {
        return deleteRow(aRow.getId());
    }

}
