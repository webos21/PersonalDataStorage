package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Anniversary;

import java.util.List;

public interface AnniversaryRepo {

    List<Anniversary> findRows();

    List<Anniversary> findRows(String keyString);

    Anniversary getRow(Long id);

    Anniversary getRow(Anniversary aRow);

    boolean updateRow(Anniversary newRow);

    int deleteRow(Long id);

    int deleteRow(Anniversary aRow);

}
