package com.gmail.webos21.pds.web.handler;

import com.gmail.webos21.nano.NanoHTTPD;
import com.gmail.webos21.nano.NanoHTTPD.IHTTPSession;
import com.gmail.webos21.nano.NanoHTTPD.Response.Status;
import com.gmail.webos21.nano.RouteResult;
import com.gmail.webos21.nano.UriHandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

public class FsHandler implements UriHandler {

    public static final List<String> INDEX_FILE_NAMES = new ArrayList<String>() {
        private static final long serialVersionUID = 1L;

        {
            add("index.html");
            add("index.htm");
        }
    };

    private String uriBase;
    private File fsRoot;
    private List<File> rootDirs;

    public FsHandler(String uriBase, File fsroot) {
        this.uriBase = uriBase;
        this.fsRoot = fsroot;
        rootDirs = new ArrayList<File>(Collections.singletonList(fsRoot));
    }

    @Override
    public RouteResult process(Map<String, String> headers, NanoHTTPD.IHTTPSession session, String uri,
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
        return WebHelper.processSimple(headers.get("origin"), Status.OK);
    }

    private RouteResult processPut(Map<String, String> headers, NanoHTTPD.IHTTPSession session, String uri,
                                   Map<String, String> files) {
        return WebHelper.processSimple(headers.get("origin"), Status.OK);
    }

