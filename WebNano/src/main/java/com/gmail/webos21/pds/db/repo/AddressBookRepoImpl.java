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
			ResultSet rset = db.rawQuery( // indent
					/* intent -------- */ "SELECT id, full_name, mobile, category, " + // indent
					/* intent -------- */ "       telephone, fax, email, homepage, " + // indent
					/* intent -------- */ "       postcode, address, memo " + // indent
					/* intent -------- */ "  FROM " + DbConsts.TB_ADDRESSBOOK, // indent
					null);
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				AddressBook aRow = new AddressBook( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* full_name ------ */rset.getString(2), // indent
						/* mobile --------- */rset.getString(3), // indent
						/* category ------- */rset.getString(4), // indent
						/* telephone ------ */rset.getString(5), // indent
						/* fax ------------ */rset.getString(6), // indent
						/* email ---------- */rset.getString(7), // indent
						/* homepage ------- */rset.getString(8), // indent
						/* postcode ------- */rset.getString(9), // indent
						/* address -------- */rset.getString(10), // indent
						/* memo ----------- */rset.getString(11)); // indent
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
			ResultSet rset = db.rawQuery( // indent
					/* intent -------- */ "SELECT id, full_name, mobile, category, " + // indent
					/* intent -------- */ "       telephone, fax, email, homepage, " + // indent
					/* intent -------- */ "       postcode, address, memo " + // indent
					/* intent -------- */ "  FROM " + DbConsts.TB_ADDRESSBOOK + " " + // indent
					/* intent -------- */ " WHERE (full_name LIKE ?) OR " + // indent
					/* intent -------- */ "       (category LIKE ?) OR " + // indent
					/* intent -------- */ "       (mobile LIKE ?) OR " + // indent
					/* intent -------- */ "       (email LIKE ?) OR " + // indent
					/* intent -------- */ "       (homepage LIKE ?) OR " + // indent
					/* intent -------- */ "       (address LIKE ?) OR " + // indent
					/* intent -------- */ "       (memo LIKE ?)", // indent
					new String[] { "%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%",
							"%" + keyString + "%", "%" + keyString + "%", "%" + keyString + "%",
							"%" + keyString + "%" });
			if (rset == null || !rset.first()) {
				return aList;
			}

			do {
				AddressBook aRow = new AddressBook( // indent
						/* id ------------- */rset.getLong(1), // indent
						/* full_name ------ */rset.getString(2), // indent
						/* mobile --------- */rset.getString(3), // indent
						/* category ------- */rset.getString(4), // indent
						/* telephone ------ */rset.getString(5), // indent
						/* fax ------------ */rset.getString(6), // indent
						/* email ---------- */rset.getString(7), // indent
						/* homepage ------- */rset.getString(8), // indent
						/* postcode ------- */rset.getString(9), // indent
						/* address -------- */rset.getString(10), // indent
						/* memo ----------- */rset.getString(11)); // indent
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
			ResultSet rset = db.rawQuery( // indent
					/* intent -------- */ "SELECT id, full_name, mobile, category, " + // indent
					/* intent -------- */ "       telephone, fax, email, homepage, " + // indent
					/* intent -------- */ "       postcode, address, memo " + // indent
					/* intent -------- */ " FROM " + DbConsts.TB_ADDRESSBOOK + // indent
					/* intent -------- */ " WHERE id = " + id, null);
			if (rset == null || !rset.first()) {
				return null;
			}

			aRow = new AddressBook( // indent
					/* id ------------- */rset.getLong(1), // indent
					/* full_name ------ */rset.getString(2), // indent
					/* mobile --------- */rset.getString(3), // indent
					/* category ------- */rset.getString(4), // indent
					/* telephone ------ */rset.getString(5), // indent
					/* fax ------------ */rset.getString(6), // indent
					/* email ---------- */rset.getString(7), // indent
					/* homepage ------- */rset.getString(8), // indent
					/* postcode ------- */rset.getString(9), // indent
					/* address -------- */rset.getString(10), // indent
					/* memo ----------- */rset.getString(11)); // indent
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
				rset = db.rawQuery( // indent
						/* intent -------- */ "SELECT id, full_name, mobile, category, " + // indent
						/* intent -------- */ "       telephone, fax, email, homepage, " + // indent
						/* intent -------- */ "       postcode, address, memo " + // indent
						/* intent -------- */ "  FROM " + DbConsts.TB_ADDRESSBOOK + // indent
						/* intent -------- */ " WHERE id = " + newRow.getId(), null); // indent
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
					db.update(DbConsts.TB_ADDRESSBOOK, cv, " id = ? ", new String[] { Long.toString(newRow.getId()) });
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
