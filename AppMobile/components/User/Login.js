import { Image, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react';
import UserStyles from "./UserStyles";
import { Ionicons } from "@expo/vector-icons";


const Login = ({navigation}) => {

    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);

    const handleLogin = async () => {
        
        try {
            const response = await fetch("https://tanhop13.pythonanywhere.com/users/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            data = await response.json();

            if (response.ok) {
                console.log("Đăng nhập thành công");
            } else {
                setError(data.message || "Đăng nhập không thành công");
            }

        } catch (error) {
            console.error("Lỗi khi gọi API đăng nhập:", error);
            setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
        }

    };

    return (
        <ScrollView style={{marginTop: StatusBar.currentHeight, backgroundColor: '#FFD1E3', }}>
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

                    <TouchableOpacity style={UserStyles.button} onPress={ () => navigation.navigate("Home")}>
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