package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.InsuranceRecord;

import java.util.List;

public interface InsuranceRecordRepo {

    List<InsuranceRecord> findRows();

    List<InsuranceRecord> findRows(String keyString);

    InsuranceRecord getRow(Long id);

    InsuranceRecord getRow(InsuranceRecord aRow);

    boolean updateRow(InsuranceRecord newRow);

    int deleteRow(Long id);

    int deleteRow(InsuranceRecord aRow);

}
