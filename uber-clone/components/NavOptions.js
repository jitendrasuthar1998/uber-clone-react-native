import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: '123',
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: '456',
        title: "Order food",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen", // change in future.
    }
]

const NavOptions = () => {
    const origin = useSelector(selectOrigin)
    const navigation = useNavigation();
    return (
        <FlatList
            data={data}
            horizontal
            contentContainerStyle={{height: 270}}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    disabled={!origin}
                    onPress={() => navigation.navigate(item.screen)} 
                    style={[tw`p-2 pl-4 pb-4 pt-4 bg-gray-200 m-2`]}>
                    <View style={tw`${!origin && "opacity-20"}`}>
                        <Image source={{ uri: item.image }}
                            style={{ width: 120, height: 120, resizeMode: "contain" }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            type='antdesign'
                            name="arrowright"
                            color={"white"}
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions