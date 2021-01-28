package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.AddressBook;

import java.util.List;

public interface AddressBookRepo {

    List<AddressBook> findRows();

    List<AddressBook> findRows(String keyString);

    AddressBook getRow(Long id);

    AddressBook getRow(AddressBook aRow);

    boolean updateRow(AddressBook newRow);

    int deleteRow(Long id);

    int deleteRow(AddressBook aRow);

}
