package com.gmail.webos21.pds.web.log;

public class ConsoleLog implements UiLog {

	@Override
	public void log(String msg) {
		System.out.println(msg);
	}

}
