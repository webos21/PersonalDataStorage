package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Bank;

import java.util.List;

public interface BankRepo {

    List<Bank> findRows();

    List<Bank> findRows(String keyString);

    Bank getRow(Long id);

    Bank getRow(Bank aRow);

    boolean updateRow(Bank newRow);

    int deleteRow(Long id);

    int deleteRow(Bank aRow);

}
