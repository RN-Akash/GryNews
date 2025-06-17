import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Bookmark from './src/screens/Bookmarks';
import Splash from './src/screens/Splash';
import NewsDetails from './src/screens/NewsDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Bookmarks" component={Bookmark} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
