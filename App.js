import React from 'react'
import { View } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignupScreen/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/screens/LoginSignupScreen/SignupScreen';
import RootNavigation from './src/screens/RootNavigation';


function App() {
  return (
    <>

      {/* <WelcomeScreen/> */}
      {/* <LoginScreen/> */}
      {/* <SignupScreen /> */}

      <RootNavigation/>
      
    </>
  );
}



export default App;
