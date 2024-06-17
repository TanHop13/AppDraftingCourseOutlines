import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Platform, Image, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator, Button, TextInput, Alert, RefreshControl } from "react-native";
import { COLORS } from "../../Json";
import { Entypo } from "@expo/vector-icons";
import API, { endpoints } from "../../../configs/API";
import RenderHTML from "react-native-render-html";
import { MyContext } from "../../../configs/MyContext";
import moment from "moment";
import * as FileSystem from 'expo-file-system'
import axios from "axios";



const OutlineInfo = ({route, navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    };
    
    
    const {outlineID, subjectID} = route.params;

    const [loading, setLoading] = useState(false);
    const [outline, setOutline] = useState([]);
    const [comment, setComment] = useState([]);
    const [subject, setSubject] = useState([]);
    const [user, setUser] = useState([]);
    const { userInfo, isAuthenticated } = useContext(MyContext);

    const contentWidth = Dimensions.get('window').width;

    const loadOutline = async () => {
        try {
            const id = parseInt(outlineID);
            let res = await API.get(endpoints['outlines'])
            let trueOut = res.data.filter(r => r.id === id);
            setOutline(trueOut);
        } catch (error) {
            console.error(error);
        } 
    };
    
    React.useEffect(() => {
        loadOutline();
    }, [])

    let loadSuject = async () => {
        try {
            const id = parseInt(subjectID);
            let res = await API.get(endpoints['subjects'])
            const trueSub = res.data.filter(t => t.id === id);
            setSubject(trueSub);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadSuject();
    }, [])

    const loadUser = async () => {
        try {
            let res = await API.get(endpoints['user'])
            setUser(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadUser();
    }, [])

    const baseURL = 'https://res.cloudinary.com/dvzsftuep/';
    const loadImg = (data) => {
        const searchString = 'image/upload/';
        const link = 'http://res.cloudinary.com/dvzsftuep/image/upload/v1718008117/e83yxveneoxzwh4ehfvu.png';
        let arr = [];
        arr = subject.filter(s => s.id == data).map(s => s.image);
        if (Array.isArray(arr)) {
            let string = arr.join();
            string = string.replace(new RegExp(searchString), '');
            if (string.includes(baseURL)) {
                return string;
            };
            let full = baseURL+string;
            return full;
        }
        return link;
    }


    // show comment
    React.useEffect(() => {
        const loadComments = async () => {
            try {
                if (isAuthenticated()) {
                    const res = await API.get(endpoints['getcomments'](outlineID), {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    });
                    setComment(res.data);
                } else {
                    console.log('Người dùng chưa được xác thực');
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        loadComments();
    }, []);


    //add comments
    const [commentContent, setCommentContent] = useState('');

    const handleSendComment = async () => {
        if (!commentContent) {
            Alert.alert("Vui lòng nhập comment!!!");
            return;
        }

        setLoading(true);
        try {
            if (isAuthenticated()) {
                const response = await API.post(endpoints['createcomments'](outlineID), {
                        content: commentContent,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.access}`,
                        },
                    }
                );
                // console.log("Nội dung bình luận:", response.data);
                const newComment = response.data;
                setComment([newComment, ...comment]);
                setCommentContent('');
            } else {
                console.log('Người dùng chưa được xác thực');
            }
        } catch (error) {
            console.error('Lỗi khi thực hiện bình luận', error);
        } finally {
            setLoading(false)
        }
    };

    const handDownload = () => {
    }
    // const loadLink = (data) => {
    //     const searchString = 'image/upload/';
    //     string = data.replace(new RegExp(searchString), '');
    //     let full = baseURL+string;
    //     return full;
    // }
    const handleDownload = async () => {
        const x = outline.map(o=>o.up_file);
        const fileUrl = baseURL+x;
        const api_key = '324543578155587'
        
        try {
          const response = await axios.get(fileUrl, {
            responseType: 'blob', // Đặt responseType là 'blob' để nhận dữ liệu nhị phân
            headers: {
                Authorization: `Bearer ${api_key}`,
                api_secret: 'pebjWYOWAY3PHi0_zgN6f15Osd4'
              }
          });
          
          const pdfUri = FileSystem.cacheDirectory + 'downloaded.pdf'; // Lưu trữ đường dẫn lưu trữ cục bộ
          
          await FileSystem.writeAsStringAsync(pdfUri, response.data, {
            encoding: FileSystem.EncodingType.Base64, // Lưu dưới dạng Base64
          });
          
          Alert.alert('Downloaded Successfully', `PDF file downloaded to ${pdfUri}`);
        } catch (error) {
          console.error('Error downloading file:', error);
          Alert.alert('Download Failed', 'Failed to download PDF file');
        }
      };


    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.backgroundLight,
            position: 'relative'
        }}>
            <StatusBar backgroundColor={COLORS.backgroundLight} barStyle={'dark-content'}/>
            <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={Style.view1}>
                    <View style={Style.view2}>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Entypo 
                                name="chevron-left"
                                style={Style.entypo}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{backgroundColor:COLORS.backgroundMedium}}>
                    {subject===null?<ActivityIndicator/>:
                        <>
                            {subject.map(s => (
                                <View key={s.id}>
                                    {s.image?<Image style={Style.img} source={{ uri: loadImg(s.id) }}/>:""}
                                </View>
                            ))}
                        </>
                    }
                </View>
                <View>
                    {outline===null?<ActivityIndicator/>:
                        <>
                            {outline.map(o => (
                                <View key={o.id}>
                                    {o.name?<Text style={Style.textName}>
                                        Tên: {o.name}
                                    </Text>:""}
                                </View>
                            ))}
                        </>
                    }
                </View>
                <SafeAreaView style={{flex:1, justifyContent:'center', margin: 10}}>
                    <View style={{fontSize: 20, flex: 1,}}>
                        {outline===null?<ActivityIndicator/>:
                            <>
                                {outline.map(o => (
                                    <View key={o.id}>
                                        <Text key={o.id} style={{fontSize:20, fontWeight:'bold'}}>Mô tả:</Text>
                                        {o.description?<RenderHTML
                                            contentWidth={contentWidth}
                                            source={{html: o.description}}
                                        />:(null)}
                                    </View>
                                ))}
                            </>
                        }
                    </View>
                </SafeAreaView>

                <View>
                    {user===null?<ActivityIndicator/>:<>
                        {user.filter(u => outline.map(o => o.user).includes(u.id)).map(u => (
                            <View style={{flexDirection: 'row'}}>
                                <Text style={Style.textName}>Tên giảng viên: </Text>
                                <Text style={Style.textName1}>
                                    {u.last_name} {u.first_name}
                                </Text>
                            </View>
                        ))}
                    </>}
                </View>
                <View style={Style.container}>
                    {/* <Button style={Style.button} onPress={handDownload} title="DOWNLOAD FILE HERE"/> */}
                    <Button title="Download PDF" onPress={handleDownload} />
                </View>

                <View>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: 10}}>Comments</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, borderColor: COLORS.grey, borderRadius: 30, padding: 10 }}
                            placeholder="  Nhập nội dung bình luận..."
                            value={commentContent}
                            onChangeText={setCommentContent} 
                        />

                        <TouchableOpacity onPress={handleSendComment}  style={{ marginLeft: 10, padding: 15, backgroundColor: COLORS.primary, borderRadius: 10 }}>
                            <Text style={{ color: COLORS.white }}>Gửi</Text>
                        </TouchableOpacity>
                    </View>

                    {comment===null?<ActivityIndicator/>:<>
                        {comment.map(c => (
                            <View  style={{flexDirection: 'row'}}>
                                {c.user.avatar?<Image style={Style.ava} source={{ uri: c.user.avatar }}/>:""}
                                <View style={{ flex: 1, marginLeft: 20, marginTop: 5}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{ fontWeight: 'bold' , fontSize: 15}}>
                                            {c.user.first_name} 
                                        </Text>
                                        <Text style={{ fontSize: 12, color: 'grey', top: 2, left: 8 }}>{moment(c.created_date).fromNow()}</Text>
                                    </View>
                                    <Text style={{fontSize: 18}}>
                                        {c.content}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </>}
                </View>

            </ScrollView>
        </View>
    )
};

const Style = StyleSheet.create({
    view1: {
        width:'100%',
        backgroundColor: COLORS.backgroundLight,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4
    },
    view2: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingLeft: 16
    },
    entypo: {
        fontSize: 16,
        color: COLORS.backgroundDark,
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 10
    },
    img: {
        width: 230,
        height: 300,
        alignContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5
    },
    textName1: {
        fontSize: 20,
        margin: 5,
        alignContent: 'center'
    },
    textName2: {
        fontSize: 25,
        margin: 10,
        alignContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
      },
    button: {
        borderRadius: 20,
    },
    ava: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        margin: 8
    },
    textStyle: {
        color: 'white',
        fontSize: 14,
        paddingHorizontal: 25,
    },
    btnStyle: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: 150,
        height: 40,
    },
    pdf: {
        flex: 1,
        width: '100%',
        height: '100%'
      },
})

export default OutlineInfo;