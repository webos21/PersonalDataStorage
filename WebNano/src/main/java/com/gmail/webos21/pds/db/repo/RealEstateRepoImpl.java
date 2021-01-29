package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.RealEstate;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class RealEstateRepoImpl implements RealEstateRepo {

    private PdsDbHelper opener;

    public RealEstateRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<RealEstate> findRows() {
        List<RealEstate> aList = new ArrayList<RealEstate>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REALESTATE, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RealEstate aRow = new RealEstate(
                        /* id ------------- */rset.getLong(1),
                        /* estate_type ---- */rset.getString(2),
                        /* title ---------- */rset.getString(3),
                        /* holder --------- */rset.getString(4),
                        /* estimate ------- */rset.getLong(5),
                        /* loan ----------- */rset.getLong(6),
                        /* acquisition_date */rset.getLong(7),
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
            opener.debugDump(DbConsts.TB_REALESTATE);
        }

        return aList;
    }

    @Override
    public List<RealEstate> findRows(String keyString) {
        List<RealEstate> aList = new ArrayList<RealEstate>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_REALESTATE + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                RealEstate aRow = new RealEstate(
                        /* id ------------- */rset.getLong(1),
                        /* estate_type ---- */rset.getString(2),
                        /* title ---------- */rset.getString(3),
                        /* holder --------- */rset.getString(4),
                        /* estimate ------- */rset.getLong(5),
                        /* loan ----------- */rset.getLong(6),
                        /* acquisition_date */rset.getLong(7),
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
    public RealEstate getRow(Long id) {
        RealEstate aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REALESTATE + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new RealEstate(
                    /* id ------------- */rset.getLong(1),
                    /* estate_type ---- */rset.getString(2),
                    /* title ---------- */rset.getString(3),
                    /* holder --------- */rset.getString(4),
                    /* estimate ------- */rset.getLong(5),
                    /* loan ----------- */rset.getLong(6),
                    /* acquisition_date */rset.getLong(7),
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
    public RealEstate getRow(RealEstate aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(RealEstate newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_REALESTATE + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("estate_type", newRow.getEstateType());
                    cv.put("title", newRow.getTitle());
                    cv.put("holder", newRow.getHolder());
                    cv.put("estimate", newRow.getEstimate());
                    cv.put("loan", newRow.getLoan());
                    cv.put("acquisition_date", newRow.getAcquisitionDate().getTime());
                    cv.put("estimate_date", newRow.getEstimateDate().getTime());
                    cv.put("arrange", newRow.getArrange());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_REALESTATE, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("estate_type", newRow.getEstateType());
                    cv.put("title", newRow.getTitle());
                    cv.put("holder", newRow.getHolder());
                    cv.put("estimate", newRow.getEstimate());
                    cv.put("loan", newRow.getLoan());
                    cv.put("acquisition_date", newRow.getAcquisitionDate().getTime());
                    cv.put("estimate_date", newRow.getEstimateDate().getTime());
                    cv.put("arrange", newRow.getArrange());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_REALESTATE, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("estate_type", newRow.getEstateType());
                cv.put("title", newRow.getTitle());
                cv.put("holder", newRow.getHolder());
                cv.put("estimate", newRow.getEstimate());
                cv.put("loan", newRow.getLoan());
                cv.put("acquisition_date", newRow.getAcquisitionDate().getTime());
                cv.put("estimate_date", newRow.getEstimateDate().getTime());
                cv.put("arrange", newRow.getArrange());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_REALESTATE, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_REALESTATE, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(RealEstate aRow) {
        return deleteRow(aRow.getId());
    }

}
