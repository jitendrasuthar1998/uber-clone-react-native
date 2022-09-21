import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


//check image is rendering on screen

const image1 = require("./images/image1.jpg");
const image2 = require("./images/image2.jpg");
const image3 = require("./images/image3.jpg");
const image4 = require("./images/image4.jpg");
const image5 = require("./images/image5.jpg");
const image6 = require("./images/image6.jpg");

const images = [image1, image2, image3, image4, image5, image6];

const CheckImage = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>CheckImage</Text>
        {/* <Image source={image1} style={{height: 100, width: 100}}/> */}


        {/* <FlatList
        data={images}
        renderItem={({item, index}) => (
          <View>
            <Image source={item}/>
          </View>
        )}
        /> */}


        <ScrollView>
        {
          images.map((item, index) => (
            <View key={index}>
              <Image source={item}/>
            </View>
          ))
        }
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default CheckImage

const styles = StyleSheet.create({})