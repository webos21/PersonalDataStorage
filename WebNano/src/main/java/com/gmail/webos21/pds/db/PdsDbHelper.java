package com.gmail.webos21.pds.db;

import com.gmail.webos21.pds.db.h2.H2Database;
import com.gmail.webos21.pds.db.h2.H2OpenHelper;
import com.gmail.webos21.pds.db.model.PbRow;
import com.gmail.webos21.pds.web.log.Log;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.List;

public class PdsDbHelper extends H2OpenHelper implements PdsDbInterface {

    private static final String TAG = "PdsDbHelper";

    private static final String TB_ACCOUNT_CLASS = "tb_account_class";
    private static final String TB_ACCOUNT_CODE = "tb_account_code";
    private static final String TB_ADDRESSBOOK = "tb_addressbook";
    private static final String TB_ANNIVERSARY = "tb_anniversary";
    private static final String TB_BANK = "tb_bank";
    private static final String TB_BANK_RECORD = "tb_bank_record";
    private static final String TB_BUDGET = "tb_budget";
    private static final String TB_CARD = "tb_card";
    private static final String TB_CARD_RECORD = "tb_card_record";
    private static final String TB_DIARY = "tb_diary";
    private static final String TB_INSURANCE = "tb_insurance";
    private static final String TB_INSURANCE_RECORD = "tb_insurance_record";
    private static final String TB_MEMO = "tb_memo";
    private static final String TB_REALESTATE = "tb_realestate";
    private static final String TB_REALESTATE_RECORD = "tb_realestate_record";
    private static final String TB_RECORD = "tb_record";
    private static final String TB_REGULAR_PAY = "tb_regular_pay";
    private static final String TB_REGULAR_RECORD = "tb_regular_record";
    private static final String TB_SCHEDULE = "tb_schedule";
    private static final String TB_STOCK = "tb_stock";
    private static final String TB_STOCK_RECORD = "tb_stock_record";
    private static final String TB_TITLES = "tb_titles";
    private static final String TB_USER = "tb_user";

    private static final String TB_PASSWORD_BOOK = "tb_password";

	private static final String CREATE_TB_ACCOUNT_CLASS = // Indent
			/* Indent */"CREATE TABLE IF NOT EXISTS " + TB_ACCOUNT_CLASS + " (" +
			/* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
			/* Indent */"	title            VARCHAR(255)" +
			/* Indent */");";

	private static final String CREATE_TB_ACCOUNT_CODE = // Indent
			/* Indent */"CREATE TABLE IF NOT EXISTS " + TB_ACCOUNT_CODE + " (" +
			/* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
			/* Indent */"	account_code     VARCHAR(255), " +
			/* Indent */"	title            VARCHAR(255)" +
			/* Indent */");";

	private static final String CREATE_TB_ADDRESSBOOK = // Indent
			/* Indent */"CREATE TABLE IF NOT EXISTS " + TB_ADDRESSBOOK + " (" +
			/* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
			/* Indent */"	full_name        VARCHAR(255), " +
			/* Indent */"	full_name        VARCHAR(255), " +
			/* Indent */"	full_name        VARCHAR(255), " +
			/* Indent */"	full_name        VARCHAR(255), " +
			/* Indent */"	title            VARCHAR(255)" +
			/* Indent */");";

    private static final String CREATE_TB_PASSWORD_BOOK = // Indent
            /* Indent */"CREATE TABLE IF NOT EXISTS " + TB_PASSWORD_BOOK + " (" +
            /* Indent */"	id               BIGINT  PRIMARY KEY  AUTO_INCREMENT, " +
            /* Indent */"	surl             VARCHAR(100), " +
            /* Indent */"	sname            VARCHAR(100), " +
            /* Indent */"	stype            VARCHAR(100), " +
            /* Indent */"	myid             VARCHAR(100), " +
            /* Indent */"	mypw             VARCHAR(100), " +
            /* Indent */"	reg_date         BIGINT, " +
            /* Indent */"	fix_date         BIGINT, " +
            /* Indent */"	memo             VARCHAR(4000) " +
            /* Indent */");";

    private static final String DROP_TB_PASSWORD_BOOK = /* Indent */"DROP TABLE IF EXISTS " + TB_PASSWORD_BOOK + ";";

    public PdsDbHelper(String filePath, String user, String pass, String opts, int version) {
        super(filePath, user, pass, opts, version);
    }

