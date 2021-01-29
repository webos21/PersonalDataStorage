package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.ContentValues;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbHelper;
import com.gmail.webos21.pds.db.domain.CardRecord;
import com.gmail.webos21.pds.db.h2.H2Database;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CardRecordRepoImpl implements CardRecordRepo {

    private PdsDbHelper opener;

    public CardRecordRepoImpl(PdsDbHelper opener) {
        this.opener = opener;
    }

    @Override
    public List<CardRecord> findRows() {
        List<CardRecord> aList = new ArrayList<CardRecord>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_CARD_RECORD, null);
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                CardRecord aRow = new CardRecord(
                        /* id ------------- */rset.getLong(1),
                        /* card_id -------- */rset.getLong(2),
                        /* transaction_date */rset.getLong(3),
                        /* title ---------- */rset.getString(4),
                        /* price ---------- */rset.getLong(5),
                        /* commission ----- */rset.getLong(6),
                        /* installment ---- */rset.getInt(7),
                        /* installment_id - */rset.getLong(8),
                        /* installment_turn */rset.getInt(9),
                        /* amount --------- */rset.getLong(10),
                        /* remainder ------ */rset.getLong(11),
                        /* settlement_date- */rset.getLong(12),
                        /* paid ----------- */rset.getInt(13),
                        /* memo ----------- */rset.getString(14));
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
            opener.debugDump(DbConsts.TB_CARD_RECORD);
        }

        return aList;
    }

    @Override
    public List<CardRecord> findRows(String keyString) {
        List<CardRecord> aList = new ArrayList<CardRecord>();

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery(
                    /* intent -------- */ "SELECT * " +
                            /* intent -------- */ " FROM " + DbConsts.TB_CARD_RECORD + " " +
                            /* intent -------- */ " WHERE (title LIKE ?) OR " +
                            /* intent -------- */ "        (memo LIKE ?)",
                    new String[]{"%" + keyString + "%", "%" + keyString + "%"});
            if (rset == null || !rset.first()) {
                return aList;
            }

            do {
                CardRecord aRow = new CardRecord(
                        /* id ------------- */rset.getLong(1),
                        /* card_id -------- */rset.getLong(2),
                        /* transaction_date */rset.getLong(3),
                        /* title ---------- */rset.getString(4),
                        /* price ---------- */rset.getLong(5),
                        /* commission ----- */rset.getLong(6),
                        /* installment ---- */rset.getInt(7),
                        /* installment_id - */rset.getLong(8),
                        /* installment_turn */rset.getInt(9),
                        /* amount --------- */rset.getLong(10),
                        /* remainder ------ */rset.getLong(11),
                        /* settlement_date- */rset.getLong(12),
                        /* paid ----------- */rset.getInt(13),
                        /* memo ----------- */rset.getString(14));
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
    public CardRecord getRow(Long id) {
        CardRecord aRow = null;

        try {
            H2Database db = opener.getReadableDatabase();
            ResultSet rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_CARD_RECORD + " WHERE id = " + id, null);
            if (rset == null || !rset.first()) {
                return null;
            }

            aRow = new CardRecord(
                    /* id ------------- */rset.getLong(1),
                    /* card_id -------- */rset.getLong(2),
                    /* transaction_date */rset.getLong(3),
                    /* title ---------- */rset.getString(4),
                    /* price ---------- */rset.getLong(5),
                    /* commission ----- */rset.getLong(6),
                    /* installment ---- */rset.getInt(7),
                    /* installment_id - */rset.getLong(8),
                    /* installment_turn */rset.getInt(9),
                    /* amount --------- */rset.getLong(10),
                    /* remainder ------ */rset.getLong(11),
                    /* settlement_date- */rset.getLong(12),
                    /* paid ----------- */rset.getInt(13),
                    /* memo ----------- */rset.getString(14));
            rset.close();
            db.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return aRow;
    }

    @Override
    public CardRecord getRow(CardRecord aRow) {
        return getRow(aRow.getId());
    }

    @Override
    public boolean updateRow(CardRecord newRow) {
        try {
            H2Database db = opener.getWritableDatabase();
            ResultSet rset = null;

            if (newRow.getId() != null) {
                rset = db.rawQuery("SELECT * FROM " + DbConsts.TB_CARD_RECORD + " WHERE id = " + newRow.getId(), null);
                if (rset != null && rset.first()) {
                    rset.close();

                    ContentValues cv = new ContentValues();
                    cv.put("card_id", newRow.getCardId());
                    cv.put("transaction_date", newRow.getTransactionDate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("price", newRow.getPrice());
                    cv.put("commission", newRow.getCommission());
                    cv.put("installment", newRow.getInstallment());
                    cv.put("installment_id", newRow.getInstallmentId());
                    cv.put("installment_turn", newRow.getInstallmentTurn());
                    cv.put("amount", newRow.getAmount());
                    cv.put("remainder", newRow.getRemainder());
                    cv.put("settlement_date", newRow.getSettlementDate().getTime());
                    cv.put("paid", newRow.getPaid());
                    cv.put("memo", newRow.getMemo());
                    db.update(DbConsts.TB_CARD_RECORD, cv, " id = ? ", new String[]{Long.toString(newRow.getId())});
                } else {
                    ContentValues cv = new ContentValues();
                    // cv.put("id", newRow.getId());
                    cv.put("card_id", newRow.getCardId());
                    cv.put("transaction_date", newRow.getTransactionDate().getTime());
                    cv.put("title", newRow.getTitle());
                    cv.put("price", newRow.getPrice());
                    cv.put("commission", newRow.getCommission());
                    cv.put("installment", newRow.getInstallment());
                    cv.put("installment_id", newRow.getInstallmentId());
                    cv.put("installment_turn", newRow.getInstallmentTurn());
                    cv.put("amount", newRow.getAmount());
                    cv.put("remainder", newRow.getRemainder());
                    cv.put("settlement_date", newRow.getSettlementDate().getTime());
                    cv.put("paid", newRow.getPaid());
                    cv.put("memo", newRow.getMemo());
                    db.insert(DbConsts.TB_CARD_RECORD, null, cv);
                }
            } else {
                ContentValues cv = new ContentValues();
                cv.put("card_id", newRow.getCardId());
                cv.put("transaction_date", newRow.getTransactionDate().getTime());
                cv.put("title", newRow.getTitle());
                cv.put("price", newRow.getPrice());
                cv.put("commission", newRow.getCommission());
                cv.put("installment", newRow.getInstallment());
                cv.put("installment_id", newRow.getInstallmentId());
                cv.put("installment_turn", newRow.getInstallmentTurn());
                cv.put("amount", newRow.getAmount());
                cv.put("remainder", newRow.getRemainder());
                cv.put("settlement_date", newRow.getSettlementDate().getTime());
                cv.put("paid", newRow.getPaid());
                cv.put("memo", newRow.getMemo());
                db.insert(DbConsts.TB_CARD_RECORD, null, cv);
            }

            db.close();
        } catch (Exception e) {

        }

        return true;
    }

    @Override
    public int deleteRow(Long id) {
        H2Database db = opener.getWritableDatabase();
        int result = db.delete(DbConsts.TB_CARD_RECORD, "id = " + id, null);
        db.close();

        return result;
    }

    @Override
    public int deleteRow(CardRecord aRow) {
        return deleteRow(aRow.getId());
    }

}
