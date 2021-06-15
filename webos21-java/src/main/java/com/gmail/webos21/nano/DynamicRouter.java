package com.gmail.webos21.nano;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;

public class DynamicRouter {

	private final HashMap<String, DynamicParameter> dynamicMap;

	public DynamicRouter() {
		dynamicMap = new HashMap<>();
	}

	public RouteResult route(Map<String, String> headers, IHTTPSession session, String uri, Map<String, String> files) {
		RouteResult res = null;

		Set<String> keys = dynamicMap.keySet();
		for (String uriKey : keys) {
			if (uriKey.equals(uri) || (uriKey.equals("/pds/v1/fs") && uri.startsWith("/pds/v1/fs"))) {

				DynamicParameter dp = dynamicMap.get(uriKey);
				if (dp != null) {
					try {
						UriHandler h;
						Class<? extends UriHandler> instanceClass = dp.getInstanceClass();
						Class<?>[] classes = dp.getClasses();
						Object[] values = dp.getValues();
						if (classes == null) {
							h = instanceClass.getConstructor().newInstance();
						} else {
							for (int i = 0; i < classes.length; i++) {
								System.out.println("Class[" + i + "] " + classes[i].getName());
							}
							for (int i = 0; i < values.length; i++) {
								System.out.println("Values[" + i + "] " + values[i]);
							}
							h = instanceClass.getConstructor(classes).newInstance(values);
						}
						res = h.process(headers, session, uri, files);
					} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
						e.printStackTrace();
					}
				}

			}
		}

		return res;
	}

	public void addDynamicPage(String uri, Class<? extends UriHandler> clazz) {
		DynamicParameter dp = new DynamicParameter(clazz);
		dynamicMap.put(uri, dp);
	}

	public void addDynamicPage(String uri, Class<? extends UriHandler> clazz, Object... args) {
		DynamicParameter dp = new DynamicParameter(clazz, args);
		dynamicMap.put(uri, dp);
	}

}
