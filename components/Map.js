import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice"
import { GOOGLE_MAPS_APIKEY, GROWCIFY_API_KEY } from "@env"

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    console.log(`origin at Map is == ${JSON.stringify(origin)}`)
    console.log(`destination at Map is == ${JSON.stringify(destination)}`)

    const dispatch = useDispatch();
    const mapRef = useRef(null);
    //useEffect hook should run when their is any change in orgin, destination.
    useEffect(() => {
        if (!origin || !destination) return;

        // zoom out and fit map to supplied marker using useRef
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"],{
            edgePadding:{top: 50, right: 50, bottom: 50, left:50},
        })
    }, [origin, destination]);

    // completely responsive to calculate travel time
    // this useEffect depends on three things, origin, destination, apikey
    useEffect(() => {

        if(!origin || !destination) return;


        // got travel time and distance information from google api and saved it into redux store.
        const getTravelTime = async() => {
            const URL =   `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GROWCIFY_API_KEY}`


            fetch(URL)
            .then((res) => res.json())
            .then(data => {
                // console.log(data)
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            })
             
        }

        getTravelTime()
    }, [origin, destination, GROWCIFY_API_KEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>
            {
                origin && destination && (
                    <MapViewDirections
                        origin={origin.description}
                        destination={destination.description}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="black"
                    />
                )
            }
            {
                origin?.location && (
                    <Marker
                        coordinate={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng,
                        }}
                        title="Origin"
                        description={origin.description}
                        identifier="origin"
                    />
                )
            }

            {
                destination?.location && (
                    <Marker
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        title="Destination"
                        description={destination.description}
                        identifier="destination"
                    />
                )
            }
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})