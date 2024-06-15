import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AppImages } from '../../common/AppImages'
import { color, hr80 } from '../../global/GlobalStyle'
import auth from '@react-native-firebase/auth';



const WelcomeScreen = ({ navigation }) => {

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        //this is the function to check if the user is logged in or not 
        const checkLogin = () => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserLogged(user)
                    // console.log("user:", user)
                    console.log('user logged in present')
                } else {
                    setUserLogged(null)
                    console.log('No user Logged in')
                }
            })
        }

        checkLogin()
    }, [])

    const handleLogout = () => {
        auth().signOut()
        .then(() => {
            setUserLogged(null)
            console.log('User Logged Out')
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
// console.log(userLogged)
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>WelcomeScreen</Text>
                <View style={styles.logoOut}>
                    <Image source={AppImages.appLogo} style={styles.logo} />
                </View>

                <View style={hr80} />
                <Text style={styles.text}>Find the best food around you at lowest price.</Text>
                <View style={hr80} />

                {
                    userLogged == null
                        ?
                        <View style={styles.btnOut}>
                            <TouchableOpacity onPress={() => (
                                navigation.navigate('SignupScreen')
                            )}>
                                <Text style={styles.btn}>Signup</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => (
                                navigation.navigate('LoginScreen')
                            )}>
                                <Text style={styles.btn}>Login</Text>
                            </TouchableOpacity>
                        </View>

                        :
                        <View style={styles.logged}>
                          <Text style={styles.LoggedInEmail}>{`Signed In Email: ${userLogged.email}`}</Text>
                            <View style={styles.btnOut}>

                                <TouchableOpacity onPress={() => (
                                    navigation.navigate('HomeScreen')
                                )}>
                                    <Text style={styles.btn}>Go To Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleLogout}>
                                    <Text style={styles.btn}>Logout</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ff4242',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        color: color.col1,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '200'
    },
    logoOut: {
        width: '80%',
        height: '50%',
        alignItems: 'center',

    },
    logo: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        width: '80%',
        color: color.col1,
        textAlign: 'center'
    },
    btnOut: {
        flexDirection: 'row'
    },
    btn: {
        fontSize: 20,
        color: color.text1,
        textAlign: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20
    },
    LoggedInEmail :{
        color:'white',
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold'
        
    }
 
})

export default WelcomeScreen
