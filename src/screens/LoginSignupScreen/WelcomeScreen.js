import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AppImages } from '../../common/AppImages'
import { color, hr80 } from '../../global/GlobalStyle'


const WelcomeScreen = () => {
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

                <View style={styles.btnOut}>
                    <TouchableOpacity >
                        <Text style={styles.btn}>Signup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <Text style={styles.btn}>Login</Text>
                    </TouchableOpacity>
                </View>
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
    }
})

export default WelcomeScreen
