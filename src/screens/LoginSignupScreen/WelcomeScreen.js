import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { AppImages } from '../../common/AppImages'
import { color, hr80 } from '../../global/GlobalStyle'


const WelcomeScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>WelcomeScreen</Text>
                <Image source={AppImages.appLogo} />
                {/* <View style={hr80}/> */}

                <Text style={styles.text}>Find the best food around you at lowest price.</Text>
                {/* <View style={hr80}/> */}

                <View>
                    <TouchableOpacity>
                        <Text style={styles.btn}>Signup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
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
    title:{

    }
})

export default WelcomeScreen
