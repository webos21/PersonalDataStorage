package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.RealEstate;

import java.util.List;

public interface RealEstateRepo {

    List<RealEstate> findRows();

    List<RealEstate> findRows(String keyString);

    RealEstate getRow(Long id);

    RealEstate getRow(RealEstate aRow);

    boolean updateRow(RealEstate newRow);

    int deleteRow(Long id);

    int deleteRow(RealEstate aRow);

}