    private RouteResult processPost(Map<String, String> headers, NanoHTTPD.IHTTPSession session, String uri,
                                    Map<String, String> files) {
        if (session.getParameters().get("ufile") != null && session.getParameters().get("upath") != null) {
            String fileName = session.getParameters().get("ufile").get(0);
            String path = session.getParameters().get("upath").get(0);

            File srcFile = new File(files.get("ufile"));
            File dstFile = new File(fsRoot,path + fileName);

            System.out.println("srcFile : " + srcFile.getAbsolutePath());
            System.out.println("dstFile : " + dstFile.getAbsolutePath());

            try {
                FileInputStream fis = new FileInputStream(srcFile);
                FileOutputStream fos = new FileOutputStream(dstFile);
                FileChannel ifc = fis.getChannel();
                FileChannel ofc = fos.getChannel();

                MappedByteBuffer mbb = ifc.map(FileChannel.MapMode.READ_ONLY, 0, ifc.size());
                ofc.write(mbb);

                ofc.close();
                ifc.close();
                
                fos.close();
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return processGet(headers, session, uri, null);
    }

    private RouteResult processGet(Map<String, String> headers, IHTTPSession session, String uri,
                                   Map<String, String> files) {

        System.out.println("orig URI = " + uri);

        for (File homeDir : this.rootDirs) {
            // Make sure we won't die of an exception later
            if (!homeDir.isDirectory()) {
                return getInternalErrorResponse("given path is not a directory (" + homeDir + ").");
            }
        }

        return defaultRespond(headers, session, uri);
    }

    /**
     * Serves file from homeDir and its' subdirectories (only). Uses only URI,
     * ignores all headers and HTTP parameters.
     */
    RouteResult serveFile(String uri, Map<String, String> header, File file, String mime) {
        RouteResult res;
        try {
            // Calculate etag
            String etag = Integer
                    .toHexString((file.getAbsolutePath() + file.lastModified() + "" + file.length()).hashCode());

            // Support (simple) skipping:
            long startFrom = 0;
            long endAt = -1;
            String range = header.get("range");
            if (range != null) {
                if (range.startsWith("bytes=")) {
                    range = range.substring("bytes=".length());
                    int minus = range.indexOf('-');
                    try {
                        if (minus > 0) {
                            startFrom = Long.parseLong(range.substring(0, minus));
                            endAt = Long.parseLong(range.substring(minus + 1));
                        }
                    } catch (NumberFormatException ignored) {
                    }
                }
            }

            // get if-range header. If present, it must match etag or else we
            // should ignore the range request
            String ifRange = header.get("if-range");
            boolean headerIfRangeMissingOrMatching = (ifRange == null || etag.equals(ifRange));

            String ifNoneMatch = header.get("if-none-match");
            boolean headerIfNoneMatchPresentAndMatching = ifNoneMatch != null
                    && ("*".equals(ifNoneMatch) || ifNoneMatch.equals(etag));

            // Change return code and add Content-Range header when skipping is
            // requested
            long fileLen = file.length();

            if (headerIfRangeMissingOrMatching && range != null && startFrom >= 0 && startFrom < fileLen) {
                // range request that matches current etag
                // and the startFrom of the range is satisfiable
                if (headerIfNoneMatchPresentAndMatching) {
                    // range request that matches current etag
                    // and the startFrom of the range is satisfiable
                    // would return range from file
                    // respond with not-modified
                    res = RouteResult.newRouteResult(NanoHTTPD.Response.Status.NOT_MODIFIED, mime, "");
                    res.addHeader("ETag", etag);
                } else {
                    if (endAt < 0) {
                        endAt = fileLen - 1;
                    }
                    long newLen = endAt - startFrom + 1;
                    if (newLen < 0) {
                        newLen = 0;
                    }

                    FileInputStream fis = new FileInputStream(file);
                    fis.skip(startFrom);

                    res = RouteResult.newRouteResult(NanoHTTPD.Response.Status.PARTIAL_CONTENT, mime, fis, newLen);
                    res.addHeader("Accept-Ranges", "bytes");
                    res.addHeader("Content-Length", "" + newLen);
                    res.addHeader("Content-Range", "bytes " + startFrom + "-" + endAt + "/" + fileLen);
                    res.addHeader("ETag", etag);
                }
            } else {

                if (headerIfRangeMissingOrMatching && range != null && startFrom >= fileLen) {
                    // return the size of the file
                    // 4xx responses are not trumped by if-none-match
                    res = RouteResult.newRouteResult(NanoHTTPD.Response.Status.RANGE_NOT_SATISFIABLE,
                            NanoHTTPD.MIME_PLAINTEXT, "");
                    res.addHeader("Content-Range", "bytes */" + fileLen);
                    res.addHeader("ETag", etag);
                } else if (range == null && headerIfNoneMatchPresentAndMatching) {
                    // full-file-fetch request
                    // would return entire file
                    // respond with not-modified
                    res = RouteResult.newRouteResult(NanoHTTPD.Response.Status.NOT_MODIFIED, mime, "");
                    res.addHeader("ETag", etag);
                } else if (!headerIfRangeMissingOrMatching && headerIfNoneMatchPresentAndMatching) {
                    // range request that doesn't match current etag
                    // would return entire (different) file
                    // respond with not-modified

                    res = RouteResult.newRouteResult(NanoHTTPD.Response.Status.NOT_MODIFIED, mime, "");
                    res.addHeader("ETag", etag);
                } else {
                    // supply the file
                    res = newFixedFileResponse(file, mime);
                    res.addHeader("Content-Length", "" + fileLen);
                    res.addHeader("ETag", etag);
                }
            }
        } catch (IOException ioe) {
            res = getForbiddenResponse("Reading file failed.");
        }

        return res;
    }

    private boolean canServeUri(String uri, File homeDir) {
        boolean canServeUri;
        File f = new File(homeDir, uri);
        canServeUri = f.exists();
        return canServeUri;
    }

    /**
     * URL-encodes everything between "/"-characters. Encodes spaces as '%20'
     * instead of '+'.
     */
    private String encodeUri(String uri) {
        String newUri = "";
        StringTokenizer st = new StringTokenizer(uri, "/ ", true);
        while (st.hasMoreTokens()) {
            String tok = st.nextToken();
            if ("/".equals(tok)) {
                newUri += "/";
            } else if (" ".equals(tok)) {
                newUri += "%20";
            } else {
                try {
                    newUri += URLEncoder.encode(tok, "UTF-8");
                } catch (UnsupportedEncodingException ignored) {
                }
            }
        }
        return newUri;
    }

    private String findIndexFileInDirectory(File directory) {
        for (String fileName : INDEX_FILE_NAMES) {
            File indexFile = new File(directory, fileName);
            if (indexFile.isFile()) {
                return fileName;
            }
        }
        return null;
    }

    private RouteResult newFixedFileResponse(File file, String mime) throws FileNotFoundException {
        RouteResult res;
        res = RouteResult.newRouteResult(NanoHTTPD.Response.Status.OK, mime, new FileInputStream(file),
                (int) file.length());
        res.addHeader("Accept-Ranges", "bytes");
        return res;
    }

    protected RouteResult getForbiddenResponse(String s) {
        return RouteResult.newRouteResult(NanoHTTPD.Response.Status.FORBIDDEN, NanoHTTPD.MIME_PLAINTEXT,
                "FORBIDDEN: " + s);
    }

    protected RouteResult getInternalErrorResponse(String s) {
        return RouteResult.newRouteResult(NanoHTTPD.Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT,
                "INTERNAL ERROR: " + s);
    }

    protected RouteResult getNotFoundResponse() {
        return RouteResult.newRouteResult(NanoHTTPD.Response.Status.NOT_FOUND, NanoHTTPD.MIME_PLAINTEXT,
                "Error 404, file not found.");
    }

    protected String listDirectory(String uri, File f) {
        String heading = "Directory " + uri;
        /* cmjo : revise */
//		StringBuilder msg = new StringBuilder("<html><head><title>" + heading + "</title><style><!--\n"
//				+ "span.dirname { font-weight: bold; }\n" + "span.filesize { font-size: 75%; }\n" + "// -->\n"
//				+ "</style>" + "</head><body><h1>" + heading + "</h1>");
        StringBuilder msg = new StringBuilder();
        msg.append("<!doctype html>\n");
        msg.append("<html lang=\"ko\">\n");
        msg.append("<head>\n");
        msg.append("<meta http-equiv=\"Content-Type\" content=\"text/html;charset=UTF-8\">\n");
        msg.append("<title>").append(heading).append("</title>\n");
        msg.append("<style>\n");
        msg.append("<!--\n");
        msg.append("  form[name=frmUpload] { display: block; padding: 10px; border: 1px solid #c0c0c0; }\n");
        msg.append("  ul section { list-style-type: none; }\n");
        msg.append("  span.dirname { font-weight: bold; }\n");
        msg.append("  span.filesize { font-size: 75%; }\n");
        msg.append("// -->\n");
        msg.append("</style>");
        msg.append("</head>\n\n");
        msg.append("<body>\n");
        msg.append("<h1>").append(heading).append("</h1>\n");
        msg.append("<form name=\"frmUpload\" action=\"").append("").append("\" method=\"post\"");
        msg.append(" enctype=\"multipart/form-data\">\n");
        msg.append("  <input type=\"file\" name=\"ufile\" />\n");
        msg.append("  <input type=\"hidden\" name=\"upath\" value=\"").append(uri).append("\" />\n");
        msg.append("  <input type=\"submit\" value=\"Upload\"/>\n");
        msg.append("</form>\n");

        String up = null;
        if (uri.length() > 1) {
            String u = uri.substring(0, uri.length() - 1);
            int slash = u.lastIndexOf('/');
            if (slash >= 0 && slash < u.length()) {
                up = uri.substring(0, slash + 1);
            }
        }

        List<String> files = Arrays.asList(f.list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return new File(dir, name).isFile();
            }
        }));
        Collections.sort(files);

