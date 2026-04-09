package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.RegularPay;

import java.util.List;

public interface RegularPayRepo {

    List<RegularPay> findRows();

    List<RegularPay> findRows(String keyString);

    RegularPay getRow(Long id);

    RegularPay getRow(RegularPay aRow);

    boolean updateRow(RegularPay newRow);

    int deleteRow(Long id);

    int deleteRow(RegularPay aRow);

}
