package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Schedule;

import java.util.List;

public interface ScheduleRepo {

    List<Schedule> findRows();

    List<Schedule> findRows(String keyString);

    List<Schedule> findRows(int year, int month);

    Schedule getRow(Long id);

    Schedule getRow(Schedule aRow);

    boolean updateRow(Schedule newRow);

    int deleteRow(Long id);

    int deleteRow(Schedule aRow);

}
