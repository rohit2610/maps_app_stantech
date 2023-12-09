package com.maps_app_stantech;

import android.content.Context;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PowerSaverModule extends ReactContextBaseJavaModule {
    @NonNull
    @Override
    public String getName() {
        return "PowerSaverModule";
    }

    public PowerSaverModule(ReactApplicationContext reactApplicationContext){
        super(reactApplicationContext);
    }

    @ReactMethod
    public void isPowerSaverModeOn(com.facebook.react.bridge.Callback callback){
        boolean isPowerSaverModeOn = checkPowerSaverMode();
        callback.invoke(isPowerSaverModeOn);
    }

    private boolean checkPowerSaverMode(){
        Context context = getReactApplicationContext();
        PowerManager powerManager = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            powerManager = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            return powerManager != null && powerManager.isPowerSaveMode();
        } else {
            // For versions lower than Lollipop, check settings
            String powerSaveMode = Settings.Global.getString(
                    context.getContentResolver(), "low_power");
            return "1".equals(powerSaveMode);
        }
    }
}