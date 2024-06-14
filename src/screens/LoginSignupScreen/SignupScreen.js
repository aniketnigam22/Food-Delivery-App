import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import { btn1, color, hr80, title } from '../../global/GlobalStyle'
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';




const SignupScreen = ({ navigation }) => {

  const [emailFocus, setEmailFoucs] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [phoneFoucs, setPhoneFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false)

  //storing data from input at one place
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [passward, setPassward] = useState('')
  const [confirmPassward, setConfirmPassward] = useState('')
  const [address, setAddress] = useState('')


  const [customError, setCustomeError] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)

  const handleSignup = () => {

    if(name == '') {
      setCustomeError('Name cannot be empty')
      return
    }
    if(email == '') {
      setCustomeError('Email cannot be empty')
      return
    }
    if(phone == '') {
      setCustomeError('Phone cannot be empty')
      return
    }
    if(passward == '') {
      setCustomeError('Password cannot be empty')
      return
    }
    if(confirmPassward == '') {
      setCustomeError('Confirm Password cannot be empty')
      return
    }
    console.log(customError)
    const formData = {
      name: name,
      email: email,
      phone: phone,
      passward: passward,
      address: address
    }

    if (passward != confirmPassward) {
      setCustomeError('Passward do not match')
      return
    }
    else if (phone.length < 10) {
      setCustomeError('Phone number should be 10 digit')
      return
    }

    try {
      auth().createUserWithEmailAndPassword(email, passward)
        .then(() => {
          console.log('User created and sign up successfully')

          const userRef = firebase.firestore().collection('UserData')


          userRef.add(formData)
            .then(() => {
              console.log('User Data added to firestore while signup')
              setSuccessMsg('User Created Successfully')

            })
            .catch((error) => {
              console.log('Firestore error while saving user data during signup', error.message)
            })
        })
        .catch((error) => {
          console.log(`Error while sign up  inside try or firebase error: ${error.message}`)

          if (error.message == '[auth/email-already-in-use] The email address is already in use by another account.') {
            setCustomeError('Email Already Exist')
          }
          else if (error.message == '[auth/invalid-email] The email address is badly formatted.') {
            setCustomeError('Invalid Email')
          }
          else if (error.message == '[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]') {
            setCustomeError('Password should be atleast 6 characters')
          }
          else {
            setCustomeError(error.message)
          }
        })
    } catch (error) {
      console.log(`Error while sign up  outside try${error.message}`)
    }
  }


  return (
    <>
      {successMsg == null ?
        <View>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.head1}>Sign Up</Text>
              {customError !== '' && <Text style={styles.errorMessage}>{customError}</Text>}
              {/* name start */}
              <View style={styles.inputOut}>
                <Icon name="people" size={30} color={nameFocus === true ? color.text1 : color.text2} />
                <TextInput
                  style={styles.input}
                  placeholder='Full Name'
                  placeholderTextColor={color.text2}
                  onChangeText={(text) => setName(text)}
                  onFocus={() => {
                    setEmailFoucs(false)
                    setShowPassword(false)
                    setPasswordFocus(false)
                    setPasswordConfirmFocus(false)
                    setPhoneFocus(false)
                    setNameFocus(true)
                    setCustomeError('')
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
                  onChangeText={(text) => setEmail(text)}
                  placeholder='Email'
                  onFocus={() => {
                    setEmailFoucs(true)
                    setShowPassword(false)
                    setPasswordFocus(false)
                    setPasswordConfirmFocus(false)
                    setPhoneFocus(false)
                    setNameFocus(false)
                    setCustomeError('')
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
                  onChangeText={(text) => setPhone(text)}
                  onFocus={() => {
                    setPhoneFocus(true)
                    setShowPassword(false)
                    setPasswordFocus(false)
                    setPasswordConfirmFocus(false)
                    setNameFocus(false)
                    setCustomeError('')


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
                  onChangeText={(text) => setPassward(text)}
                  placeholderTextColor={color.text2}
                  onFocus={() => {
                    setEmailFoucs(false)
                    setPasswordFocus(true)
                    setPasswordConfirmFocus(false)
                    setPhoneFocus(false)
                    setNameFocus(false)
                    setCustomeError('')


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
                  onChangeText={(text) => setConfirmPassward(text)}
                  onFocus={() => {
                    setEmailFoucs(false)
                    setPasswordFocus(false)
                    setPasswordConfirmFocus(true)
                    setPhoneFocus(false)
                    setNameFocus(false)
                    setCustomeError('')


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
                  onChangeText={(text) => setAddress(text)}
                  onFocus={() => {
                    setEmailFoucs(false)
                    setPasswordFocus(false)
                    setPasswordConfirmFocus(false)
                    setPhoneFocus(false)
                    setNameFocus(false)
                    setCustomeError('')

                  }}
                />
              </View>
              {/* adress end  */}


              <TouchableOpacity
                style={btn1}
                onPress={handleSignup}
              >
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
        </View>

        :

        <View style={styles.container1}>
          <Text style={styles.successMessage}>{successMsg}</Text>

          <TouchableOpacity
            style={[btn1, {marginBottom:10}]}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.singInButton}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={btn1}
            onPress={() => setSuccessMsg(null)}
          >
            <Text style={styles.singInButton}>Go Back</Text>
          </TouchableOpacity>
        </View>
      }
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
    color: 'black'
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
  },
  errorMessage: {
    color: "red",
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  container1: {
    flex: 1,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:60
  },
  successMessage: {
    color: "green",
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10
  }
})

export default SignupScreen
