import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native'
import React from 'react'


const {height, width} = Dimensions.get("window");
const GrowcifyOnboarding = () => {
    return (
        <ImageBackground source={require("../assets/images/grocery1.jpg")} style={{ flex: 1 }}>
             {/* <StatusBar/> */}
            <View style={{ flex: 0.6 }}>
            </View>
            <View style={{ flex: 0.4, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
                <Text style={{textAlign:"center", fontFamily:"sans-serif", fontSize: 30, fontWeight:"500", marginTop:20}}>fresh groceries to your doorstep</Text>
                <Text style={{textAlign:"center", fontFamily:"sans-serif", fontSize: 16, marginTop:20}}>now order online and get fresh groceries to your doorstep. no more waiting at the store</Text>

                <View style={{ flex:1, marginTop:10, alignItems:"center", justifyContent:"center"}}>
                    <TouchableOpacity style={{height: 60, width: width * 0.9, backgroundColor:"red", justifyContent:"center", alignItems:"center", borderRadius:15 }}>  
                        <Text style={{color:"white"}}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default GrowcifyOnboarding

const styles = StyleSheet.create({})