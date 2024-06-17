import { Alert, Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from 'react';
import UserStyles from "./UserStyles";
import { Ionicons } from "@expo/vector-icons";
import { MyContext, MyDispatcherContext } from "./../../configs/MyContext"
import API, { authAPI, endpoints } from "./../../configs/API"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client_id, client_secret } from '@env';


const Login = ({navigation}) => {

    // const [user, setUser] = useState({
    //     "username": "",
    //     "password": ""
    // })
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useContext(MyDispatcherContext);
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
            console.log(res)
            
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
            console.log('loi', error)
        } finally {
            setLoading(false);
        }
    };

    // const handleLogin =  async () => {
    //     setLoading(true);

    //     const headers = {
    //          'Content-Type': 'application/form-data'
    //     };

    //     try {
    //         if (!user.username || !user.password) {
    //             setError("Vui lòng nhập username và password");
    //             Alert.alert("Không được bỏ trống ô nào");
    //             return;
    //         }
    //         console.log(user.username),
    //         console.log(user.password)
            
    //         let res = await API.post(endpoints['login'], {
    //             'username': user.username,
    //             'password': user.password,
    //             // ...user,
    //             'client_id': `${client_id}`,
    //             'client_secret': `${client_secret}`,
    //             'grant_type': 'password',
    //         }, {headers});

    //         console.log('t',res),
    //         AsyncStorage.setItem('token', res.data.access_token);
            
    //         setTimeout(async () => {
    //             let token = await AsyncStorage.getItem('access-token');
    //             let user = await authAPI(token).get(endpoints['current-user']);

    //             AsyncStorage.setItem('user', JSON.stringify(user.data));
                
    //             dispatch({
    //                 "type": "login",
    //                 "payload": user.data
    //             });
                
    //             Alert.alert("Đăng nhập thành công");
    //             navigation.navigate('Home');
    //         }, 1000);

    //     } catch (error) {
    //         console.log("Lỗi khi gọi API đăng nhập:", error);
    //         Alert.alert("Username hoặc password không đúng.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <ScrollView style={{backgroundColor: '#FFD1E3'}}>
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
                            onChangeText={t => setUsername(t)}
                            style={{width: '100%'}}
                        />
                    </View>
                    
                    <View style={{flexDirection: 'row'}} >
                        <View style={UserStyles.textinput}>
                            <TextInput
                                secureTextEntry={isPasswordShown}
                                placeholder="Password ...."
                                value={password}
                                onChangeText={t => setPassword(t)}
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