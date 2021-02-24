package com.gmail.webos21.pds.db.test;

import java.util.Date;

import com.gmail.webos21.pds.db.DbConsts;

public class DateFormatTest {

	public void testSDF() throws Exception {
		int year = 2021;
		int month = 12;

		Date sdate = DbConsts.SDF_DATE.parse(String.format("%04d-%02d-%02d", year, month, 1));
		Date edate = DbConsts.SDF_DATE.parse(String.format("%04d-%02d-%02d", year, (month + 1), 1));

		System.out.println("sdate = " + sdate + " / edate = " + edate);
	}

	public static void main(String[] args) {
		try {
			DateFormatTest dft = new DateFormatTest();
			dft.testSDF();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