    @Override
    public void onCreate(H2Database db) {
        if (DbConsts.DB_DEBUG) {
            Log.d(TAG, "onCreate [" + getFilePath() + "]");
        }
        db.execSQL(CREATE_TB_PASSWORD_BOOK);
    }

    private void dropTables(H2Database db) {
        db.execSQL(DROP_TB_PASSWORD_BOOK);
    }

    @Override
    public void onUpgrade(H2Database db, int oldVersion, int newVersion) {
        if (DbConsts.DB_DEBUG) {
            Log.d(TAG, "onUpgrade [" + getFilePath() + "] oldVer = " + oldVersion + ", newVer = " + newVersion);
        }
        if (oldVersion != newVersion) {
            dropTables(db);
            onCreate(db);
        }
    }

    @Override
    public List<PbRow> findRows() {
        List<PbRow> aList = new ArrayList<PbRow>();

        try {
            H2Database db = getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + TB_PASSWORD_BOOK, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                PbRow aRow = new PbRow(/* id ------------- */rset.getLong(1), /* surl ----------- */rset.getString(2),
                        /* sname ---------- */rset.getString(3), /* stype ---------- */rset.getString(4),
                        /* myid ----------- */rset.getString(5), /* mypw ----------- */rset.getString(6),
                        /* reg_date ------- */rset.getLong(7), /* fix_date ------- */rset.getLong(8),
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
            debugDump(TB_PASSWORD_BOOK);
        }

        return aList;
    }

    @Override
    public List<PbRow> findRows(String keyString) {
        List<PbRow> aList = new ArrayList<PbRow>();

        try {
            H2Database db = getReadableDatabase();
            ResultSet rset = db.rawQuery(/* intent ---------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + TB_PASSWORD_BOOK + " " +
                            /* intent -------- */ " WHERE (surl LIKE ?) OR " +
                            /* intent -------- */ "        (sname LIKE ?) OR " +
                            /* intent -------- */ "        (stype LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                PbRow aRow = new PbRow(/* id ------------- */rset.getLong(1), /* surl ----------- */rset.getString(2),
                        /* sname ---------- */rset.getString(3), /* stype ---------- */rset.getString(4),
                        /* myid ----------- */rset.getString(5), /* mypw ----------- */rset.getString(6),
                        /* reg_date ------- */rset.getLong(7), /* fix_date ------- */rset.getLong(8),
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
    public PbRow getRow(Long id) {
        PbRow aRow = null;

        try {
            H2Database db = getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + TB_PASSWORD_BOOK + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new PbRow(/* id ------------- */rset.getLong(1), /* surl ----------- */rset.getString(2),
                    /* sname ---------- */rset.getString(3), /* stype ---------- */rset.getString(4),
                    /* myid ----------- */rset.getString(5), /* mypw ----------- */rset.getString(6),
                    /* reg_date ------- */rset.getLong(7), /* fix_date ------- */rset.getLong(8),
                    /* memo ----------- */rset.getString(9));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public PbRow getRow(PbRow aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(PbRow newRow) {
        try {
            H2Database db = getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + TB_PASSWORD_BOOK + " WHERE id = " + newRow.getId(), null);
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
                    db.update(TB_PASSWORD_BOOK, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
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
                    db.insert(TB_PASSWORD_BOOK, null, cv);
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
                db.insert(TB_PASSWORD_BOOK, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = getWritableDatabase();
        int result = db.delete(TB_PASSWORD_BOOK, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(PbRow aRow) {
        return deleteRow(aRow.getId());
    }

    private void debugDump(String tableName) {
        try {
            H2Database db = getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + tableName, null);
            if (rset == null) {
                return;
            }

            ResultSetMetaData rmd = rset.getMetaData();

            int nCol = rmd.getColumnCount();
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i <= nCol; i++) {
                sb.append(rmd.getColumnName(i)).append('(').append(i).append(')').append('\t').append('|');
            }
            if (DbConsts.DB_DEBUG) {
                Log.d(TAG, sb.toString());
            }

            sb.delete(0, sb.length());

            rset.first();
            do {
                for (int c = 1; c <= nCol; c++) {
                    sb.append(rset.getString(c)).append('\t').append('|');
                }
                sb.append('\n');
            } while (rset.next());

            if (DbConsts.DB_DEBUG) {
                Log.d(TAG, sb.toString());
            }

            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}