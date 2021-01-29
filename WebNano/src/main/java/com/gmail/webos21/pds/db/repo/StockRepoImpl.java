package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Stock;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class StockRepoImpl implements StockRepo {

    private PdsDbHelper opener;

    public StockRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<Stock> findRows() {
        List<Stock> aList = new ArrayList<Stock>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_STOCK, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Stock aRow = new Stock(
                        /* id ------------- */rset.getLong(1),
                        /* company -------- */rset.getString(2),
                        /* account_name --- */rset.getString(3),
                        /* account_number - */rset.getString(4),
                        /* holder --------- */rset.getString(5),
                        /* deposit -------- */rset.getLong(6),
                        /* estimate ------- */rset.getLong(7),
                        /* estimate_date -- */rset.getLong(8),
                        /* arrange -------- */rset.getLong(9),
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
            opener.debugDump(DbConsts.TB_STOCK);
        }

        return aList;
    }

    @Override
    public List<Stock> findRows(String keyString) {
        List<Stock> aList = new ArrayList<Stock>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_STOCK + " " +
                            /* intent -------- */ " WHERE (company LIKE ?) OR " +
                            /* intent -------- */ "        (account_name LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Stock aRow = new Stock(
                        /* id ------------- */rset.getLong(1),
                        /* company -------- */rset.getString(2),
                        /* account_name --- */rset.getString(3),
                        /* account_number - */rset.getString(4),
                        /* holder --------- */rset.getString(5),
                        /* deposit -------- */rset.getLong(6),
                        /* estimate ------- */rset.getLong(7),
                        /* estimate_date -- */rset.getLong(8),
                        /* arrange -------- */rset.getLong(9),
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
    public Stock getRow(Long id) {
        Stock aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_STOCK + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Stock(
                    /* id ------------- */rset.getLong(1),
                    /* company -------- */rset.getString(2),
                    /* account_name --- */rset.getString(3),
                    /* account_number - */rset.getString(4),
                    /* holder --------- */rset.getString(5),
                    /* deposit -------- */rset.getLong(6),
                    /* estimate ------- */rset.getLong(7),
                    /* estimate_date -- */rset.getLong(8),
                    /* arrange -------- */rset.getLong(9),
                    /* memo ----------- */rset.getString(10));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public Stock getRow(Stock aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(Stock newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_STOCK + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("company", newRow.getCompany());
                    cv.put("account_name", newRow.getAccountName());
                    cv.put("account_number", newRow.getAccountNumber());
                    cv.put("holder", newRow.getHolder());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("estimate", newRow.getEstimate());
                    cv.put("estimate_date", newRow.getEstimateDate().getTime());
                    cv.put("arrange", newRow.getArrange());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_STOCK, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("company", newRow.getCompany());
                    cv.put("account_name", newRow.getAccountName());
                    cv.put("account_number", newRow.getAccountNumber());
                    cv.put("holder", newRow.getHolder());
                    cv.put("deposit", newRow.getDeposit());
                    cv.put("estimate", newRow.getEstimate());
                    cv.put("estimate_date", newRow.getEstimateDate().getTime());
                    cv.put("arrange", newRow.getArrange());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_STOCK, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("company", newRow.getCompany());
                cv.put("account_name", newRow.getAccountName());
                cv.put("account_number", newRow.getAccountNumber());
                cv.put("holder", newRow.getHolder());
                cv.put("deposit", newRow.getDeposit());
                cv.put("estimate", newRow.getEstimate());
                cv.put("estimate_date", newRow.getEstimateDate().getTime());
                cv.put("arrange", newRow.getArrange());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_STOCK, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_STOCK, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(Stock aRow) {
        return deleteRow(aRow.getId());
    }

}
