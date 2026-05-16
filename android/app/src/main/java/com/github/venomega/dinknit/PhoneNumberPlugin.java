package com.github.venomega.dinknit;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

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
        try {
            TelephonyManager tm = (TelephonyManager) getContext()
                .getSystemService(Context.TELEPHONY_SERVICE);
            if (tm != null) {
                String n = tm.getLine1Number();
                if (n != null && !n.isEmpty()) return n;
            }
        } catch (SecurityException ignored) {}
        return "";
    }
}
