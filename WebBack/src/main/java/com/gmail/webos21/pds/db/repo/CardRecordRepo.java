package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.CardRecord;

import java.util.List;

public interface CardRecordRepo {

    List<CardRecord> findRows();

    List<CardRecord> findRows(String keyString);

    CardRecord getRow(Long id);

    CardRecord getRow(CardRecord aRow);

    boolean updateRow(CardRecord newRow);

    int deleteRow(Long id);

    int deleteRow(CardRecord aRow);

}
