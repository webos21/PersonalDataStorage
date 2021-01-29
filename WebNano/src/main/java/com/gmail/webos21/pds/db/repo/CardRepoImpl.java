package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.Card;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CardRepoImpl implements CardRepo {

    private PdsDbHelper opener;

    public CardRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<Card> findRows() {
        List<Card> aList = new ArrayList<Card>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_CARD, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Card aRow = new Card(
                        /* id ------------- */rset.getLong(1),
                        /* company -------- */rset.getString(2),
                        /* card_name ------ */rset.getString(3),
                        /* card_number ---- */rset.getString(4),
                        /* card_password -- */rset.getString(5),
                        /* valid_year ----- */rset.getInt(6),
                        /* valid_month ---- */rset.getInt(7),
                        /* charge_date ---- */rset.getInt(8),
                        /* cvc_number ----- */rset.getInt(9),
                        /* bank_id -------- */rset.getLong(10),
                        /* credit_limit --- */rset.getLong(11),
                        /* cash_advance --- */rset.getLong(12),
                        /* card_loan ------ */rset.getLong(13),
                        /* issue_date ----- */rset.getLong(14),
                        /* refresh_normal - */rset.getInt(15),
                        /* refresh_short -- */rset.getInt(16),
                        /* arrange -------- */rset.getLong(17),
                        /* memo ----------- */rset.getString(18));
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
            opener.debugDump(DbConsts.TB_CARD);
        }

        return aList;
    }

    @Override
    public List<Card> findRows(String keyString) {
        List<Card> aList = new ArrayList<Card>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_CARD + " " +
                            /* intent -------- */ " WHERE (company LIKE ?) OR " +
                            /* intent -------- */ "        (card_name LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                Card aRow = new Card(
                        /* id ------------- */rset.getLong(1),
                        /* company -------- */rset.getString(2),
                        /* card_name ------ */rset.getString(3),
                        /* card_number ---- */rset.getString(4),
                        /* card_password -- */rset.getString(5),
                        /* valid_year ----- */rset.getInt(6),
                        /* valid_month ---- */rset.getInt(7),
                        /* charge_date ---- */rset.getInt(8),
                        /* cvc_number ----- */rset.getInt(9),
                        /* bank_id -------- */rset.getLong(10),
                        /* credit_limit --- */rset.getLong(11),
                        /* cash_advance --- */rset.getLong(12),
                        /* card_loan ------ */rset.getLong(13),
                        /* issue_date ----- */rset.getLong(14),
                        /* refresh_normal - */rset.getInt(15),
                        /* refresh_short -- */rset.getInt(16),
                        /* arrange -------- */rset.getLong(17),
                        /* memo ----------- */rset.getString(18));
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
    public Card getRow(Long id) {
        Card aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_CARD + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new Card(
                    /* id ------------- */rset.getLong(1),
                    /* company -------- */rset.getString(2),
                    /* card_name ------ */rset.getString(3),
                    /* card_number ---- */rset.getString(4),
                    /* card_password -- */rset.getString(5),
                    /* valid_year ----- */rset.getInt(6),
                    /* valid_month ---- */rset.getInt(7),
                    /* charge_date ---- */rset.getInt(8),
                    /* cvc_number ----- */rset.getInt(9),
                    /* bank_id -------- */rset.getLong(10),
                    /* credit_limit --- */rset.getLong(11),
                    /* cash_advance --- */rset.getLong(12),
                    /* card_loan ------ */rset.getLong(13),
                    /* issue_date ----- */rset.getLong(14),
                    /* refresh_normal - */rset.getInt(15),
                    /* refresh_short -- */rset.getInt(16),
                    /* arrange -------- */rset.getLong(17),
                    /* memo ----------- */rset.getString(18));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public Card getRow(Card aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(Card newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_CARD + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("company", newRow.getCompany());
                    cv.put("card_name", newRow.getCardName());
                    cv.put("card_number", newRow.getCardNumber());
                    cv.put("card_password", newRow.getCardPassword());
                    cv.put("valid_year", newRow.getValidYear());
                    cv.put("valid_month", newRow.getValidMonth());
                    cv.put("charge_date", newRow.getChargeDate());
                    cv.put("cvc_number", newRow.getCvcNumber());
                    cv.put("bank_id", newRow.getBankId());
                    cv.put("credit_limit", newRow.getCreditLimit());
                    cv.put("cash_advance", newRow.getCashAdvance());
                    cv.put("card_loan", newRow.getCardLoan());
                    cv.put("issue_date", newRow.getIssueDate().getTime());
                    cv.put("refresh_normal", newRow.getRefreshNormal());
                    cv.put("refresh_short", newRow.getRefreshShort());
                    cv.put("arrange", newRow.getArrange());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_CARD, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("company", newRow.getCompany());
                    cv.put("card_name", newRow.getCardName());
                    cv.put("card_number", newRow.getCardNumber());
                    cv.put("card_password", newRow.getCardPassword());
                    cv.put("valid_year", newRow.getValidYear());
                    cv.put("valid_month", newRow.getValidMonth());
                    cv.put("charge_date", newRow.getChargeDate());
                    cv.put("cvc_number", newRow.getCvcNumber());
                    cv.put("bank_id", newRow.getBankId());
                    cv.put("credit_limit", newRow.getCreditLimit());
                    cv.put("cash_advance", newRow.getCashAdvance());
                    cv.put("card_loan", newRow.getCardLoan());
                    cv.put("issue_date", newRow.getIssueDate().getTime());
                    cv.put("refresh_normal", newRow.getRefreshNormal());
                    cv.put("refresh_short", newRow.getRefreshShort());
                    cv.put("arrange", newRow.getArrange());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_CARD, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("company", newRow.getCompany());
                cv.put("card_name", newRow.getCardName());
                cv.put("card_number", newRow.getCardNumber());
                cv.put("card_password", newRow.getCardPassword());
                cv.put("valid_year", newRow.getValidYear());
                cv.put("valid_month", newRow.getValidMonth());
                cv.put("charge_date", newRow.getChargeDate());
                cv.put("cvc_number", newRow.getCvcNumber());
                cv.put("bank_id", newRow.getBankId());
                cv.put("credit_limit", newRow.getCreditLimit());
                cv.put("cash_advance", newRow.getCashAdvance());
                cv.put("card_loan", newRow.getCardLoan());
                cv.put("issue_date", newRow.getIssueDate().getTime());
                cv.put("refresh_normal", newRow.getRefreshNormal());
                cv.put("refresh_short", newRow.getRefreshShort());
                cv.put("arrange", newRow.getArrange());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_CARD, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_CARD, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(Card aRow) {
        return deleteRow(aRow.getId());
    }

}
