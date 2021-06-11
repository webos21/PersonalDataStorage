package com.gmail.webos21.webdav;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

/**
 * Parser of date format used HTTP spec.
 */
public final class HttpDateParser {

	private static final String RFC_1123_DATE_FORMAT = "EEE, dd MMM yyyy HH:mm:ss zzz"; //$NON-NLS-1$
	private static final String RFC_1036_DATE_FORMAT = "EEEE, dd-MMM-yy HH:mm:ss zzz"; //$NON-NLS-1$
	private static final String ANSIC_DATE_FORMAT = "EEE MMM d HH:mm:ss yyyy"; //$NON-NLS-1$
	private static final TimeZone tz = TimeZone.getTimeZone("GMT"); //$NON-NLS-1$

	// no instances
	private HttpDateParser() {
	}

	/**
	 * Converts HTTP date to Java Date.
	 * 
	 * @param date not <code>null</code>
	 * @return Java Date
	 * @throws IllegalArgumentException if parsing fails
	 */
	public static Date parseHttpDate(String date) {

		// http://www.squid-cache.org/mail-archive/squid-users/200307/0122.html
		// Some IE browsers send If-Modified-Since header with a length extension such
		// as: Thu, 01 Sep 2011 00:48:38 GMT; length=347987
		int index = date.indexOf(';');
		if (index != -1) {
			date = date.substring(0, index).trim();
		}

		int indexOfComma = date.indexOf(',');
		try {
			if (indexOfComma == -1) { // choosed format base on comma position
				return createSimpleDateFormat(ANSIC_DATE_FORMAT).parse(date);
			} else if (indexOfComma == 3) {
				return createSimpleDateFormat(RFC_1123_DATE_FORMAT).parse(date);
			} else {
				return createSimpleDateFormat(RFC_1036_DATE_FORMAT).parse(date);
			}
		} catch (ParseException e) {
			throw new IllegalArgumentException(e);
		}
	}

	private static SimpleDateFormat createSimpleDateFormat(String format) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format, Locale.US);
		simpleDateFormat.setTimeZone(tz);
		return simpleDateFormat;
	}

	/**
	 * Converts Java Data to HTTP date string.
	 * 
	 * @param date Java Date
	 * @return the HTTP date string
	 */
	public static String toHttpDate(Date date) {
		return createSimpleDateFormat(RFC_1123_DATE_FORMAT).format(date);
	}
}
