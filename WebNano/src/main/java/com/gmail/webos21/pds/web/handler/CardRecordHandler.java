package com.gmail.webos21.pds.web.handler;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;
import com.gmail.webos21.nano.NanoHTTPD.Response.Status;
import com.gmail.webos21.nano.RouteResult;
import com.gmail.webos21.nano.UriHandler;
import com.gmail.webos21.pds.db.DbConsts;
import com.gmail.webos21.pds.db.PdsDbManager;
import com.gmail.webos21.pds.db.domain.CardRecord;
import com.gmail.webos21.pds.db.repo.CardRecordRepo;

public class CardRecordHandler implements UriHandler {

	private CardRecordRepo crRepo;

	public CardRecordHandler() {
		PdsDbManager pdb = PdsDbManager.getInstance();
		crRepo = pdb.getRepository(CardRecordRepo.class);
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

		String crId = params.get("crId");
		int deletedRows = crRepo.deleteRow(Long.parseLong(crId));

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

		String crId = params.get("crId");
		String cardId = params.get("cardId");
		String transactionDate = params.get("transactionDate");
		String title = params.get("title");
		String price = params.get("price");
		String commission = params.get("commission");
		String installment = params.get("installment");
		String installmentId = params.get("installmentId");
		String installmentTurn = params.get("installmentTurn");
		String amount = params.get("amount");
		String remainder = params.get("remainder");
		String settlementDate = params.get("settlementDate");
		String paid = params.get("paid");
		String memo = params.get("memo");

		Date td = null;
		Date sd = null;
		try {
			td = DbConsts.SDF_DATE.parse(transactionDate);
			sd = DbConsts.SDF_DATE.parse(settlementDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		CardRecord aRow = new CardRecord(Long.parseLong(crId), Long.parseLong(cardId), td, title, Long.parseLong(price),
				Long.parseLong(commission), Integer.parseInt(installment), Long.parseLong(installmentId),
				Integer.parseInt(installmentTurn), Long.parseLong(amount), Long.parseLong(remainder), sd,
				Integer.parseInt(paid), memo);
		crRepo.updateRow(aRow);

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

		String cardId = params.get("cardId");
		String transactionDate = params.get("transactionDate");
		String title = params.get("title");
		String price = params.get("price");
		String commission = params.get("commission");
		String installment = params.get("installment");
		String installmentId = params.get("installmentId");
		String installmentTurn = params.get("installmentTurn");
		String amount = params.get("amount");
		String remainder = params.get("remainder");
		String settlementDate = params.get("settlementDate");
		String paid = params.get("paid");
		String memo = params.get("memo");

		Date td = null;
		Date sd = null;
		try {
			td = DbConsts.SDF_DATE.parse(transactionDate);
			sd = DbConsts.SDF_DATE.parse(settlementDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		CardRecord aRow = new CardRecord(null, Long.parseLong(cardId), td, title, Long.parseLong(price),
				Long.parseLong(commission), Integer.parseInt(installment), Long.parseLong(installmentId),
				Integer.parseInt(installmentTurn), Long.parseLong(amount), Long.parseLong(remainder), sd,
				Integer.parseInt(paid), memo);
		crRepo.updateRow(aRow);

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

		List<CardRecord> rows = null;
		if (session.getParameters().get("q") != null) {
			String q = session.getParameters().get("q").get(0);
			if (q != null && q.length() > 0) {
				rows = crRepo.findRows(session.getParameters().get("q").get(0));
			}
		}
		if (rows == null) {
			rows = crRepo.findRows();
		}

		StringBuilder sb = new StringBuilder();

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
				CardRecord r = rows.get(i);

				if (i > offset) {
					sb.append(',').append('\n');
				}

				sb.append(r.toJson());
			}
		} else {
			sb.append("  \"data\": [\n");
			int i = 0;
			for (CardRecord r : rows) {
				if (i > 0) {
					sb.append(',').append('\n');
				}
				sb.append(r.toJson());
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
