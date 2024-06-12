import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { btn1, color, hr80, title } from '../../global/GlobalStyle'
import { Icon } from 'react-native-elements';


const SignupScreen = ({ navigation }) => {

  const [emailFocus, setEmailFoucs] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [phoneFoucs, setPhoneFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false)

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.head1}>Sign Up</Text>
          {/* name start */}
          <View style={styles.inputOut}>
            <Icon name="people" size={30} color={nameFocus === true ? color.text1 : color.text2} />
            <TextInput
              style={styles.input}
              placeholder='Full Name'
              placeholderTextColor={color.text2}

              onFocus={() => {
                setEmailFoucs(false)
                setShowPassword(false)
                setPasswordFocus(false)
                setPasswordConfirmFocus(false)
                setPhoneFocus(false)
                setNameFocus(true)
              }}
            />
          </View>
          {/* name end */}
          {/* email start */}
          <View style={styles.inputOut}>
            <Icon name="email" size={30} color={emailFocus === true ? color.text1 : color.text2} />
            <TextInput
              style={styles.input}
              placeholderTextColor={color.text2}

              placeholder='Email'
              onFocus={() => {
                setEmailFoucs(true)
                setShowPassword(false)
                setPasswordFocus(false)
                setPasswordConfirmFocus(false)
                setPhoneFocus(false)
                setNameFocus(false)
              }}
            />
          </View>
          {/* email end */}

          {/* phone number start */}
          <View style={styles.inputOut}>
            <Icon name="phone" size={30} color={phoneFoucs === true ? color.text1 : color.text2} />
            <TextInput
              style={styles.input}
              placeholder='Phone Number'
              placeholderTextColor={color.text2}

              onFocus={() => {
                setPhoneFocus(true)
                setShowPassword(false)
                setPasswordFocus(false)
                setPasswordConfirmFocus(false)
                setNameFocus(false)

              }}
              keyboardType='numeric'
            />
          </View>
          {/* phone number end */}

          {/* password start */}
          <View style={styles.inputOut}>
            <Icon
              name='lock'
              type='evilicon'
              size={35}
              color={passwordFocus === true ? color.text1 : color.text2}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              placeholderTextColor={color.text2}
              onFocus={() => {
                setEmailFoucs(false)
                setPasswordFocus(true)
                setPasswordConfirmFocus(false)
                setPhoneFocus(false)
                setNameFocus(false)

              }}
              secureTextEntry={showPassword === true ? false : true}
            />
            <Icon
              name={showPassword === false ? 'eye' : 'close'}
              type='evilicon'
              size={30}
              color="black"
              onPress={() => {
                setShowPassword(!showPassword)
              }}
            />
          </View>
          {/* password end */}

          {/* confirm password start */}
          <View style={styles.inputOut}>
            <Icon
              name='lock'
              type='evilicon'
              size={35}
              color={passwordConfirmFocus === true ? color.text1 : color.text2}
            />
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              placeholderTextColor={color.text2}

              onFocus={() => {
                setEmailFoucs(false)
                setPasswordFocus(false)
                setPasswordConfirmFocus(true)
                setPhoneFocus(false)
                setNameFocus(false)

              }}
              secureTextEntry={showConfirmPassword === true ? false : true}
            />
            <Icon
              name={showConfirmPassword === false ? 'eye' : 'close'}
              type='evilicon'
              size={30}
              color="black"
              onPress={() => {
                setShowConfirmPassword(!showConfirmPassword)
              }}
            />
          </View>
          {/* confirm password end */}
          {/* address start */}
          <Text style={styles.address}>Please enter your address</Text>

          <View style={styles.inputOut}>
            <TextInput
              placeholder='Enter your Address'
              placeholderTextColor={color.text2}
              style={styles.input}
              onFocus={() => {
                setEmailFoucs(false)
                setPasswordFocus(false)
                setPasswordConfirmFocus(false)
                setPhoneFocus(false)
                setNameFocus(false)
              }}
            />
          </View>
          {/* adress end  */}


          <TouchableOpacity style={btn1}>
            <Text style={styles.singInButton}>Sign Up</Text>
          </TouchableOpacity>


          <Text style={styles.or}>Or</Text>
          <Text style={styles.signInWith}>Sign in with</Text>

          <View>
            <TouchableOpacity style={styles.signInWithContainer}>
              <Icon
                name='facebook'
                size={35}
                color={'#4267B2'}
              />
            </TouchableOpacity>
          </View>

          <View style={hr80}></View>

          <View>
            <Text style={styles.bottomText}>Already have an account?  <Text style={styles.bottomInnerText} onPress={() => (
              navigation.navigate('LoginScreen')
            )}>Sign in</Text></Text>
          </View>

        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  head1: {
    fontSize: title.title1,
    color: color.text1,
    textAlign: 'center',
    marginVertical: 10
  },
  inputOut: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: color.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
    alignItems: 'center'
  },
  input: {
    fontSize: 19,
    marginLeft: 10,
    width: '80%',
    color:'black'
  },
  singInButton: {
    color: color.col1,
    fontSize: title.btntxt,
    fontWeight: 'bold'
  },
  forgot: {
    color: color.text2,
    marginTop: 20,
    marginBottom: 10
  },
  or: {
    color: color.text1,
    marginVertical: 10,
    fontWeight: 'bold'
  },
  signInWith: {
    color: color.text2,
    marginVertical: 10,
    fontSize: 25
  },
  signInWithContainer: {
    elevation: 20,
    backgroundColor: 'white',
    width: 50,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 17,
    color: 'black'
  },
  bottomInnerText: {
    fontSize: 20,
    color: color.text1,
    fontWeight: 'bold'
  },
  address: {
    fontSize: 18,
    color: color.text2,
    textAlign: 'center',
    marginTop: 20
  }
})

export default SignupScreen
