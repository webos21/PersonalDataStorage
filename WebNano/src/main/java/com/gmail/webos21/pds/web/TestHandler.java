package com.gmail.webos21.pds.web;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;
import com.gmail.webos21.nano.NanoHTTPD.Response.Status;
import com.gmail.webos21.nano.RouteResult;
import com.gmail.webos21.nano.UriHandler;
import com.gmail.webos21.pds.web.h2.H2Helper;

import java.sql.Connection;
import java.util.Map;

public class TestHandler implements UriHandler {

    private static final String JDBC_URL = "jdbc:h2:~/test;CIPHER=AES";
    private static final String USER = "sa";
    private static final String PASS = "filekey sa";

    public TestHandler() {

    }

    @Override
    public RouteResult process(Map<String, String> headers, IHTTPSession session, String uri,
                               Map<String, String> files) {
        System.out.println("URI : " + uri);

        int dbVersion = -1;
        Connection conn = H2Helper.getConnection(JDBC_URL, USER, PASS);
        if (conn != null) {
            dbVersion = H2Helper.getVersion(conn);
            System.out.println("DB Version = " + dbVersion);
            H2Helper.releaseConnection(conn);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("<!doctype html><html lang=\"ko\"><head><title>Dynamic Test</title>");
        sb.append("<body>Hello World!!<br/>");
        sb.append("DB Version : ").append(dbVersion);
        sb.append("</body></html>");

        return RouteResult.newRouteResult(Status.OK, NanoHTTPD.MIME_HTML, sb.toString());
    }

}
