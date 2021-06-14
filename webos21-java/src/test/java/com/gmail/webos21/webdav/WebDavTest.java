package com.gmail.webos21.webdav;

import java.io.File;
import java.io.IOException;

import org.junit.Test;

import com.gmail.webos21.nano.NanoHTTPD;

public class WebDavTest {

	private static final String HOST = "0.0.0.0";
	private static final int PORT = 18080;
	private static final File ROOT = new File("/Users/jocheolmin");
	private static final boolean QUIET = false;
	private static final boolean DAEMON = false;

	@Test
	public void testSimple() throws IOException {
		WebDavServer wds = new WebDavServer(HOST, PORT, ROOT, QUIET);
		wds.start(NanoHTTPD.SOCKET_READ_TIMEOUT, DAEMON);
	}

	public static void main(String[] args) {
		try {
			WebDavTest wdt = new WebDavTest();
			wdt.testSimple();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
