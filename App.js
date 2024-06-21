import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignupScreen/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/screens/LoginSignupScreen/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import UserProfile from './src/screens/UserProfile';
import ProductScreen from './src/screens/ProductScreen';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    // Request user permission for notifications
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();

    // Handle background and foreground notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Get the device token
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('Device FCM Token:', token);
    };

    getToken();

    return messaging().onTokenRefresh(token => {
      console.log('Device FCM Token refreshed:', token);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='WelcomeScreen'
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
