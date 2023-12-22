# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in C:\DevSoft\Android\android-sdk-windows/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

-keep class android.content.res.XmlResourceParser
-keep class org.xmlpull.v1.XmlPullParser
-dontwarn android.content.res.**

-dontwarn java.lang.management.GarbageCollectorMXBean
-dontwarn java.lang.management.LockInfo
-dontwarn java.lang.management.ManagementFactory
-dontwarn java.lang.management.MonitorInfo
-dontwarn java.lang.management.OperatingSystemMXBean
-dontwarn java.lang.management.ThreadInfo
-dontwarn java.lang.management.ThreadMXBean
-dontwarn javax.naming.Context
-dontwarn javax.script.Bindings
-dontwarn javax.script.Compilable
-dontwarn javax.script.CompiledScript
-dontwarn javax.script.ScriptEngine
-dontwarn javax.script.ScriptEngineManager
-dontwarn javax.security.auth.callback.NameCallback
-dontwarn javax.security.auth.login.LoginContext
-dontwarn javax.tools.DiagnosticListener
-dontwarn javax.tools.ForwardingJavaFileManager
-dontwarn javax.tools.JavaCompiler$CompilationTask
-dontwarn javax.tools.JavaCompiler
-dontwarn javax.tools.JavaFileManager$Location
-dontwarn javax.tools.JavaFileManager
-dontwarn javax.tools.JavaFileObject$Kind
-dontwarn javax.tools.SimpleJavaFileObject
-dontwarn javax.tools.StandardJavaFileManager
-dontwarn javax.tools.ToolProvider
-dontwarn javax.xml.stream.XMLInputFactory
-dontwarn javax.xml.stream.XMLOutputFactory
-dontwarn javax.xml.stream.XMLStreamReader
-dontwarn javax.xml.stream.XMLStreamWriter
-dontwarn javax.xml.transform.stax.StAXResult
-dontwarn javax.xml.transform.stax.StAXSource
-dontwarn org.locationtech.jts.geom.CoordinateSequence
-dontwarn org.locationtech.jts.geom.CoordinateSequenceFactory
-dontwarn org.locationtech.jts.geom.Geometry
-dontwarn org.locationtech.jts.geom.GeometryCollection
-dontwarn org.locationtech.jts.geom.GeometryFactory
-dontwarn org.locationtech.jts.geom.LineString
-dontwarn org.locationtech.jts.geom.LinearRing
-dontwarn org.locationtech.jts.geom.MultiLineString
-dontwarn org.locationtech.jts.geom.MultiPoint
-dontwarn org.locationtech.jts.geom.MultiPolygon
-dontwarn org.locationtech.jts.geom.Point
-dontwarn org.locationtech.jts.geom.Polygon
-dontwarn org.locationtech.jts.geom.PrecisionModel
-dontwarn org.locationtech.jts.geom.impl.CoordinateArraySequenceFactory
-dontwarn org.locationtech.jts.geom.impl.PackedCoordinateSequenceFactory
-dontwarn org.slf4j.Logger
-dontwarn org.slf4j.LoggerFactory
