import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import React, { useState } from "react"
import { COLORS } from "../../Json";
import { TextInput } from "react-native-paper";
import API, { endpoints } from "../../../configs/API";

const Search = () => {

    const [value, setValue] = useState('');

    const [subname, setSubName] = useState([]);
    const [loading, setLoading] = useState(false);

    const LoadName = async () => {
        setLoading(true)
        try {
            let res = await API.get(endpoints['subjects']);
            setSubName(res.data)
        } catch (error) {
            Alert.alert("Không có môn này!!!")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(()=>{
        LoadName();
    }, [])

    return (
        <View tyle={Style.container}>
            <View style={Style.searchBar}>
                <TextInput
                    onChangeText={t => setValue(t)}
                    value={value}
                    placeholder="Search"
                />
                <TouchableOpacity style={Style.searchButton}>
                    <FontAwesome size={24} color="#8BD8A2" name="search"/>
                </TouchableOpacity>
            </View>

            <View>
                {subname.filter(s => s.name === value).map(s => {
                    <Text>
                        {s.name}
                    </Text>
                })}
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
    container: {
        paddingTop: 50,  
        backgroundColor: '#fff',  
    },
    searchBar: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#8BD8A2', 
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        margin: 10,

    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 10,
    },
    searchButton: {
        marginRight: 5
    },
})

export default Search;