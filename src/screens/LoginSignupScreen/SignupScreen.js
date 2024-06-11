import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { color, title } from '../../global/GlobalStyle'
import { Icon } from 'react-native-elements';





const SignupScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.head1}>Sign In</Text>

                <View style={styles.inputOut}>
                    <TextInput style={styles.input} placeholder='Email' />
                </View>

                <View style={styles.inputOut}>
                    <TextInput style={styles.input} placeholder='Password' />
                </View>

                <Icon name="md-beer" type="ionicon" color="#887700" />

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
        elevation: 20
    },
    input: {
        fontSize: 19,
        marginLeft: 10,
        width: '80%'
    }
})

export default SignupScreen
