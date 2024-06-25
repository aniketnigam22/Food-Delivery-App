import React from 'react'
import { View } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignupScreen/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/screens/LoginSignupScreen/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import UserProfile from './src/screens/UserProfile';
import ProductScreen from './src/screens/ProductScreen';
import UserCart from './src/screens/UserCart';
import PlaceOrder from './src/screens/PlaceOrder';
import TrackOrder from './src/screens/TrackOrder';


function App() {
  
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
          initialRouteName='WelcomeScreen'
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen name="UserCart" component={UserCart} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}



export default App;
