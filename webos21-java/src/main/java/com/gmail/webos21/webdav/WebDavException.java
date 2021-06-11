package com.gmail.webos21.webdav;

/**
 * WebDAV general exception.
 */
public class WebDavException extends RuntimeException {

	private static final long serialVersionUID = 8527791966212934793L;

	public WebDavException() {
		super();
	}

	public WebDavException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public WebDavException(String arg0) {
		super(arg0);
	}

	public WebDavException(Throwable arg0) {
		super(arg0);
	}
}