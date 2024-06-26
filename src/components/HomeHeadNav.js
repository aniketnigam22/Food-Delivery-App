import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppImages } from '../common/AppImages'
import { color } from '../global/GlobalStyle'

const HomeHeadNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
           <Image source={AppImages.FoodIcon} style={styles.foodIcon} />
            <View style={styles.containerin}>
                <Text style={styles.mytext}>Foodie</Text>
               {/* <Image source={AppImages.appLogo} style={styles.logoHead} /> */}

                
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                <Image source={AppImages.userIcon} style={styles.icons} />
            </TouchableOpacity>

        </View>
    )
}

export default HomeHeadNav

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: color.col1,
        // backgroundColor:'red',
        alignItems: 'center',
        elevation: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    containerin: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mytext: {
        fontSize: 24,
        marginRight: 10,
        color: color.text1,
        fontWeight: 'bold'
    },
    icons: {
        height: 30,
        width: 30
    },
    foodIcon: {
        height: 40,
        width: 40
    },
    logoHead: {
        height:20,
        width:250,
        // backgroundColor:'red'
    }
})