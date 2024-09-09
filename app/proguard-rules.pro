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


# for XmlPull
-keep class android.content.res.* {*;}
-dontwarn android.content.res.**
-keep class org.xmlpull.v1.** {*;}
-dontwarn org.xmlpull.v1.**

# for H2Database
-keep class org.h2.** { *; }
-dontwarn org.h2.**
-dontnote org.h2.**

# for PDS Web
-keep class com.gmail.webos21.pds.web.** {*;}
-keep class com.gmail.webos21.pds.db.** {*;}

# for SLF4J
-dontwarn org.slf4j.**
