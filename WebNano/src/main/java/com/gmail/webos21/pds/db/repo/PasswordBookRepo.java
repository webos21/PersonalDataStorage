package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.PasswordBook;

import java.util.List;

public interface PasswordBookRepo {

    List<PasswordBook> findRows();
    List<PasswordBook> findRows(String keyString);
    PasswordBook getRow(Long id);
    PasswordBook getRow(PasswordBook aRow);
    boolean updateRow(PasswordBook newRow);
    int deleteRow(Long id);
    int deleteRow(PasswordBook aRow);

}
