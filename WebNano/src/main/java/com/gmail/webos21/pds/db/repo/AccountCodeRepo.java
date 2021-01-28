package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.AccountCode;

import java.util.List;

public interface AccountCodeRepo {

    List<AccountCode> findRows();

    List<AccountCode> findRows(String keyString);

    AccountCode getRow(Long id);

    AccountCode getRow(AccountCode aRow);

    boolean updateRow(AccountCode newRow);

    int deleteRow(Long id);

    int deleteRow(AccountCode aRow);

}
