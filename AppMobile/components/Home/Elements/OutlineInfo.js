import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Image } from "react-native";
import { COLORS, Comment, Items } from "../../Json";
import Header from "./Header";
import { Entypo } from "@expo/vector-icons";
import UserStyles from "../../User/UserStyles";


const OutlineInfo = ({route, navigation}) => {
    const {outlineID} = route.params;
    const [outline, setOutline] = useState({});
    const [comment, setComment] = useState([]);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=>{
            getDataFromDB();
            getComFromDB();
        });

        return unsubscribe;
    }, [navigation])

    //get data from outlineID
    const getDataFromDB = async () => {
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].id == outlineID) {
                await setOutline(Items[index]);
                return;
            } else {
                
            }
        }

    }

    // get comment from outlineID
    const getComFromDB = () => {
        let commentList = []

        for (let index = 0; index < Comment.length; index++) {
            if (Comment[index].outlineID == outlineID) {
                commentList.push(Comment[index]);
            }
        };
        setComment(commentList);

    }

    //create commentcard
    const CommentCard = ({data}) => {
        return (
            <View style={{
                flexDirection: 'row',
                margin: 10
            }}>
                <Entypo name="user" style={{
                    fontSize: 33,
                    borderRadius: 10,
                    marginLeft: 10,
                    marginTop: 7,
                    color: 'blue'
                }}/>

                <Text style={{
                    margin: 15,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.black,
                    marginBottom: 2
                }}>
                    {data.username}
                </Text>

                <Text style={{
                    margin: 15,
                    fontSize: 18,
                    color: COLORS.black,
                    marginBottom: 2
                }}>
                    {data.content}
                </Text>

                <TouchableOpacity>
                    <View style={{marginBottom: 20}}>
                        <Entypo name="heart" style={{
                            fontSize: 33,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginTop: 7,
                            color: 'red'
                        }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.backgroundLight,
            position: 'relative'
        }}>
            <StatusBar backgroundColor={COLORS.backgroundLight} barStyle={'dark-content'}/>
            <ScrollView>

                <View style={{
                    width:'100%',
                    backgroundColor: COLORS.backgroundLight,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 4
                }}>
                    <View style={{
                        width:'100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingTop: 10,
                        paddingLeft: 16
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Entypo 
                                name="chevron-left"
                                style={{
                                    fontSize: 16,
                                    color: COLORS.backgroundDark,
                                    padding: 12,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10
                                }}
                            />
                        </TouchableOpacity>

                    </View>

                    <View style={{
                        width: '100%',
                        height: 240,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.backgroundMedium
                    }}>
                        <Image 
                            source={outline.outlineImage}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    height: 100
                }}>
                    <Text style={UserStyles.Text}> {outline.name} </Text>
                </View>

                <View style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <View style={{width:'100%', flexDirection: 'row'}}>
                        <Entypo name="message"
                                style={{
                                    fontSize: 33,
                                    borderRadius: 10
                                }}
                            />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingLeft: 5
                        }}>
                            COMMENTS
                        </Text>
                        
                    </View>
                        
                    <View>
                       {
                        comment.map(data => {
                            return <CommentCard data={data} key={data.id}/>
                        })
                       }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

export default OutlineInfo;