package com.gmail.webos21.pds.db.repo;

import com.gmail.webos21.pds.db.domain.Card;

import java.util.List;

public interface CardRepo {

    List<Card> findRows();

    List<Card> findRows(String keyString);

    Card getRow(Long id);

    Card getRow(Card aRow);

    boolean updateRow(Card newRow);

    int deleteRow(Long id);

    int deleteRow(Card aRow);

}
