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
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, card_id, transaction_date, title, price, commission," + // indent
					/* indent -------- */ "       installment, installment_id, installment_turn,  " + // indent
					/* indent -------- */ "       amount, remainder, settlement_date, paid, memo  " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_CARD_RECORD + // indent
					/* intent -------- */ " WHERE paid = 0 ", // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				CardRecord aRow = new CardRecord( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* card_id -------- */rset.getLong(2), // indent
						/* transaction_date */rset.getLong(3), // indent
						/* title ---------- */rset.getString(4), // indent
						/* price ---------- */rset.getLong(5), // indent
						/* commission ----- */rset.getLong(6), // indent
						/* installment ---- */rset.getInt(7), // indent
						/* installment_id - */rset.getLong(8), // indent
						/* installment_turn */rset.getInt(9), // indent
						/* amount --------- */rset.getLong(10), // indent
						/* remainder ------ */rset.getLong(11), // indent
						/* settlement_date- */rset.getLong(12), // indent
						/* paid ----------- */rset.getInt(13), // indent
						/* memo ----------- */rset.getString(14)); // indent
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
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, card_id, transaction_date, title, price, commission," + // indent
					/* indent -------- */ "       installment, installment_id, installment_turn,  " + // indent
					/* indent -------- */ "       amount, remainder, settlement_date, paid, memo  " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_CARD_RECORD + // indent
					/* intent -------- */ " WHERE paid = 0 AND " + // indent
					/* intent -------- */ "        ((title LIKE ?) OR (memo LIKE ?))", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				CardRecord aRow = new CardRecord( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* card_id -------- */rset.getLong(2), // indent
						/* transaction_date */rset.getLong(3), // indent
						/* title ---------- */rset.getString(4), // indent
						/* price ---------- */rset.getLong(5), // indent
						/* commission ----- */rset.getLong(6), // indent
						/* installment ---- */rset.getInt(7), // indent
						/* installment_id - */rset.getLong(8), // indent
						/* installment_turn */rset.getInt(9), // indent
						/* amount --------- */rset.getLong(10), // indent
						/* remainder ------ */rset.getLong(11), // indent
						/* settlement_date- */rset.getLong(12), // indent
						/* paid ----------- */rset.getInt(13), // indent
						/* memo ----------- */rset.getString(14)); // indent
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
			ResultSet rset = db.rawQuery( // indent
					/* indent -------- */ "SELECT id, card_id, transaction_date, title, price, commission," + // indent
					/* indent -------- */ "       installment, installment_id, installment_turn,  " + // indent
					/* indent -------- */ "       amount, remainder, settlement_date, paid, memo  " + // indent
					/* indent -------- */ "  FROM " + DbConsts.TB_CARD_RECORD + // indent
					/* indent -------- */ " WHERE id = " + id, // indent
					null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new CardRecord( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* card_id -------- */rset.getLong(2), // indent
					/* transaction_date */rset.getLong(3), // indent
					/* title ---------- */rset.getString(4), // indent
					/* price ---------- */rset.getLong(5), // indent
					/* commission ----- */rset.getLong(6), // indent
					/* installment ---- */rset.getInt(7), // indent
					/* installment_id - */rset.getLong(8), // indent
					/* installment_turn */rset.getInt(9), // indent
					/* amount --------- */rset.getLong(10), // indent
					/* remainder ------ */rset.getLong(11), // indent
					/* settlement_date- */rset.getLong(12), // indent
					/* paid ----------- */rset.getInt(13), // indent
					/* memo ----------- */rset.getString(14)); // indent
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
				rset = db.rawQuery( // indent
						/* indent -------- */ "SELECT id, card_id, transaction_date, title, price, commission," + // indent
						/* indent -------- */ "       installment, installment_id, installment_turn,  " + // indent
						/* indent -------- */ "       amount, remainder, settlement_date, paid, memo  " + // indent
						/* indent -------- */ "  FROM " + DbConsts.TB_CARD_RECORD + // indent
						/* indent -------- */ " WHERE id = " + newRow.getId(), // indent
						null);
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
					db.update(DbConsts.TB_CARD_RECORD, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
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
