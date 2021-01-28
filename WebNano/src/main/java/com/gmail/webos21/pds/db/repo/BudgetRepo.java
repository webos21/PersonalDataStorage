package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Budget;

import java.util.List;

public interface BudgetRepo {

    List<Budget> findRows();

    List<Budget> findRows(String keyString);

    Budget getRow(Long id);

    Budget getRow(Budget aRow);

    boolean updateRow(Budget newRow);

    int deleteRow(Long id);

    int deleteRow(Budget aRow);

}
