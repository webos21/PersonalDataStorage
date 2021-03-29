package com.gmail.webos21.pds.web;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.gmail.webos21.nano.DynamicRouter;
import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.RouteResult;
import com.gmail.webos21.nano.StaticRouter;
import com.gmail.webos21.pds.web.handler.AccountClassHandler;
import com.gmail.webos21.pds.web.handler.AccountCodeHandler;
import com.gmail.webos21.pds.web.handler.AddressBookHandler;
import com.gmail.webos21.pds.web.handler.AnniversaryHandler;
import com.gmail.webos21.pds.web.handler.AuthHandler;
import com.gmail.webos21.pds.web.handler.BankHandler;
import com.gmail.webos21.pds.web.handler.BankRecordHandler;
import com.gmail.webos21.pds.web.handler.DiaryHandler;
import com.gmail.webos21.pds.web.handler.FsHandler;
import com.gmail.webos21.pds.web.handler.MemoHandler;
import com.gmail.webos21.pds.web.handler.PasswordBookHandler;
import com.gmail.webos21.pds.web.handler.WebHelper;
import com.gmail.webos21.pds.web.log.UiLog;

public class PdsWebServer extends NanoHTTPD {

	private static final boolean DEBUG = true;

	private static final String QUERY_STRING_PARAMETER = "NanoHttpd.QUERY_STRING";

	private StaticRouter staticRouter;
	private DynamicRouter dynamicRouter;

	private UiLog logger;

	private Map<String, Boolean> whiteMap;
	private HttpNewClientListener cl;

	private String accessCode;

	public PdsWebServer(String ipaddr, int port, String otp, File wwwroot, File fsroot) throws IOException {
		super(ipaddr, port);

		this.accessCode = OnetimePass.encryptOtp(otp);

		staticRouter = new StaticRouter(wwwroot);
		dynamicRouter = new DynamicRouter();

		dynamicRouter.addDynamicPage("/pds/v1/auth", AuthHandler.class, accessCode);
		dynamicRouter.addDynamicPage("/pds/v1/fs", FsHandler.class, "/pds/v1/fs", fsroot);
		dynamicRouter.addDynamicPage("/pds/v1/accountClass", AccountClassHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/accountCode", AccountCodeHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/address", AddressBookHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/anniversary", AnniversaryHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/bank", BankHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/brecord", BankRecordHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/pwbook", PasswordBookHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/diary", DiaryHandler.class);
		dynamicRouter.addDynamicPage("/pds/v1/memo", MemoHandler.class);

		mimeTypes().put("xhtml", "application/xhtml+xml");
		mimeTypes().put("opf", "application/oebps-package+xml");
		mimeTypes().put("ncx", "application/xml");
		mimeTypes().put("epub", "application/epub+zip");
		mimeTypes().put("otf", "application/x-font-otf");
		mimeTypes().put("ttf", "application/x-font-ttf");
		mimeTypes().put("js", "application/javascript");
		mimeTypes().put("svg", "image/svg+xml");

		whiteMap = new HashMap<String, Boolean>();
	}

	public void setUiLog(UiLog logger) {
		this.logger = logger;
	}

	public void setClientListener(HttpNewClientListener cl) {
		this.cl = cl;
	}

	public void addWhiteList(String ip) {
		whiteMap.put(ip, true);
	}

	private void log(String msg) {
		if (DEBUG && logger != null) {
			logger.log(msg);
		}
	}

	@Override
	public Response serve(IHTTPSession session) {
		Map<String, String> files = new HashMap<String, String>();
		Method method = session.getMethod();
		if (Method.PUT.equals(method) || Method.POST.equals(method)) {
			try {
				session.parseBody(files);
			} catch (IOException ioe) {
				return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT,
						"SERVER INTERNAL ERROR: IOException: " + ioe.getMessage());
			} catch (ResponseException re) {
				return newFixedLengthResponse(re.getStatus(), NanoHTTPD.MIME_PLAINTEXT, re.getMessage());
			}
		}

		@SuppressWarnings("deprecation")
		Map<String, String> parms = session.getParms();
		parms.put(QUERY_STRING_PARAMETER, session.getQueryParameterString());

		Map<String, String> header = session.getHeaders();
		String uri = session.getUri();

		if (this.cl != null) {
			String rIp = session.getRemoteIpAddress();
			Boolean p = whiteMap.get(rIp);
			if (p == null || p == false) {
				if (cl != null) {
					cl.onNewClientRequest(rIp);
				}
				return newFixedLengthResponse(Response.Status.UNAUTHORIZED, NanoHTTPD.MIME_PLAINTEXT,
						"Granting is processing on App!!");
			}
		}

		RouteResult chkAuth = WebHelper.checkAuth(session, uri, accessCode);
		if (chkAuth != null) {
			return routeToResponse(chkAuth);
		}

		if (DEBUG) {
			log("\n\n" + session.getMethod() + " '" + uri + "' ");

			Iterator<String> e = header.keySet().iterator();
			while (e.hasNext()) {
				String value = e.next();
				log("  HDR: '" + value + "' = '" + header.get(value) + "'");
			}
			e = parms.keySet().iterator();
			while (e.hasNext()) {
				String value = e.next();
				log("  PRM: '" + value + "' = '" + parms.get(value) + "'");
			}
		}

		RouteResult res = dynamicRouter.route(header, session, uri, files);
		if (res == null) {
			StringBuilder sb = new StringBuilder();
			res = staticRouter.route(header, session, uri);
			RouteResult.print(res, sb);
			log(sb.toString());
		}

		return routeToResponse(res);
	}

	private Response routeToResponse(RouteResult res) {
		Response response = newFixedLengthResponse(res.getStatus(), res.getMimeType(), res.getData(),
				res.getContentLength());
		Map<String, String> headers = res.getHeaders();
		Set<String> hKey = headers.keySet();
		for (String hk : hKey) {
			response.addHeader(hk, headers.get(hk));
		}
		return response;
	}

}
