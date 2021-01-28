package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.AddressBook;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class AddressBookRepoImpl implements AddressBookRepo {

    private PdsDbHelper opener;

    public AddressBookRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<AddressBook> findRows() {
        List<AddressBook> aList = new ArrayList<AddressBook>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_ADDRESSBOOK, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                AddressBook aRow = new AddressBook(
                        /* id ------------- */rset.getLong(1),
                        /* full_name ------ */rset.getString(2),
                        /* mobile --------- */rset.getString(3),
                        /* category ------- */rset.getString(4),
                        /* telephone ------ */rset.getString(5),
                        /* fax ------------ */rset.getString(6),
                        /* email ---------- */rset.getString(7),
                        /* homepage ------- */rset.getString(8),
                        /* postcode ------- */rset.getString(9),
                        /* address -------- */rset.getString(10),
                        /* memo ----------- */rset.getString(11));
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
            opener.debugDump(DbConsts.TB_ADDRESSBOOK);
        }

        return aList;
    }

    @Override
    public List<AddressBook> findRows(String keyString) {
        List<AddressBook> aList = new ArrayList<AddressBook>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_ADDRESSBOOK + " " +
                            /* intent -------- */ " WHERE (full_name LIKE ?) OR " +
                            /* intent -------- */ "        (mobile LIKE ?) OR " +
                            /* intent -------- */ "        (email LIKE ?) OR " +
                            /* intent -------- */ "        (homepage LIKE ?) OR " +
                            /* intent -------- */ "        (address LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%",
                             "%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                AddressBook aRow = new AddressBook(
                        /* id ------------- */rset.getLong(1),
                        /* full_name ------ */rset.getString(2),
                        /* mobile --------- */rset.getString(3),
                        /* category ------- */rset.getString(4),
                        /* telephone ------ */rset.getString(5),
                        /* fax ------------ */rset.getString(6),
                        /* email ---------- */rset.getString(7),
                        /* homepage ------- */rset.getString(8),
                        /* postcode ------- */rset.getString(9),
                        /* address -------- */rset.getString(10),
                        /* memo ----------- */rset.getString(11));
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
    public AddressBook getRow(Long id) {
        AddressBook aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_ADDRESSBOOK + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new AddressBook(
                    /* id ------------- */rset.getLong(1),
                    /* full_name ------ */rset.getString(2),
                    /* mobile --------- */rset.getString(3),
                    /* category ------- */rset.getString(4),
                    /* telephone ------ */rset.getString(5),
                    /* fax ------------ */rset.getString(6),
                    /* email ---------- */rset.getString(7),
                    /* homepage ------- */rset.getString(8),
                    /* postcode ------- */rset.getString(9),
                    /* address -------- */rset.getString(10),
                    /* memo ----------- */rset.getString(11));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public AddressBook getRow(AddressBook aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(AddressBook newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_ADDRESSBOOK + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("full_name", newRow.getFullName());
                    cv.put("mobile", newRow.getMobile());
                    cv.put("category", newRow.getCategory());
                    cv.put("telephone", newRow.getTelephone());
                    cv.put("fax", newRow.getFax());
                    cv.put("email", newRow.getEmail());
                    cv.put("homepage", newRow.getHomepage());
                    cv.put("postcode", newRow.getPostcode());
                    cv.put("address", newRow.getAddress());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_ADDRESSBOOK, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("full_name", newRow.getFullName());
                    cv.put("mobile", newRow.getMobile());
                    cv.put("category", newRow.getCategory());
                    cv.put("telephone", newRow.getTelephone());
                    cv.put("fax", newRow.getFax());
                    cv.put("email", newRow.getEmail());
                    cv.put("homepage", newRow.getHomepage());
                    cv.put("postcode", newRow.getPostcode());
                    cv.put("address", newRow.getAddress());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_ADDRESSBOOK, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("full_name", newRow.getFullName());
                cv.put("mobile", newRow.getMobile());
                cv.put("category", newRow.getCategory());
                cv.put("telephone", newRow.getTelephone());
                cv.put("fax", newRow.getFax());
                cv.put("email", newRow.getEmail());
                cv.put("homepage", newRow.getHomepage());
                cv.put("postcode", newRow.getPostcode());
                cv.put("address", newRow.getAddress());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_ADDRESSBOOK, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_ADDRESSBOOK, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(AddressBook aRow) {
        return deleteRow(aRow.getId());
    }

}
