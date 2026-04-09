package com.gmail.webos21.pds.web.handler;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import com.gmail.webos21.calendar.KoreanLunarCalendar;
import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;
import com.gmail.webos21.nano.NanoHTTPD.Response.Status;
import com.gmail.webos21.nano.RouteResult;
import com.gmail.webos21.nano.UriHandler;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.domain.Anniversary;
import com.gmail.webos21.pds.db.repo.AnniversaryRepo;

public class AnniversaryHandler implements UriHandler {

	private AnniversaryRepo anniRepo;

	public AnniversaryHandler() {
		PdsDbManager pdb = PdsDbManager.getInstance();
		anniRepo = pdb.getRepository(AnniversaryRepo.class);
	}

	@Override
	public RouteResult process(Map<String, String> headers, IHTTPSession session, String uri,
			Map<String, String> files) {
		System.out.println("\n=========================================\n");
		System.out.println("Response) " + session.getMethod() + " " + uri);

		RouteResult ba = WebHelper.checkBasicAuth(headers);
		if (ba != null) {
			return ba;
		}

		switch (session.getMethod()) {
		case POST:
			return processPost(headers, session, uri, files);
		case GET:
			return processGet(headers, session, uri, files);
		case PUT:
			return processPut(headers, session, uri, files);
		case DELETE:
			return processDelete(headers, session, uri);
		case OPTIONS: // WebHelper.chkAuth is handling!!
		default:
			return WebHelper.processSimple(headers.get("origin"), Status.METHOD_NOT_ALLOWED);
		}
	}

	private RouteResult processDelete(Map<String, String> headers, IHTTPSession session, String uri) {
		String origin = headers.get("origin");

		@SuppressWarnings("deprecation")
		Map<String, String> params = session.getParms();

		for (String key : params.keySet()) {
			System.out.println(key + " = " + params.get(key));
		}

		String anniId = params.get("anniId");
		int deletedRows = anniRepo.deleteRow(Long.parseLong(anniId));

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

		@SuppressWarnings("deprecation")
		Map<String, String> params = session.getParms();

		for (String key : params.keySet()) {
			System.out.println(key + " = " + params.get(key));
		}

		String anniId = params.get("anniId");
		String title = params.get("title");
		String adate = params.get("adate");
		String lunar = params.get("lunar");
		String holiday = params.get("holiday");

		Anniversary aRow = new Anniversary(Long.parseLong(anniId), title, adate, Integer.parseInt(lunar),
				Integer.parseInt(holiday));
		anniRepo.updateRow(aRow);

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

		@SuppressWarnings("deprecation")
		Map<String, String> params = session.getParms();

		for (String key : params.keySet()) {
			System.out.println(key + " = " + params.get(key));
		}

		String title = params.get("title");
		String adate = params.get("adate");
		String lunar = params.get("lunar");
		String holiday = params.get("holiday");

		Anniversary aRow = new Anniversary(null, title, adate, Integer.parseInt(lunar), Integer.parseInt(holiday));
		anniRepo.updateRow(aRow);

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

		List<Anniversary> rows = null;
		if (session.getParameters().get("q") != null) {
			String q = session.getParameters().get("q").get(0);
			if (q != null && q.length() > 0) {
				rows = anniRepo.findRows(session.getParameters().get("q").get(0));
			}
		}
		if (rows == null) {
			rows = anniRepo.findRows();
		}

		int year = -1;
		if (session.getParameters().get("year") != null) {
			year = Integer.parseInt(session.getParameters().get("year").get(0));
		}
		if (year < 1391) {
			year = Calendar.getInstance().get(Calendar.YEAR);
		}

		StringBuilder sb = new StringBuilder();
		KoreanLunarCalendar klc = KoreanLunarCalendar.getInstance();

		sb.append("{\n");
		sb.append("  \"result\": \"OK\",\n");
		if (session.getParameters().get("page") != null && session.getParameters().get("perPage") != null) {
			int page = Integer.parseInt(session.getParameters().get("page").get(0));
			int perPage = Integer.parseInt(session.getParameters().get("perPage").get(0));
			int totalCount = rows.size();
			int totalPages = (totalCount % perPage == 0) ? (totalCount / perPage) : ((totalCount / perPage) + 1);

			sb.append("  \"pagination\": {\n");
			sb.append("    \"totalCount\": ").append(totalCount).append(",\n");
			sb.append("    \"totalPages\": ").append(totalPages).append(",\n");
			sb.append("    \"currentPage\": ").append(page).append("\n");
			sb.append("  },\n");

			sb.append("  \"data\": [\n");
			int i = 0;
			int offset = ((page - 1) * perPage);
			for (i = offset; (i < totalCount) && (i < (offset + perPage)); i++) {
				Anniversary r = rows.get(i);

				if (i > offset) {
					sb.append(',').append('\n');
				}

				String thisYear = null;
				int month = Integer.parseInt(r.getApplyDate().substring(0, 2));
				int day = Integer.parseInt(r.getApplyDate().substring(2, 4));
				if (r.getLunar() == 1) {
					klc.setLunarDate(year, month, day, false);
					thisYear = klc.getSolarIsoFormat();
				} else {
					thisYear = String.format("%04d-%02d-%02d", year, month, day);
				}

				sb.append('{').append('\n');
				sb.append("  \"id\": ").append(r.getId()).append(",\n");
				sb.append("  \"title\": \"").append(r.getTitle()).append("\",\n");
				sb.append("  \"applyDate\": \"").append(r.getApplyDate()).append("\",\n");
				sb.append("  \"lunar\": ").append(r.getLunar()).append(",\n");
				sb.append("  \"holiday\": ").append(r.getHoliday()).append(",\n");
				sb.append("  \"thisYear\": \"").append(thisYear).append("\"\n");
				sb.append('}').append('\n');

			}
		} else {
			sb.append("  \"data\": [\n");
			int i = 0;
			for (Anniversary r : rows) {
				if (i > 0) {
					sb.append(',').append('\n');
				}

				String thisYear = null;
				int month = Integer.parseInt(r.getApplyDate().substring(0, 2));
				int day = Integer.parseInt(r.getApplyDate().substring(2, 4));
				if (r.getLunar() == 1) {
					if (month == 12 && day == 31) {
						if (!klc.setLunarDate(year - 1, 12, 30, false)) {
							klc.setLunarDate(year - 1, 12, 29, false);
						}
					} else {
						klc.setLunarDate(year, month, day, false);
					}
					thisYear = klc.getSolarIsoFormat();
				} else {
					thisYear = String.format("%04d-%02d-%02d", year, month, day);
				}

				sb.append('{').append('\n');
				sb.append("  \"id\": ").append(r.getId()).append(",\n");
				sb.append("  \"title\": \"").append(r.getTitle()).append("\",\n");
				sb.append("  \"applyDate\": \"").append(r.getApplyDate()).append("\",\n");
				sb.append("  \"lunar\": ").append(r.getLunar()).append(",\n");
				sb.append("  \"holiday\": ").append(r.getHoliday()).append(",\n");
				sb.append("  \"thisYear\": \"").append(thisYear).append("\"\n");
				sb.append('}').append('\n');

				i++;
			}
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
