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
import com.gmail.webos21.pds.db.domain.Card;
import com.gmail.webos21.pds.db.repo.CardRepo;

public class CardHandler implements UriHandler {

	private CardRepo cardRepo;

	public CardHandler() {
		PdsDbManager pdb = PdsDbManager.getInstance();
		cardRepo = pdb.getRepository(CardRepo.class);
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

		String cardId = params.get("cardId");
		int deletedRows = cardRepo.deleteRow(Long.parseLong(cardId));

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

		String cardId = params.get("cardId");
		String company = params.get("company");
		String cardName = params.get("cardName");
		String cardNumber = params.get("cardNumber");
		String cardPassword = params.get("cardPassword");
		String validYear = params.get("validYear");
		String validMonth = params.get("validMonth");
		String chargeDate = params.get("chargeDate");
		String cvcNumber = params.get("cvcNumber");
		String bankId = params.get("bankId");
		String creditLimit = params.get("creditLimit");
		String cashAdvance = params.get("cashAdvance");
		String cardLoan = params.get("cardLoan");
		String issueDate = params.get("issueDate");
		String refreshNormal = params.get("refreshNormal");
		String refreshShort = params.get("refreshShort");
		String arrange = params.get("arrange");
		String memo = params.get("memo");

		Date iDate = null;
		try {
			iDate = DbConsts.SDF_DATE.parse(issueDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Card aRow = new Card(Long.parseLong(cardId), company, cardName, cardNumber, cardPassword,
				Integer.parseInt(validYear), Integer.parseInt(validMonth), Integer.parseInt(chargeDate),
				Integer.parseInt(cvcNumber), Long.parseLong(bankId), Long.parseLong(creditLimit),
				Long.parseLong(cashAdvance), Long.parseLong(cardLoan), iDate, Integer.parseInt(refreshNormal),
				Integer.parseInt(refreshShort), Long.parseLong(arrange), memo);
		cardRepo.updateRow(aRow);

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

		String company = params.get("company");
		String cardName = params.get("cardName");
		String cardNumber = params.get("cardNumber");
		String cardPassword = params.get("cardPassword");
		String validYear = params.get("validYear");
		String validMonth = params.get("validMonth");
		String chargeDate = params.get("chargeDate");
		String cvcNumber = params.get("cvcNumber");
		String bankId = params.get("bankId");
		String creditLimit = params.get("creditLimit");
		String cashAdvance = params.get("cashAdvance");
		String cardLoan = params.get("cardLoan");
		String issueDate = params.get("issueDate");
		String refreshNormal = params.get("refreshNormal");
		String refreshShort = params.get("refreshShort");
		String arrange = params.get("arrange");
		String memo = params.get("memo");

		Date iDate = null;
		try {
			iDate = DbConsts.SDF_DATE.parse(issueDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Card aRow = new Card(null, company, cardName, cardNumber, cardPassword, Integer.parseInt(validYear),
				Integer.parseInt(validMonth), Integer.parseInt(chargeDate), Integer.parseInt(cvcNumber),
				Long.parseLong(bankId), Long.parseLong(creditLimit), Long.parseLong(cashAdvance),
				Long.parseLong(cardLoan), iDate, Integer.parseInt(refreshNormal), Integer.parseInt(refreshShort),
				Long.parseLong(arrange), memo);
		cardRepo.updateRow(aRow);

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

		List<Card> rows = null;
		if (session.getParameters().get("q") != null) {
			String q = session.getParameters().get("q").get(0);
			if (q != null && q.length() > 0) {
				rows = cardRepo.findRows(session.getParameters().get("q").get(0));
			}
		}
		if (rows == null) {
			rows = cardRepo.findRows();
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
				Card r = rows.get(i);

				if (i > offset) {
					sb.append(',').append('\n');
				}

				sb.append(r.toJson());
			}
		} else {
			sb.append("  \"data\": [\n");
			int i = 0;
			for (Card r : rows) {
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
