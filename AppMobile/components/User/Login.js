import { Alert, Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from 'react';
import UserStyles from "./UserStyles";
import { Ionicons } from "@expo/vector-icons";
import { MyContext, MyDispatcherContext } from "./../../configs/MyContext"
import API, { authAPI, endpoints } from "./../../configs/API"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Login = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const dispatch = useContext(MyDispatcherContext);
    const [error, setError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const { setUserInfo } = useContext(MyContext);

    // const change = (field, value) => {
    //     setUser(current => {
    //         return {...current, [field]:value}
    //     })
    // }

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                Alert.alert("Vui lòng nhập username và password")
                return;
            }
            setLoading(true);
            
            const res = await API.post(endpoints['login'], {
                username: username,
                password: password
            },{
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            });
            
            const data = res.data;
            
            if (res.status === 200) {
                setUserInfo(data);  // save global info
                Alert.alert("Đăng nhập thành công");
                navigation.navigate("Bottom");
            } else {
                Alert.alert("Username hoặc password không đúng.")
            }
        } catch (error) {
            Alert.alert("Username hoặc password không đúng.")
        } finally {
            setLoading(false);
        }
    };

    // const handleLogin =  async () => {
    //     setLoading(true);
    //     setError("");
        
    //     try {
    //         if (!user.username || !user.password) {
    //             setError("Vui lòng nhập username và password");
    //             return;
    //         }
            
    //         let res = await API.post(endpoints['login'], {
    //             ...user,
    //             'client_id': 'VPLp6vCsx4czHnt3iQYoPEzOmWnI8j3aikZcacZ6',
    //             'client_secret': 'uvCZQlTtfOgSmCI7zEpFgbHBR2EYyNPIpRbFbZmIErvD2t4gvWnqhfxxCLOBOkFasx7edy069Ay4eahR6SCzuQGf2XMdrG0A0QI6pHB8QQYySj2xSj6ugv63uhyc7awQ',
    //             'grant_type': 'password',
    //         })
            
    //         if (res.status === 200) {
    //             await AsyncStorage.setItem('access-token', res.data.access_token);
            
            
    //         setTimeout(async () => {
    //             let token = await AsyncStorage.getItem('access-token');
    //             let user = await authAPI(token).get(['current']);
    //             console.log("xem", user)
    //             AsyncStorage.setItem('user', JSON.stringify(user.data));
                
    //             dispatch({
    //                 "type": "login",
    //                 "payload": user.data
    //             });
                
    //             console.log("Đăng nhập thành công");
    //             navigation.navigate("Home");
    //         }, 100); } else {
    //             setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi gọi API đăng nhập:", error);
    //         setError("Username hoặc password không đúng.");

    //         if (error.response) {
    //             // Lỗi từ phía server
    //             setError("Lỗi: " + error.response.data.error || "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
    //         } else if (error.request) {
    //             // Không nhận được phản hồi từ server
    //             setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
    //         } else {
    //             // Lỗi khác
    //             setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <ScrollView style={{backgroundColor: '#FFD1E3', }}>
            <SafeAreaView>
                <View style={UserStyles.center}>

                    <Image 
                        source={require('../../imgs/Login.png')}
                        resizeMode="cover"
                        style={UserStyles.image}
                    />

                    <View style={UserStyles.textinput}>
                        <TextInput 
                            placeholder="Username ...."
                            value={username}
                            onChangeText={text => setUsername(text)}
                            style={{width: '100%'}}
                        />
                    </View>
                    
                    <View style={{flexDirection: 'row'}} >
                        <View style={UserStyles.textinput}>
                            <TextInput
                                secureTextEntry={isPasswordShown}
                                placeholder="Password ...."
                                value={password}
                                onChangeText={text => setPassword(text)}
                                style={{width:'100%'}} 
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 20,
                                top: 20,
                            }}>
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={25}  />
                                ) : (
                                    <Ionicons name="eye" size={25} />
                                )
                            }
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={UserStyles.button} loading={loading} onPress={handleLogin}>
                        <Text>LOGIN</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: "row", marginTop: 20}}>

                        <Text>Don't have an account ? </Text>

                        <Pressable onPress={ () => navigation.navigate("Register") } >
                            <Text style={UserStyles.text}>
                                Register
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
};

export default Login;