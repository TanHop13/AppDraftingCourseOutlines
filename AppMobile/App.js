import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './components/WelCome/Welcome';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Home from './components/Home/Home';
import OutlineInfo from './components/Home/Elements/OutlineInfo';



const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='WelCome'>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OutlineInfo" component={OutlineInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;