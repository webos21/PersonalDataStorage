package com.gmail.webos21.pds.web.handler;

import java.util.Map;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;
import com.gmail.webos21.nano.NanoHTTPD.Response.Status;
import com.gmail.webos21.nano.RouteResult;
import com.gmail.webos21.nano.UriHandler;

public class AuthHandler implements UriHandler {

	private String accessCode;

	public AuthHandler(String accessCode) {
		this.accessCode = accessCode;
	}

	@Override
	public RouteResult process(Map<String, String> headers, IHTTPSession session, String uri,
			Map<String, String> files) {
		System.out.println("\n=========================================\n");
		System.out.println("Response) " + session.getMethod() + " " + uri);

		switch (session.getMethod()) {
		case OPTIONS:
			return WebHelper.processSimple(headers.get("origin"), Status.OK);
		case POST:
			return processPost(headers, session, uri, files);
		case GET:
			return processGet(headers, session, uri, files);
		case PUT:
			return processPut(headers, session, uri, files);
		case DELETE:
			return processDelete(headers, session, uri);
		default:
			return WebHelper.processSimple(headers.get("origin"), Status.METHOD_NOT_ALLOWED);
		}
	}

	private RouteResult processDelete(Map<String, String> headers, IHTTPSession session, String uri) {
		return WebHelper.processSimple(headers.get("origin"), Status.BAD_REQUEST);
	}

	private RouteResult processPut(Map<String, String> headers, NanoHTTPD.IHTTPSession session, String uri,
			Map<String, String> files) {
		return WebHelper.processSimple(headers.get("origin"), Status.BAD_REQUEST);
	}

	private RouteResult processPost(Map<String, String> headers, NanoHTTPD.IHTTPSession session, String uri,
			Map<String, String> files) {

		StringBuilder sb = new StringBuilder();

		@SuppressWarnings("deprecation")
		Map<String, String> parms = session.getParms();
		String pbpwd = parms.get("pbpwd");
		String origin = headers.get("origin");

		RouteResult rr = null;
		if (accessCode.equals(pbpwd)) {
			sb.append("{\n");
			sb.append("  \"result\": \"OK\",\n");
			sb.append("  \"auth\": {\n");
			sb.append("    \"ckey\": \"X-PDS-AUTH\",\n");
			sb.append("    \"cval\": \"" + accessCode + "\"\n");
			sb.append("  }\n");
			sb.append("}\n");

			rr = RouteResult.newRouteResult(Status.OK, "application/json", sb.toString());
			rr.addHeader("Set-Cookies", "X-PDS-AUTH=" + accessCode + "; SameSite=None; Secure");
		} else {
			sb.append("{\n");
			sb.append("  \"result\": \"FAIL\"\n");
			sb.append("}\n");
			rr = RouteResult.newRouteResult(Status.UNAUTHORIZED, "application/json", sb.toString());
			rr.addHeader("Set-Cookies", "X-PDS-AUTH=; SameSite=None; Secure");
		}

		WebHelper.addCorsHeader(origin, rr);

		RouteResult.print(rr);
		System.out.println(sb.toString());

		return rr;
	}

	private RouteResult processGet(Map<String, String> headers, IHTTPSession session, String uri,
			Map<String, String> files) {
		return WebHelper.processSimple(headers.get("origin"), Status.BAD_REQUEST);
	}

}