        List<String> directories = Arrays.asList(f.list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return new File(dir, name).isDirectory();
            }
        }));
        Collections.sort(directories);

        if (up != null || directories.size() + files.size() > 0) {
            msg.append("<ul>\n");
            if (up != null || directories.size() > 0) {
                msg.append("<section class=\"directories\">\n");
                if (up != null) {
                    msg.append("<li><a rel=\"directory\" href=\"").append(uriBase + up)
                            .append("\"><span class=\"dirname\">..</span></a></li>\n");
                }
                for (String directory : directories) {
                    String dir = directory + "/";
                    msg.append("<li><a rel=\"directory\" href=\"").append(encodeUri(uriBase + uri + dir))
                            .append("\"><span class=\"dirname\">").append(dir).append("</span></a></li>\n");
                }
                msg.append("</section>\n");
            }
            if (files.size() > 0) {
                msg.append("<section class=\"files\">\n");
                for (String file : files) {
                    msg.append("<li><a href=\"").append(encodeUri(uriBase + uri + file))
                            .append("\"><span class=\"filename\">").append(file).append("</span></a>");
                    File curFile = new File(f, file);
                    long len = curFile.length();
                    msg.append("&nbsp;<span class=\"filesize\">(");
                    if (len < 1024) {
                        msg.append(len).append(" bytes");
                    } else if (len < 1024 * 1024) {
                        msg.append(len / 1024).append(".").append(len % 1024 / 10 % 100).append(" KB");
                    } else {
                        msg.append(len / (1024 * 1024)).append(".").append(len % (1024 * 1024) / 10000 % 100)
                                .append(" MB");
                    }
                    msg.append(")</span></li>\n");
                }
                msg.append("</section>\n");
            }
            msg.append("</ul>\n");
        }
        msg.append("\n</body>\n");
        msg.append("</html>");

        return msg.toString();
    }

    private RouteResult defaultRespond(Map<String, String> headers, IHTTPSession session, String uri) {

        System.out.println("orig URI = " + uri);

        // Remove URL base
        uri = uri.replace(uriBase, "");

        // Remove URL arguments
        uri = uri.trim().replace(File.separatorChar, '/');
        if (uri.indexOf('?') >= 0) {
            uri = uri.substring(0, uri.indexOf('?'));
        }

        // Prohibit getting out of current directory
        if (uri.contains("../")) {
            return getForbiddenResponse("Won't serve ../ for security reasons.");
        }

        System.out.println("URI = " + uri);

        boolean canServeUri = false;
        File homeDir = null;
        for (int i = 0; !canServeUri && i < this.rootDirs.size(); i++) {
            homeDir = this.rootDirs.get(i);
            canServeUri = canServeUri(uri, homeDir);
        }
        if (!canServeUri) {
            return getNotFoundResponse();
        }

        // Browsers get confused without '/' after the directory, send a
        // redirect.
        File f = new File(homeDir, uri);
        if (f.isDirectory() && !uri.endsWith("/")) {
            uri += "/";
            RouteResult res = RouteResult.newRouteResult(NanoHTTPD.Response.Status.REDIRECT, NanoHTTPD.MIME_HTML,
                    "<html><body>Redirected: <a href=\"" + uri + "\">" + uri + "</a></body></html>");
            res.addHeader("Location", uri);
            return res;
        }

        if (f.isDirectory()) {
            // First look for index files (index.html, index.htm, etc) and if
            // none found, list the directory if readable.
            String indexFile = findIndexFileInDirectory(f);
            if (indexFile == null) {
                if (f.canRead()) {
                    // No index file, list the directory if it is readable
                    return RouteResult.newRouteResult(NanoHTTPD.Response.Status.OK, NanoHTTPD.MIME_HTML,
                            listDirectory(uri, f));
                } else {
                    return getForbiddenResponse("No directory listing.");
                }
            } else {
                return process(headers, session, uri + indexFile, null);
            }
        }
        String mimeTypeForFile = NanoHTTPD.getMimeTypeForFile(uri);
        RouteResult response = serveFile(uri, headers, f, mimeTypeForFile);

        return response != null ? response : getNotFoundResponse();
    }

}
