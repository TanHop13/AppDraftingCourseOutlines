import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as ImgPicker from "expo-image-picker"
import React, { useContext, useState } from "react";
import { TouchableRipple } from "react-native-paper";
import { MyContext } from './../../configs/MyContext';
import API, { endpoints } from "../../configs/API";

const ProfileUser = () => {
    const [image, setImage] = useState();
    const { userInfo, isAuthenticated } = useContext(MyContext);
    const [error, setError] = useState("");

    const picker = async () => {
        let { status } = await ImgPicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImgPicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setImage(result.assets[0])
            }
        }
    };

    const changeInfo = async () => {
        try {
            let form = new FormData();
            for (let key in userInfo.user) {
                if (key==='avatar') {
                    form.append(key, {
                        uri: userInfo.user.avatar.uri,
                        name: userInfo.user.avatar.uri.split('/').pop(),
                        type: 'image/jpeg',
                    })
                } else
                    form.append(key, userInfo.user[key])
            }

            let res = await API.put(endpoints['change-info'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                console.log("Thay đổi ok");
                alert('Thay đổi thành công!!!');
                navigation.navigate("Login");
            } else {
                setError(res.data.message || "Thay đổi không thành công");
            }
            
        } catch (error) {
            console.error("Lỗi khi gọi API đăng ký:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <View style={{justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{fontSize: 30, fontWeight: "bold", color: "blue"}}>
                    YOUR PROFILE
                </Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center',}}>
                
                <TouchableOpacity onPress={picker}>
                    {userInfo.user.avatar?<Image style={{ width: 190, height: 190 }} 
                                                source={{ uri: userInfo.user.avatar }}/>:""}
                </TouchableOpacity>
                
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20}}>
                        <Text style={Style.text}>
                            First name:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            value={userInfo.user.first_name}
                            style={{width: "100%"}}
                            />
                        </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20}}>
                        <Text style={Style.text}>
                            Last name:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            value={userInfo.user.last_name}
                            style={{width: "100%"}}
                            />
                        </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20}}>
                        <Text style={Style.text}>
                            User name:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            value={userInfo.user.username}
                            style={{width: "100%"}}
                            />
                        </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20}}>
                        <Text style={Style.text}>
                            Password:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            value={userInfo.user.password}
                            style={{width: "100%"}}
                            />
                        </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20, marginLeft:25}}>
                        <Text style={Style.text}>
                            Email:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            value={userInfo.user.email}
                            style={{width: "100%"}}
                            />
                        </View>
                </View>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={Style.buttonChange} onPress={changeInfo}>
                    <Text style={{fontWeight: "bold"}}>
                        Change Profile
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.buttonDelete}>
                    <Text style={{fontWeight: "bold"}}>
                        Delete Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
  );
};

const Style = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        fontSize: 16,
        width: "70%",
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 22,
        margin: 10,
        backgroundColor: 'white'
    },
    text: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 20
    },
    buttonChange: {
        backgroundColor: '#94FFD8',
        borderRadius: 30,
        paddingVertical: 14,
        width: 150,
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 30
    },
    buttonDelete: {
        backgroundColor: '#FF0000',
        borderRadius: 30,
        paddingVertical: 14,
        width: 150,
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 30
    },
})
export default ProfileUser;