import { StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../Json";

export default StyleSheet.create({
    subject: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: StatusBar.currentHeight||0
    },
    Text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    Text1: {
        fontSize: 15,
        fontWeight: "bold",
        color: COLORS.black,
        marginBottom: 2
    },
    Element: {
        flex: 1,
    }
});