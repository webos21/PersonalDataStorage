package com.gmail.webos21.pds.web;

import java.util.Map;

import com.gmail.webos21.pds.web.NanoHTTPD.IHTTPSession;

public interface UriHandler {

	public RouteResult process(Map<String, String> headers, IHTTPSession session, String uri,
			Map<String, String> files);

}
