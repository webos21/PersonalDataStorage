package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.PbRow;

import java.util.List;

public interface PbRepo {

    List<PbRow> findRows();
    List<PbRow> findRows(String keyString);
    PbRow getRow(Long id);
    PbRow getRow(PbRow aRow);
    boolean updateRow(PbRow newRow);
    int deleteRow(Long id);
    int deleteRow(PbRow aRow);

}
