package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Titles;

import java.util.List;

public interface TitlesRepo {

    List<Titles> findRows();

    List<Titles> findRows(String keyString);

    Titles getRow(Long id);

    Titles getRow(Titles aRow);

    boolean updateRow(Titles newRow);

    int deleteRow(Long id);

    int deleteRow(Titles aRow);

}
