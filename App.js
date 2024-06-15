import React from 'react'
import { View } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignupScreen/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/screens/LoginSignupScreen/SignupScreen';
// import RootNavigation from './src/screens/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import UserProfile from './src/screens/UserProfile';
import ProductScreen from './src/screens/ProductScreen';

//home branch
function App() {

  const Stack = createNativeStackNavigator();
  return (
    <>
      {/* <RootNavigation/> */}
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

        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}



export default App;
