package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.StockRecord;

import java.util.List;

public interface StockRecordRepo {

    List<StockRecord> findRows();

    List<StockRecord> findRows(String keyString);

    StockRecord getRow(Long id);

    StockRecord getRow(StockRecord aRow);

    boolean updateRow(StockRecord newRow);

    int deleteRow(Long id);

    int deleteRow(StockRecord aRow);

}
