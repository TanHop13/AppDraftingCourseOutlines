import { StyleSheet, StatusBar } from "react-native";
import { COLORS } from "../Json";


const UserStyles = StyleSheet.create({
    center: {
        flex: 1,
        marginTop: 10 + StatusBar.currentHeight||0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD1E3',
        marginHorizontal: 10
    },
    image: {
        width: '95%',
        height: '38%',
        margin: 10,
        marginTop: 10+StatusBar.currentHeight||0,
    },
    subject: {
        marginHorizontal: 20,
    },
    Text: {
        fontSize: 22, 
        fontWeight: "bold",
        marginVertical: 8,
        color: COLORS.black,
    },
    Text2: {
        fontSize: 16, 
        color: COLORS.black,
    }, 
    Text3: {
        fontSize: 16,
        marginVertical: 6,
        fontWeight: "400",

    },
    textinput: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 8,
        fontSize: 16,
        width: "100%",
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
        margin: 10,
        backgroundColor: 'white',
    },
    textinput1: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 8,
        fontSize: 16,
        width: 391,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
        margin: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#94FFD8',
        borderRadius: 20,
        paddingVertical: 14,
        width: 200,
        alignItems: 'center',
        marginTop: 25,
    },
    button1: {
        backgroundColor: '#94FFD8',
        borderRadius: 20,
        paddingVertical: 14,
        width: '50%',
        height: 77,
        marginLeft: '25%',
        marginRight: '25%',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        fontWeight: 'bold',
        color: "#836FFF"
    },
    TextInputPhone: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 8,
        fontSize: 16,
        flexDirection: 'row',
        width: "100%",
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        backgroundColor: 'white',
        margin: 10,
    },
});

export default UserStyles;