package com.gmail.webos21.nano;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;

public class DynamicRouter {

	private HashMap<String, DynamicParameter> dynamicMap;

	public DynamicRouter() {
		dynamicMap = new HashMap<String, DynamicParameter>();
	}

	public RouteResult route(Map<String, String> headers, IHTTPSession session, String uri, Map<String, String> files) {
		RouteResult res = null;

		Set<String> keys = dynamicMap.keySet();
		for (String uriKey : keys) {
			if (uri.startsWith(uriKey)) {

				DynamicParameter dp = dynamicMap.get(uriKey);
				if (dp != null) {
					try {
						UriHandler h = null;
						Class<? extends UriHandler> instanceClass = dp.getInstanceClass();
						Class<?>[] classes = dp.getClasses();
						Object[] values = dp.getValues();
						if (classes == null) {
							h = instanceClass.newInstance();
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
					} catch (InstantiationException e) {
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (IllegalArgumentException e) {
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						e.printStackTrace();
					} catch (NoSuchMethodException e) {
						e.printStackTrace();
					} catch (SecurityException e) {
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
