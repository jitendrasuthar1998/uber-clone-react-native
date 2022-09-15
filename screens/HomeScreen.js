import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import { GOOGLE_MAPS_APIKEY } from "@env"

import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from "../slices/navSlice"
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full pl-5`}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain"
                }}
                source={{
                    uri: "https://links.papareact.com/gzs"
                }}
            />

            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18
                    }
                }}
                placeholder="Where From?"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
                minLength={2}
                enablePoweredByContainer={false}
                fetchDetails={true}
                returnKeyType={'search'}
                onPress={(data, details = null) => {
                    dispatch(
                        setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }));

                    dispatch(setDestination(null));
                }}
            />
            <NavOptions />
            <NavFavourites />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({}) 