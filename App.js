import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import Maps from './src/maps';
import BatteryStatus from './src/batteryStatus';
const App = () => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Maps />
      <BatteryStatus />
    </SafeAreaView>
  );
};


export default App;
