import { useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import UserStyles from "./UserStyles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import API, { endpoints } from "./../../configs/API";



const Register = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [error, setError] = useState("");

    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "username": "",
        "password": "",
        "avatar": ""
    })

    const [loading, setLoading] = useState(false);

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setUser(current => {
                    return { ...current, "avatar": result.assets[0] }
                });
        }
    }

    const change = (field, value) => {
        setUser(current => {
            return {...current, [field]:value}
        })
    }

    const handleRegister = async () => {
        if (!user.first_name.trim()) {
            alert('Vui lòng nhập tên.');
            return;
          }
      
          if (!user.last_name.trim()) {
            alert('Vui lòng nhập họ.');
            return;
          }
      
          if (!user.username.trim()) {
            alert('Vui lòng nhập username.');
            return;
          }
      
          if (!user.password.trim()) {
            alert('Vui lòng nhập password.');
            return;
          }
      
          if (!user.email.trim()) {
            alert('Vui lòng nhập email.');
            return;
          }
          if (!user.avatar) {
            alert('Vui lòng chọn avatar.');
            return;
          }
        setLoading(true)
        try {
            let form = new FormData();
            for (let key in user) {
                if (key==='avatar') {
                    form.append(key, {
                        uri: user.avatar.uri,
                        name: user.avatar.uri.split('/').pop(),
                        type: 'image/jpeg',
                    })
                } else
                    form.append(key, user[key])
            }

            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 201) {
                alert('Đăng ký thành công!!!');
                navigation.navigate("Login");
            } else if (res.status === 400){
                alert('Username đã tồn tại');
            } else {
                setError(res.data.message || "Đăng ký không thành công");
            }
            
        } catch (error) {
            alert('Username đã tồn tại');
        } finally {
            setLoading(false);
        }
    };


    return (
        <ScrollView style={{ marginTop: StatusBar.currentHeight, backgroundColor: '#B7C9F2'}}>
            <SafeAreaView>
                <View style={UserStyles.subject} >
                    <View>
                        <Text style={UserStyles.Text}>
                            CREATE ACCOUNT
                        </Text>
                        <Text style={UserStyles.Text2}>
                            Explore the content now!!!
                        </Text>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            First name
                        </Text>
                        <View style={UserStyles.textinput}>
                            <TextInput 
                            placeholder="Enter your first name"
                            onChangeText={t => change("first_name", t)}
                            value={user.first_name}
                            style={{width: "100%"}}
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Last name
                        </Text>
                        <View style={UserStyles.textinput}>
                            <TextInput 
                            placeholder="Enter your last name"
                            onChangeText={t => change("last_name", t)}
                            value={user.last_name}
                            style={{width: "100%"}}
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Phone number
                        </Text>
                        <View style={UserStyles.TextInputPhone}>
                            <TextInput 
                            placeholder="+84"
                            placeholderTextColor="black"
                            keyboardType="numeric"
                            //set Phone number
                            style={{width: "12%",
                                    borderRightWidth: 1,
                                    borderRightColor: "black",
                                    height: "100%"
                                    }}
                            />
                            <TextInput 
                            placeholder="Enter your phone number"
                            keyboardType="numeric"
                            style={{width: "82%"}}
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Email address
                        </Text>
                        <View style={UserStyles.textinput}>
                            <TextInput 
                            keyboardType="email-address"
                            placeholder="Enter your email address"
                            onChangeText={t => change("email", t)}
                            value={user.email}
                            style={{width: "100%"}}
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Username
                        </Text>
                        <View style={UserStyles.textinput}>
                            <TextInput 
                            placeholder="Enter your username"
                            onChangeText={t => change("username", t)}
                            value={user.username}
                            style={{width: "100%"}}
                            />
                        </View>
                    </View>

                    <View style={{marginBottom:8}}>
                        <Text style={UserStyles.Text3}>
                            Password
                        </Text>
                        <View style={UserStyles.textinput}>
                            <TextInput 
                            placeholder="Enter your password"
                            onChangeText={t => change("password", t)}
                            value={user.password}
                            style={{width: "100%"}}
                            secureTextEntry={isPasswordShown}
                            />
                            <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12,
                            }}>
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} />
                                    ) : (
                                        <Ionicons name="eye" size={24} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableRipple onPress={picker} style={{
                                width:"100%",
                                backgroundColor:"aqua",
                                height: 50,
                                marginTop: 10,
                                padding: 5,
                                marginBottom: 5
                            }}>
                        <Text style={{
                            fontSize: 15, 
                            fontWeight: "bold",
                        }}>Chọn ảnh đại diện ...</Text>
                    </TouchableRipple>
                    {/* Hien avatar */}
                    {user.avatar?<Image style={{ width: 100, height: 100 }} 
                                        source={{ uri: user.avatar.uri }}/>:""}

                    <TouchableOpacity loading={loading} style={UserStyles.button1} onPress={handleRegister}>
                        <Text style={UserStyles.Text}>
                            Sign up
                        </Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 22,

                    }}>
                        <Text style={UserStyles.Text3}>Already have an account</Text>
                        <Pressable
                        onPress={() => navigation.navigate("Login")}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginVertical: 6,
                                marginLeft: 6,
                                color: "blue"
                            }}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
};

export default Register;