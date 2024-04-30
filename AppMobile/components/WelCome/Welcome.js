import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from 'react';
import WelStyles from "./WelStyles";


const Welcome = ({navigation}) => {

    
    return (
        <View style={WelStyles.center}>
            <Image
                source={require('../../imgs/final.png')}
                resizeMode="cover"
                style={WelStyles.image}
            />

            <TouchableOpacity style={WelStyles.button} onPress={ () => navigation.navigate("Login")}>
                <Text>LET GO</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Welcome;