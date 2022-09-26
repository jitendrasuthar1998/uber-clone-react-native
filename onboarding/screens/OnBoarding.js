import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import theme from '../assets/constants/theme'
import Icon from 'react-native-vector-icons/AntDesign';

import data from '../assets/data/onboardingData';

const { COLORS, SIZES } = theme;

const OnBoarding = () => {

    const flatlistRef = useRef()
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

    }, [viewableItems])

    const handleNext = () => {
        if (currentPage == data.length - 1) return;

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
            index: data.length - 1
        })
    }

    const renderTopSection = () => {
        return (
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: SIZES.base }}>
                <TouchableOpacity onPress={handleBack} style={{ padding: SIZES.base * 2 }}>
                    <Icon name="left" style={{ opacity: currentPage == 0 ? 0 : 1, fontSize: 25, color: COLORS.primary }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSkipToEnd} style={{ padding: SIZES.base * 2, }} >
                    <Text style={{ fontSize: 18, color: COLORS.primary, opacity: currentPage == data.length - 1 ? 0 : 1 }}>Skip</Text>
                </TouchableOpacity>
            </View>
        )
    }


    //return two views
    // 1. pagination
    // 2. next or get started button

    const renderBottomSection = () => {
        return (
            <View style={{ padding: SIZES.base * 2, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {
                        data.map((_, index) => (
                            <View key={index} style={{ height: 10, width: 10, backgroundColor: index == currentPage ? COLORS.primary : COLORS.primary + '20', borderRadius: 5, marginRight: 8 }}></View>
                        ))
                    }
                </View>
                <View>
                    {
                        currentPage != data.length - 1 ? (
                            <TouchableOpacity
                                onPress={handleNext}
                                style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center" }} activeOpacity={0.8}>
                                <Icon name='right' color={"white"} size={25} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={{ paddingHorizontal: SIZES.base * 2, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 18, color: "white", marginLeft: SIZES.base }}>Get Started</Text>
                                <Icon name='right' style={{ color: "white", fontSize: 20, marginLeft: 10 }} />
                            </TouchableOpacity>
                        )
                    }

                </View>
            </View>
        )
    }


    // flatlist with pages

    const renderFlatListItem = ({ item }) => {
        return (
            <View style={{ width: SIZES.width, flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ alignItems: "center", marginVertical: SIZES.base * 2 }}>
                    <ImageBackground source={item.img} style={{ width: 335, height: 335, resizeMode: "contains" }} />
                </View>
                <View style={{ paddingHorizontal: SIZES.base * 4, marginVertical: SIZES.base * 2 }}>
                    <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>{item.title}</Text>
                    <Text style={{ textAlign: "center", opacity: 0.4, marginTop: 15, lineHeight: 28 }}>{item.description}</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {/* top section */}
            {renderTopSection()}
            {/* flatlist with pages */}

            <FlatList
                data={data}
                keyExtractor={item => item._id}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderFlatListItem}
                ref={flatlistRef}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
                initialNumToRender={1}
                extraData={SIZES.width}
            />

            {/* bottom section - pagination & next or getstarted button */}
            {renderBottomSection()}
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: COLORS.background
    }
})