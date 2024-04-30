import { useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import UserStyles from "./UserStyles";
import { Ionicons } from "@expo/vector-icons";



const Register = ({navigation}) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted'){
            Alert.alert('Quyền bị từ chối!', 'Bạn cần phải cho phép quyền truy cập hình ảnh.');
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.uri);
        }
    };

    const handleRegister = async () => {
        try { 
            const response = await fetch("https://tanhop13.pythonanywhere.com/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                    firstname,
                    lastname,
                    email,
                    avatar,
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Đăng ký thành công");
            } else {
                setError(data.message || "Đăng ký không thành công")
            };
        } catch (error) {
            console.error("Lỗi khi gọi API đăng ký:", error);
            setError("Đã xảy ra lỗi khi đăng ký, vui lòng thử lại sau!")
        };
    };


    return (
        <ScrollView style={{marginTop: 10 + StatusBar.currentHeight, backgroundColor: '#B7C9F2'}}>
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
                            onChangeText={text => setFirstname(text)}
                            value={firstname}
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
                            onChangeText={text => setLastname(text)}
                            value={lastname}
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
                            style={{width: "82%",
                                    
                                    }}
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
                            onChangeText={text => setEmail(text)}
                            value={email}
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
                            onChangeText={text => setUsername(text)}
                            value={username}
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
                            onChangeText={text => setPassword(text)}
                            value={password}
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
                    <TouchableOpacity style={UserStyles.button1} onPress={ () => navigation.navigate("Login") }>
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