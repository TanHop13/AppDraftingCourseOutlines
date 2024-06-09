import HomeStyles from "./HomeStyles"
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { COLORS, Items } from "../Json";
import Search from "./Elements/Search";
import Header from "./Elements/Header";



const Home = ({navigation}) => {

    const [outlinek20, setOutlinek20] = useState([])
    const [outlinek21, setOutlinek21] = useState([])
    const [outlinek22, setOutlinek22] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=>{
            getDataFromDB()
        });

        return unsubscribe;
    }, [navigation])
    
    // get data from DB
    const getDataFromDB = () => {
        let outlinek20List = []
        let outlinek21List = []
        let outlinek22List = []
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].course == "k20") {
                outlinek20List.push(Items[index]);
            } else if (Items[index].course == "k21") {
                outlinek21List.push(Items[index]);
            }  else if (Items[index].course == "k22") {
                outlinek22List.push(Items[index]);
            }
        }

        setOutlinek20(outlinek20List);
        setOutlinek21(outlinek21List);
        setOutlinek22(outlinek22List);
    }

    // create an outline reusable card
    const OutlineCard = ({data}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("OutlineInfo", {outlineID: data.id})}
             style={{
                width: '50%',
                marginVertical: 15
            }}>
                <View style={{
                    width: '85%',
                    height: 165,
                    borderRadius: 10,
                    backgroundColor: COLORS.backgroundLight,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8
                }}>
                    <Image  source={data.outlineImage}
                            style={{
                                width: '100%',
                                height: '90%',
                                resizeMode: 'contain'
                            }}
                    />
                </View>
                <Text style={HomeStyles.Text1}>
                    {data.name}
                </Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: "#C0D6E8"
        }}>
            <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} />
            <ScrollView>

                <Header headerText={"Hi bro"} />

                <Search icon={"search"} />

                <View style={{
                    padding: 16,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <View>
                        <Text style={HomeStyles.Text}>K20</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                    }}>
                        {
                            outlinek20.map(data => {
                                return <OutlineCard data={data} key={data.id} />
                            })
                        }
                    </View>
                </View>

                <View style={{
                    padding: 16,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <View>
                        <Text style={HomeStyles.Text}>K21</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                    }}>
                        {
                            outlinek21.map(data => {
                                return <OutlineCard data={data} key={data.id} />
                            })
                        }
                    </View>
                </View>

                <View style={{
                    padding: 16,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <View>
                        <Text style={HomeStyles.Text}>K22</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                    }}>
                        {
                            outlinek22.map(data => {
                                return <OutlineCard data={data} key={data.id} />
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

export default Home;