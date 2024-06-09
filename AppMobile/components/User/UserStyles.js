import { StyleSheet, StatusBar } from "react-native";
import { COLORS } from "../Json";


const UserStyles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 180
    },
    image: {
        width: '100%',
        height: 250
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
        width: '60%',
        height: 78,
        marginLeft: 'auto',
        marginRight: 'auto',
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