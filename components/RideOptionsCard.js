import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  }
]

const RideOptionsCard = () => {

  const navigation = useNavigation();

  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);


  const SURGE_CHARGE_RATE = 1.5;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* first child view contain a left arrow button and select a ride text */}
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 10, height: 50 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={[tw`rounded-full`, {
            height: 30,
            width: 30, borderRadius: 50,
          }]}
        >
          <Icon
            size={30}
            name='chevron-left'
            type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-lg ml-18`}>Select a ride - {travelTimeInformation?.distance?.text} </Text>
      </View>

      <FlatList
        data={data}
        scrollEnabled
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image, multiplier }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-3 ${id === selected?.id && "bg-gray-200"}`}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                borderWidth: 1,
                borderColor: 'white'
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              ${(travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100}
              {/* {new Intl.NumberFormat('en-gb',{
                style:'currency',
                currency:'GBP',
              }).format(
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
              )
              
              } */}

            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-red-900`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})