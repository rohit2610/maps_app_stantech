import React, { useEffect, useState } from "react";
import { Text, View, NativeModules, AppState } from "react-native";
const { PowerSaverModule } = NativeModules;


const BatteryStatus = () => {

    const [isModeOn, setIsModeOn] = useState(null);
    const checkStatus = () => {
        PowerSaverModule.isPowerSaverModeOn((isPowerSaverModeOn) => {
            setIsModeOn(isPowerSaverModeOn)
        });
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', checkStatus)
        return () => {
            subscription.remove();
        }
    }, [])

    return (
        <View style={{
            width: '100%',
            height: 200,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{ color: 'black', fontSize: 32, fontWeight: '600' }}>Battery Saver</Text>
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        height: 50, width: '60%', borderWidth: 2, borderRadius: 6, overflow: 'hidden'
                    }}>
                    <View
                        style={{
                            height: 46, width: '80%', backgroundColor: isModeOn ? "orange" : 'green'
                        }}/>
                </View>
                <View
                    style={{
                        height: 25, width: '5%', borderWidth: 2, borderLeftWidth: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6
                    }}/>
            </View>
            <Text style={{ color: 'black', fontSize: 22, fontWeight: '600' }}>{isModeOn ? "ON" : "OFF"}</Text>
        </View>
    )
}

export default BatteryStatus;