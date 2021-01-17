package com.gmail.webos21.pds.db.test;

import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.repo.PbRepo;

public class PdsDbManagerTest {

	public void testRepository() {
		PdsDbManager m = PdsDbManager.getInstance();
		m.open(DbConsts.DB_PATH, DbConsts.DB_USER, DbConsts.DB_PASS, DbConsts.DB_OPTS, DbConsts.DB_VERSION);

		PbRepo repo = PdsDbManager.getInstance().getRepository(PbRepo.class);
		System.out.println("PbRepo = " + repo);
	}

	public static void main(String[] args) {
		PdsDbManagerTest t = new PdsDbManagerTest();
		t.testRepository();
	}
}
