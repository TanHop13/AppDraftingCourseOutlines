import HomeStyles from "./HomeStyles"
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import React from "react";
import { COLORS } from "../Json";
import Search from "./Elements/Search";
import Header from "./Elements/Header";
import Outline from "./Elements/Outline";


const Home = () => {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView style={HomeStyles.subject}>
                <Header headerText={"Hi bro"} headerIcon={"bell-o"} />
                <Search icon={"search"} />

                <View>
                    <Text style={HomeStyles.Text}>K20</Text>
                    <Outline />
                </View>

                <View style={HomeStyles.Element}>
                    <Text style={HomeStyles.Text}>K21</Text>
                    <Outline />
                </View>
            </ScrollView>
        </>
    )
};

export default Home;