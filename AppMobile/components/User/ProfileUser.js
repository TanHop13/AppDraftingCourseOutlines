import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import * as ImgPicker from "expo-image-picker"
import React, { useContext, useState } from "react";
import { TouchableRipple } from "react-native-paper";
import { MyContext } from './../../configs/MyContext';
import API, { endpoints } from "../../configs/API";
import { useNavigation } from "@react-navigation/native";

const ProfileUser = () => {
    const { userInfo, isAuthenticated } = useContext(MyContext);
    const [error, setError] = useState("");

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const nav = useNavigation();

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

    const loadSet = () => {
        setFirstName(userInfo.user.first_name),
        setLastName(userInfo.user.last_name),
        setUsername(userInfo.user.username),
        setEmail(userInfo.user.email)
    }

    React.useEffect(()=>{
        loadSet();
    })

    const changeInfo = async () => {
        try {
            let res = await API.patch(endpoints['change-info'](userInfo.user.id), {
                first_name: firstName,
                last_name: lastName,
                email,
                username
            }, {
                headers: {
                    'Authorization': `Bearer ${userInfo.access}`
                }
            });

            if (res.status === 200) {
                console.log("Thay đổi ok");
                alert('Thay đổi thành công!!!');
            } else {
                setError(res.data.message || "Thay đổi không thành công");
            }
            
        } catch (error) {
            console.error("Lỗi khi gọi API chỉnh sửa:", error);
        }
    };

    const deleFrofile = async () => {
        try {
            let res = await API.delete(endpoints['delete-user'](userInfo.user.id), {
                headers: {
                    'Authorization': `Bearer ${userInfo.access}`
                }
            })

            if (res.status === 204) {
                Alert.alert("Xoá thành công")
                nav.navigate("Welcome")
            }
        } catch (error) {
            Alert.alert("Không thể xoá")
        }
    }

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
                                placeholder={userInfo.user.first_name}
                                style={{width: "100%"}}
                                onChangeText={setFirstName}
                            />
                        </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20}}>
                        <Text style={Style.text}>
                            Last name:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            placeholder={userInfo.user.last_name}
                            style={{width: "100%"}}
                            onChangeText={setLastName}
                            />
                        </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20, marginLeft:25}}>
                        <Text style={Style.text}>
                            Email:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            placeholder={userInfo.user.email}
                            style={{width: "100%"}}
                            onChangeText={setEmail}
                            />
                        </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom:8, marginTop: 20}}>
                        <Text style={Style.text}>
                            User name:
                        </Text>
                        <View style={Style.textInput}>
                            <TextInput
                            editable={false}
                            value={userInfo.user.username}
                            style={{width: "100%"}}
                            />
                        </View>
                </View>
            </View>
            <View style={{flexDirection: "row"}} >
                <TouchableOpacity style={Style.buttonChange} onPress={changeInfo}>
                    <Text style={{fontWeight: "bold"}}>
                        Change Profile
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={deleFrofile} style={Style.buttonDelete}>
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