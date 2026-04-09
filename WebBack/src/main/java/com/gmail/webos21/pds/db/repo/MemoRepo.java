package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Memo;

import java.util.List;

public interface MemoRepo {

    List<Memo> findRows();

    List<Memo> findRows(String keyString);

    Memo getRow(Long id);

    Memo getRow(Memo aRow);

    boolean updateRow(Memo newRow);

    int deleteRow(Long id);

    int deleteRow(Memo aRow);

}
