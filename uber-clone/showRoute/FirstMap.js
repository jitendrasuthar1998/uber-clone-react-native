import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { SafeAreaView } from 'react-native-safe-area-context';
const FirstMap = () => {

    const [coordinates] = useState([
        {
          latitude: 48.8587741,
          longitude: 2.2069771,
        },
        {
          latitude: 48.8323785,
          longitude: 2.3361663,
        },
      ]);


  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsTraffic={false}
        showsIndoorLevelPicker={false}
        showsIndoors={false}
        showsCompass={false}
        mapType={"standard"}
        >
            <MapViewDirections
                        origin={coordinates[0]}
                        destination={coordinates[1]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="black"
                        />
            <Marker coordinate={coordinates[0]}/>
            <Marker coordinate={coordinates[1]}/>
            {/* <Polyline
            coordinates={coordinates}
            strokeColor="#000"
            strokeColors={["#7F0000"]}
            strokeWidth={6}
            /> */}
        </MapView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
export default FirstMap;