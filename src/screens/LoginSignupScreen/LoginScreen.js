import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { btn1, color, hr80, title } from '../../global/GlobalStyle'
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';



const LoginScreen = ({ navigation }) => {
    const [emailFocus, setEmailFoucs] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [passward, setPassward] = useState('')
    const [customError, setCustomeError] = useState('')

    const handleLogin = () => {
        console.log('handle click called')
        auth().signInWithEmailAndPassword(email, passward)
            .then((userCredentials) => {
                var user = userCredentials.user;
                console.log(user)
                console.log('Logged In Successfully')
            })
            .catch((error) => {
                var msg = error.message
                console.log(`Error message while login ${msg}`)

                if (error.message == '[auth/invalid-email] The email address is badly formatted.') {
                    setCustomeError('Invalid Email')
                }
                else {
                    setCustomeError('Incorrect Email or Password')
                }
            })
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.head1}>Sign In</Text>
                {customError !== '' && <Text style={styles.errorMessage}>{customError}</Text>}
                <View style={styles.inputOut}>
                    <Icon name="people" size={30} color={emailFocus === true ? color.text1 : color.text2} />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor={color.text2}
                        onChangeText={(text) => setEmail(text)}
                        onFocus={() => {
                            setEmailFoucs(true)
                            setShowPassword(false)
                            setPasswordFocus(false)
                            setCustomeError('')

                        }}
                    />
                </View>

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
                        onFocus={() => {
                            setEmailFoucs(false)
                            setPasswordFocus(true)
                            setCustomeError('')

                        }}
                        placeholderTextColor={color.text2}

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

                <TouchableOpacity
                    style={btn1}
                    onPress={ handleLogin }
                >
                    <Text style={styles.singInButton}>Sign in</Text>
                </TouchableOpacity>

                <Text style={styles.forgot}>Forgot Password</Text>
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
                    <Text style={styles.bottomText}>Don't have an account?  <Text style={styles.bottomInnerText} onPress={() => (
                        navigation.navigate('SignupScreen')
                    )}>Sign up</Text></Text>
                </View>

            </View>
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
        color: color.text3
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
})

export default LoginScreen
