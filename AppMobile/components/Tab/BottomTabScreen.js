import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

const BottomTabView = () => {
  const Tab = createMaterialTopTabNavigator();

  let squares = [];
  let numberOfSquare = 7;

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View key={index} style={styles.squareContainer}>
        <TouchableOpacity>
          <View style={styles.square}>
            <Image
              source={require('../../storage/images/post2.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };
  const Video = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };
  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          color: 'black',
        },
      }}>
      {/* <Tab.Screen 
        name="Posts" 
        component={Posts} 
        options={{ tabBarLabel: 'All Posts' }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareContainer: {
    marginVertical: 0.5,
  },
  square: {
    width: 130,
    height: 150,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default BottomTabView;