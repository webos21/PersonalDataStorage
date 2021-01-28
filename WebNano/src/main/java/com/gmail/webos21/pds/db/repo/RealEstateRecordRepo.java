package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.RealEstateRecord;

import java.util.List;

public interface RealEstateRecordRepo {

    List<RealEstateRecord> findRows();

    List<RealEstateRecord> findRows(String keyString);

    RealEstateRecord getRow(Long id);

    RealEstateRecord getRow(RealEstateRecord aRow);

    boolean updateRow(RealEstateRecord newRow);

    int deleteRow(Long id);

    int deleteRow(RealEstateRecord aRow);

}
