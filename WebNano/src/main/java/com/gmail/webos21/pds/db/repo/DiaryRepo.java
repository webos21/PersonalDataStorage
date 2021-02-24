package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Diary;

import java.util.List;

public interface DiaryRepo {

    List<Diary> findRows();

    List<Diary> findRows(String keyString);

    List<Diary> findRows(int year, int month);

    Diary getRow(Long id);

    Diary getRow(Diary aRow);

    boolean updateRow(Diary newRow);

    int deleteRow(Long id);

    int deleteRow(Diary aRow);

}
