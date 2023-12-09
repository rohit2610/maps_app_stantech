import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import Home from './src/home';
import BatteryStatus from './src/batteryStatus';
const App = () => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Home />
      <BatteryStatus />
    </SafeAreaView>
  );
};


export default App;
