package com.gmail.webos21.pds.web.handler;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.gmail.webos21.crypto.Base64;
import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;
import com.gmail.webos21.nano.NanoHTTPD.Response.Status;
import com.gmail.webos21.nano.RouteResult;
import com.gmail.webos21.nano.UriHandler;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.domain.Diary;
import com.gmail.webos21.pds.db.repo.DiaryRepo;

public class DiaryHandler implements UriHandler {

	private DiaryRepo diaryRepo;

	public DiaryHandler() {
		PdsDbManager pdb = PdsDbManager.getInstance();
		diaryRepo = pdb.getRepository(DiaryRepo.class);
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

		@SuppressWarnings("deprecation")
		Map<String, String> params = session.getParms();

		for (String key : params.keySet()) {
			System.out.println(key + " = " + params.get(key));
		}

		String siteId = params.get("siteId");
		int deletedRows = diaryRepo.deleteRow(Long.parseLong(siteId));

		StringBuilder sb = new StringBuilder();

		sb.append("{\n");
		sb.append("  \"result\": \"OK\",\n");
		sb.append("  \"deletedRows\": ").append(deletedRows);
		sb.append("}\n");

		RouteResult rr = RouteResult.newRouteResult(Status.OK, "application/json", sb.toString());
		WebHelper.addCorsHeader(origin, rr);

		RouteResult.print(rr);
		System.out.println(sb.toString());

		return rr;
	}

	private RouteResult processPut(Map<String, String> headers, NanoHTTPD.IHTTPSession session, String uri,
			Map<String, String> files) {
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

		@SuppressWarnings("deprecation")
		Map<String, String> params = session.getParms();

		for (String key : params.keySet()) {
			System.out.println(key + " = " + params.get(key));
		}

		String diaryId = params.get("diaryId");
		String wdate = params.get("wdate");
		String weather = params.get("weather");
		String title = params.get("title");
		String content = params.get("content");

		Date wd = null;
		try {
			wd = DbConsts.SDF_DATE.parse(wdate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Diary aRow = new Diary(Long.parseLong(diaryId), wd.getTime(), Integer.parseInt(weather), title, content);
		diaryRepo.updateRow(aRow);

		StringBuilder sb = new StringBuilder();

		sb.append("{\n");
		sb.append("  \"result\": \"OK\",\n");
		sb.append("  \"data\": [\n");
		sb.append(aRow.toJson());
		sb.append("  ]\n");
		sb.append("}\n");

		RouteResult rr = RouteResult.newRouteResult(Status.OK, "application/json", sb.toString());
		WebHelper.addCorsHeader(origin, rr);

		RouteResult.print(rr);
		System.out.println(sb.toString());

		return rr;
	}

	private RouteResult processPost(Map<String, String> headers, NanoHTTPD.IHTTPSession session, String uri,
			Map<String, String> files) {
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

		@SuppressWarnings("deprecation")
		Map<String, String> params = session.getParms();

		for (String key : params.keySet()) {
			System.out.println(key + " = " + params.get(key));
		}

		String wdate = params.get("wdate");
		String weather = params.get("weather");
		String title = params.get("title");
		String content = params.get("content");

		Date wd = null;
		try {
			wd = DbConsts.SDF_DATE.parse(wdate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Diary aRow = new Diary(null, wd.getTime(), Integer.parseInt(weather), title, content);
		diaryRepo.updateRow(aRow);

		StringBuilder sb = new StringBuilder();

		sb.append("{\n");
		sb.append("  \"result\": \"OK\",\n");
		sb.append("  \"data\": [\n");
		sb.append(aRow.toJson());
		sb.append("  ]\n");
		sb.append("}\n");

		RouteResult rr = RouteResult.newRouteResult(Status.OK, "application/json", sb.toString());
		WebHelper.addCorsHeader(origin, rr);

		RouteResult.print(rr);
		System.out.println(sb.toString());

		return rr;
	}

	private RouteResult processGet(Map<String, String> headers, IHTTPSession session, String uri,
			Map<String, String> files) {
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

		@SuppressWarnings("deprecation")
		String keyword = session.getParms().get("q");

		StringBuilder sb = new StringBuilder();

		sb.append("{\n");
		sb.append("  \"result\": \"OK\",\n");
		sb.append("  \"data\": [\n");

		List<Diary> rows = null;
		if (keyword != null && keyword.length() > 0) {
			rows = diaryRepo.findRows(keyword);
		} else {
			rows = diaryRepo.findRows();
		}

		int i = 0;
		for (Diary r : rows) {
			if (i > 0) {
				sb.append(',').append('\n');
			}
			sb.append(r.toJson());
			i++;
		}

		sb.append("  ]\n");
		sb.append("}\n");

		RouteResult rr = RouteResult.newRouteResult(Status.OK, "application/json", sb.toString());
		WebHelper.addCorsHeader(origin, rr);

		RouteResult.print(rr);
		System.out.println(sb.toString());

		return rr;
	}

}
