package com.gmail.webos21.pds.web.handler;

import java.util.Map;

import com.gmail.webos21.crypto.Base64;
import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;
import com.gmail.webos21.nano.NanoHTTPD.Method;
import com.gmail.webos21.nano.NanoHTTPD.Response.IStatus;
import com.gmail.webos21.nano.NanoHTTPD.Response.Status;
import com.gmail.webos21.nano.RouteResult;

public class WebHelper {

	public static void addCorsHeader(String origin, RouteResult rr) {
		rr.addHeader("Access-Control-Allow-Origin", origin);
		rr.addHeader("Access-Control-Allow-Credentials", "true");
		rr.addHeader("Access-Control-Allow-Headers", "*");
		rr.addHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT,HEAD,OPTIONS");
		rr.addHeader("Access-Control-Max-Age", "86400");
	}

	public static RouteResult checkAuth(IHTTPSession session, String uri, String accessCode) {
		String origin = session.getHeaders().get("origin");
		if (Method.OPTIONS == session.getMethod()) {
			return processSimple(origin, Status.OK);
		}
		if (!uri.startsWith("/pds/v1")) {
			return null;
		}
		if (uri.startsWith("/pds/v1/fs")) {
			return checkFsAuth(session.getHeaders());
		}
		String auth = session.getHeaders().get("x-pds-auth");
		if (!uri.startsWith("/pds/v1/auth") && !accessCode.equals(auth)) {
			RouteResult rr = RouteResult.newRouteResult(Status.UNAUTHORIZED, NanoHTTPD.MIME_PLAINTEXT,
					"Unauthorized!!!");
			rr.addHeader("Set-Cookies", "X-PDS-AUTH=; SameSite=None; Secure");
			addCorsHeader(session.getHeaders().get("origin"), rr);
			return rr;
		}

		return null;
	}

	public static RouteResult checkFsAuth(Map<String, String> headers) {
		String origin = headers.get("origin");
		String authVal = headers.get("authorization");
		if (authVal == null) {
			return WebHelper.processAuth(origin, Status.UNAUTHORIZED);
		}
		String[] authArr = authVal.split(" ");
		if (authArr == null || authArr.length != 2) {
			return WebHelper.processAuth(origin, Status.UNAUTHORIZED);
		}

		String auth = new String(Base64.decode(authArr[1], Base64.DEFAULT));
		System.out.println("auth = " + auth);
		if (!"username:password".equals(auth)) {
			return WebHelper.processAuth(origin, Status.UNAUTHORIZED);
		}

		return null;
	}

	public static RouteResult processAuth(String origin, IStatus status) {
		StringBuilder sb = new StringBuilder();

		sb.append("<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\n");
		sb.append("<html><head>\n");
		sb.append("<title>401 Unauthorized</title>\n");
		sb.append("</head><body>\n");
		sb.append("<h1>Unauthorized</h1>\n");
		sb.append("<p>This server could not verify that you\n");
		sb.append("are authorized to access the document\n");
		sb.append("requested.  Either you supplied the wrong\n");
		sb.append("credentials (e.g., bad password), or your\n");
		sb.append("browser doesn't understand how to supply\n");
		sb.append("the credentials required.</p>\n");
		sb.append("</body></html>\\n");

		RouteResult rr = RouteResult.newRouteResult(status, "text/html", sb.toString());
		rr.addHeader("WWW-Authenticate", "Basic realm=\"Please Enter Password\"");
		addCorsHeader(origin, rr);

		RouteResult.print(rr);
		System.out.println(sb.toString());

		return rr;
	}

	public static RouteResult checkBasicAuth(Map<String, String> headers) {
		String origin = headers.get("origin");
		String authVal = headers.get("authorization");
		if (authVal == null) {
			return WebHelper.processSimple(origin, Status.UNAUTHORIZED);
		}
		String[] authArr = authVal.split(" ");
		if (authArr == null || authArr.length != 2) {
			return WebHelper.processSimple(origin, Status.UNAUTHORIZED);
		}

		String auth = new String(Base64.decode(authArr[1], Base64.DEFAULT));
		System.out.println("auth = " + auth);
		if (!"username:password".equals(auth)) {
			return WebHelper.processSimple(origin, Status.UNAUTHORIZED);
		}

		return null;
	}

	public static RouteResult processSimple(String origin, IStatus status) {
		StringBuilder sb = new StringBuilder();

		sb.append("{\n");
		sb.append("  \"result\": ").append(status.getRequestStatus()).append(",\n");
		sb.append("  \"description\": \"").append(status).append("\"\n");
		sb.append("}\n");

		RouteResult rr = RouteResult.newRouteResult(status, "application/json", sb.toString());
		addCorsHeader(origin, rr);

		RouteResult.print(rr);
		System.out.println(sb.toString());

		return rr;
	}

}
