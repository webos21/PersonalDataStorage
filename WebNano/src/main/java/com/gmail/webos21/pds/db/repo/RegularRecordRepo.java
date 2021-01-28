package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.RegularRecord;

import java.util.List;

public interface RegularRecordRepo {

    List<RegularRecord> findRows();

    List<RegularRecord> findRows(String keyString);

    RegularRecord getRow(Long id);

    RegularRecord getRow(RegularRecord aRow);

    boolean updateRow(RegularRecord newRow);

    int deleteRow(Long id);

    int deleteRow(RegularRecord aRow);

}
