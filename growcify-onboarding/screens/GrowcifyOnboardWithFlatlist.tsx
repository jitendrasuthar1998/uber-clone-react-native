import { FlatList, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../assets/constants/images'


import data from '../assets/data/onboardingData';

import { Dimensions } from 'react-native'
import { useRef } from 'react';
const { height, width } = Dimensions.get("window");

const GrowcifyOnboardWithFlatlist = () => {

    const flatlistRef = useRef();

    const renderFlatListItem = ({ item }) => {
        return (
            <ImageBackground source={item.img} style={{ height, width }} resizeMode="cover" />
        )
    }

    const [currentPage, setCurrentPage] = useState(0)
    const [viewableItems, setViewableItems] = useState([]);
    //create two button
    //1. arrow button
    //2. skip button

    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        // console.log(JSON.stringify(viewableItems))
        setViewableItems(viewableItems)
    })

    useEffect(() => {
        if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
        setCurrentPage(viewableItems[0].index)
        console.log(`currentPage is == ${currentPage}`)
        console.log(`viewableItems are == ${JSON.stringify(viewableItems)}`)
    }, [viewableItems])

    const handleNext = () => {
        console.log(`currentPage is == ${currentPage}`)
        if (currentPage == images.length - 1) return;

        flatlistRef.current.scrollToIndex({
            animated: true,
            index: currentPage + 1
        })

    }

    const handleBack = () => {
        if (currentPage == 0) return;

        flatlistRef.current.scrollToIndex({
            animated: true,
            index: currentPage - 1
        })
    }

    const handleSkipToEnd = () => {
        flatlistRef.current.scrollToIndex({
            animated: true,
            index: images.length - 1
        })
    }


    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderFlatListItem}
                keyExtractor={item => item._id}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={flatlistRef}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
                initialNumToRender={1}
                extraData={width}
            />
            <View style={{ position: "absolute", height: 20, bottom: height * 0.35, width, justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {
                        data.map((_, index) => (
                            <View key={index} style={{ height: 10, width: 10, backgroundColor: index == currentPage ? "red" : "lightgray", borderRadius: 5, marginRight: 8, }}></View>
                        ))
                    }
                </View>
            </View>
            <TouchableOpacity onPress={handleSkipToEnd} style={{ backgroundColor: "white", paddingVertical: 5, paddingHorizontal: 15, justifyContent: "center", alignItems: "center", position: "absolute", top: 60, borderRadius: 20, right: 20 }}>
                <Text>Skip</Text>
            </TouchableOpacity>
            <View style={{ height: height * 0.34, position: "absolute", bottom: 0, width, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20 }}>
                <Text style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: 30, fontWeight: "500", marginTop: 20 }}>{data[currentPage].title}</Text>
                <Text style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: 16, marginTop: 20 }}>{data[currentPage].description}</Text>

                <View style={{ flex: 1, marginTop: 30, alignItems: "center", justifyContent: "space-between", flexDirection: "row", }}>
                    <TouchableOpacity onPress={handleBack} style={{ height: 60, width: currentPage == 0 ? 0 : width * 0.2, justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Text>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext} style={{ height: 60, width: currentPage != 0 ? width * 0.55 : width * 0.9, backgroundColor: "red", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default GrowcifyOnboardWithFlatlist

const styles = StyleSheet.create({})