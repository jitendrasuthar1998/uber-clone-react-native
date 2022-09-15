import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
const MapScreen = () => {

    const Stack = createStackNavigator();

    const navigation = useNavigation();



    return (
        <SafeAreaView>

            <TouchableOpacity 
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`bg-gray-100 absolute top-16 left-5 z-50 rounded-full shadow-lg p-2`}>
                <Icon name='menu'/>
            </TouchableOpacity>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2 bg-white`}>
                <Stack.Navigator>
                    <Stack.Screen name='NavigateCard'
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name='RideOptionsCard'
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </SafeAreaView>
    )
}

export default MapScreen

const styles = StyleSheet.create({})