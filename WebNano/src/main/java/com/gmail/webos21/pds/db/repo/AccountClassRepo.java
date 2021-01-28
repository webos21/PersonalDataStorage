package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.AccountClass;

import java.util.List;

public interface AccountClassRepo {

    List<AccountClass> findRows();

    List<AccountClass> findRows(String keyString);

    AccountClass getRow(Long id);

    AccountClass getRow(AccountClass aRow);

    boolean updateRow(AccountClass newRow);

    int deleteRow(Long id);

    int deleteRow(AccountClass aRow);

}
