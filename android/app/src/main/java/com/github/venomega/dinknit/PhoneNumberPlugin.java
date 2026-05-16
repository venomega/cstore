package com.github.venomega.dinknit;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import java.lang.reflect.Method;
import java.util.List;

@CapacitorPlugin(
    name = "PhoneNumber",
    permissions = {
        @Permission(
            alias = "phone",
            strings = { Manifest.permission.READ_PHONE_STATE }
        )
    }
)
public class PhoneNumberPlugin extends Plugin {

    @PluginMethod
    public void getPhoneNumber(PluginCall call) {
        Log.d("PhonePlugin", "getPhoneNumber called");
        if (getContext().checkSelfPermission(Manifest.permission.READ_PHONE_STATE)
                == PackageManager.PERMISSION_GRANTED) {
            Log.d("PhonePlugin", "permission already granted");
            resolvePhone(call);
        } else {
            Log.d("PhonePlugin", "requesting permission");
            requestPermissionForAlias("phone", call, "handlePermissionResult");
        }
    }

    @PermissionCallback
    public void handlePermissionResult(PluginCall call) {
        Log.d("PhonePlugin", "handlePermissionResult called");
        if (getContext().checkSelfPermission(Manifest.permission.READ_PHONE_STATE)
                == PackageManager.PERMISSION_GRANTED) {
            Log.d("PhonePlugin", "permission granted by user");
            resolvePhone(call);
        } else {
            Log.d("PhonePlugin", "permission denied");
            JSObject ret = new JSObject();
            ret.put("phoneNumber", "");
            call.resolve(ret);
        }
    }

    private void resolvePhone(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("phoneNumber", readNumber());
        call.resolve(ret);
    }

    private String readNumber() {
        Context ctx = getContext();
        TelephonyManager tm = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
        if (tm == null) return "";

        // 1) getLine1Number() — estándar, a menudo vacío en Android 10+
        String n = safeGet(tm::getLine1Number);
        if (isNumeric(n)) return n;

        // 2) SubscriptionManager — probar cada SIM
        if (Build.VERSION.SDK_INT >= 22) {
            SubscriptionManager subMgr = (SubscriptionManager) ctx.getSystemService(Context.TELEPHONY_SUBSCRIPTION_SERVICE);
            if (subMgr != null) {
                List<SubscriptionInfo> list = safeGet(subMgr::getActiveSubscriptionInfoList);
                if (list != null) {
                    for (SubscriptionInfo info : list) {
                        n = safeGet(info::getNumber);
                        if (isNumeric(n)) return n;
                    }
                }
            }
        }

        // 3) getMsisdn() — método hidden que algunos OEMs implementan
        n = reflectMsisdn(tm);
        if (isNumeric(n)) return n;

        return "";
    }

    private static boolean isNumeric(String s) {
        if (s == null || s.isEmpty()) return false;
        String digits = s.replaceAll("[^\\d]", "");
        return digits.length() >= 4;
    }

    private static <T> T safeGet(Supplier<T> fn) {
        try { return fn.get(); } catch (Exception e) { return null; }
    }

    private static String reflectMsisdn(TelephonyManager tm) {
        try {
            Method m = TelephonyManager.class.getMethod("getMsisdn");
            Object val = m.invoke(tm);
            return val instanceof String ? (String) val : null;
        } catch (Exception e) {
            return null;
        }
    }

    private interface Supplier<T> {
        T get() throws Exception;
    }
}
