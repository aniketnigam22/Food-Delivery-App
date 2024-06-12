import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { AppImages } from '../common/AppImages'
import { color } from '../global/GlobalStyle'

const Categories = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Categories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.box}>
                    <Image source={AppImages.burger} style={styles.myIcon} />
                    <Text style={styles.text}>Burger</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.pizza} style={styles.myIcon} />
                    <Text style={styles.text}>Pizza</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.noodles} style={styles.myIcon} />
                    <Text style={styles.text}>Noodles</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.dosa} style={styles.myIcon} />
                    <Text style={styles.text}>Dosa</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.taco} style={styles.myIcon} />
                    <Text style={styles.text}>Taco</Text>
                </View>

            </ScrollView>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.col1,
        width: '90%',
        elevation: 10,
        borderRadius: 10,
    },
    head: {
        color: color.text1,
        fontSize: 25,
        fontWeight: '300',
        margin: 10,
        alignSelf: 'center',
        paddingBottom: 5,
        borderBottomColor: color.text1,
        borderBottomWidth: 1
    },
    box: {
        backgroundColor: color.col1,
        elevation: 20,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    myIcon: {
        marginRight: 10,
        height: 30,
        width: 30,
        borderRadius:5
    },
    text: {
        color: color.text3,
    }
})