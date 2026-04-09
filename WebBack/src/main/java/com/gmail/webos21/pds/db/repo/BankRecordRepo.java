package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.BankRecord;

import java.util.List;

public interface BankRecordRepo {

    List<BankRecord> findRows();

    List<BankRecord> findRows(String keyString);

    BankRecord getRow(Long id);

    BankRecord getRow(BankRecord aRow);

    boolean updateRow(BankRecord newRow);

    int deleteRow(Long id);

    int deleteRow(BankRecord aRow);

}
