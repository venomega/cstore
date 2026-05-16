package com.github.venomega.dinknit;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(PhoneNumberPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
