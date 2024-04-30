import { StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
    subject: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 10+StatusBar.currentHeight||0,
    },
    Text: {
        fontSize: 20,
        fontWeight: "bold",

    },
    Element: {
        flex: 1,
    }
});