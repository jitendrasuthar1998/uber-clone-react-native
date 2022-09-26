import { Dimensions } from "react-native"
const {height, width} = Dimensions.get("window");

export const COLORS = {
 primary: "#FF5678",
 black: "#171717",
 white: "#FFFFFF",
 background: "#FFFFFF"   
}

export const SIZES = {
    base: 5,
    height, width
}

const theme = {COLORS, SIZES}

export default theme;