package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Stock;

import java.util.List;

public interface StockRepo {

    List<Stock> findRows();

    List<Stock> findRows(String keyString);

    Stock getRow(Long id);

    Stock getRow(Stock aRow);

    boolean updateRow(Stock newRow);

    int deleteRow(Long id);

    int deleteRow(Stock aRow);

}
