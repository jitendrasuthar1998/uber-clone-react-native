import 'react-native-gesture-handler'
import React from 'react';
import UberApp from './uber-clone/uber-app';
import { StatusBar, View } from 'react-native';
import CheckImage from './test/CheckImage';
import OnBoarding from './onboarding/screens/OnBoarding';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import GrowcifyOnboarding from './growcify-onboarding/screens/GrowcifyOnboarding';
import Swipable from './growcify-onboarding/screens/GrowcifyOnboardWithFlatlist';
import LocationPermission from './uber-clone/permissions/LocationPermission';
export default function App() {


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <UberApp/> */}
        {/* <CheckImage/> */}
        <StatusBar backgroundColor={"#FF5678"}/>

        <LocationPermission/>
        {/* <OnBoarding /> */}
        {/* <GrowcifyOnboarding/> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );


  // wrap application root component in PaperProvider.


}

