import { Text, TextInput, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import React from "react"

const Search = ({ icon }) => {
    return (
        <View 
            style={{ 
                backgroundColor: '#fff',
                flexDirection: 'row',
                paddingVertical: 16,
                borderRadius: 8,
                paddingHorizontal: 16,
                marginVertical: 16,

                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 7,
            }}>
            <FontAwesome name={icon} size={24} color="#8BD8A2"/>
            <TextInput placeholder="Search" style={{ paddingLeft: 8, fontSize: 16, color: "#808080", width: "100%"}}>
            </TextInput> 
        </View>
    );
};

export default Search;