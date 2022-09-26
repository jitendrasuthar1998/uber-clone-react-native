import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, Linking, AppState } from 'react-native';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';
import * as IntentLauncher from 'expo-intent-launcher';

function LocationPermission() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState)

  const handleAppState = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    }

    // appState.current = nextAppState;
    setAppState(nextAppState);
    console.log('AppState', appState);
  }

  useEffect(() => {
    (async () => {

      AppState.addEventListener('change', handleAppState)

      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        let status = Location.getProviderStatusAsync();
        if (!(await status).locationServicesEnabled) {
          // alert('Enable location services.')
          setIsLocationModalVisible(true);
        }
      }
    })();
    return () => AppState.addEventListener().remove();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleOpenSetting = () => {
    console.log(`handleOpenSetting called`)
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS
      )
    }

    setOpenSetting(false);
  }

  const dontOpenSetting = () => console.log(`dont open settings`)

  console.log(`isLocationModalVisible is == ${isLocationModalVisible}`)
  console.log(`openSetting is == ${openSetting}`)

  return (
    <View style={styles.container}>
      <Modal
        style={{ justifyContent: "center", alignItems: "center" }}
        onModalHide={() => openSetting ? handleOpenSetting() : undefined}
        isVisible={isLocationModalVisible}>
        <View style={{ height: 300, width: 300, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
          <Button onPress={() => {
            setOpenSetting(true)
            setIsLocationModalVisible(false)
          }}
            title="Enable Location Services."
          />
        </View>
      </Modal>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}


export default LocationPermission

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
})