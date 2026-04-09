package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Insurance;

import java.util.List;

public interface InsuranceRepo {

    List<Insurance> findRows();

    List<Insurance> findRows(String keyString);

    Insurance getRow(Long id);

    Insurance getRow(Insurance aRow);

    boolean updateRow(Insurance newRow);

    int deleteRow(Long id);

    int deleteRow(Insurance aRow);

}
