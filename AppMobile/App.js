import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import Welcome from './components/WelCome/Welcome';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Home from './components/Home/Home';
import OutlineInfo from './components/Home/Elements/OutlineInfo';
import ProfileUser from './components/User/ProfileUser';
import Search from './components/Home/Elements/Search';
import Ionic from 'react-native-vector-icons/Ionicons';
import Logout from './components/User/Logout';
import { MyProvider } from './configs/MyContext';
import ConfirmLogout from './components/User/Logout';

const App = () => {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = () => {
    setShowConfirmLogout(true);
  };

  const handleCancelLogout = () => {
    setShowConfirmLogout(false);
  };

  const handleConfirmLogout = () => {
    setShowConfirmLogout(false);
  };
  
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
            height: 50,
          },

          tabBarIcon: ({focused, size, colour}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
              size = focused ? size + 8 : size + 2;
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            }else if (route.name === 'ProfileUser') {
              iconName = focused ? 'person' : 'person-outline';
            } else if(route.name === 'Logout') {
              iconName = focused ? 'log-out' : 'log-out-outline';
            }

            return <Ionic name={iconName} size={size} color={colour} />;
          },
        })}>

        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="ProfileUser" component={ProfileUser} />
        <Tab.Screen
          name="Logout"
          component={Logout}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              handleLogout();
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='WelCome'>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Bottom" component={BottomTabScreen} />
          <Stack.Screen name="OutlineInfo" component={OutlineInfo} />
        </Stack.Navigator>
        {showConfirmLogout && (
                <ConfirmLogout
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                />
            )}
      </NavigationContainer>
    </MyProvider>
  )
};

export default App;