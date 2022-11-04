import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatList from './src/screens/ChatList'
import ChatScreen from './src/screens/ChatScreen'

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false}}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false}}/>
        <Stack.Screen name='ChatList' component={ChatList} options={{ title: 'Chat List'}}/>
        <Stack.Screen name='ChatScreen' component={ChatScreen} options={{ title: 'Chat'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}