package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Record;

import java.util.List;

public interface RecordRepo {

    List<Record> findRows();

    List<Record> findRows(String keyString);

    List<Record> findRows(int year, int month);

    Record getRow(Long id);

    Record getRow(Record aRow);

    boolean updateRow(Record newRow);

    int deleteRow(Long id);

    int deleteRow(Record aRow);

}
