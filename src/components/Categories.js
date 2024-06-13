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
                    <Image source={AppImages.starter} style={styles.myIcon} />
                    <Text style={styles.text}>Starter</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.breakfast} style={styles.myIcon} />
                    <Text style={styles.text}>Breakfast</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.lunch} style={styles.myIcon} />
                    <Text style={styles.text}>Lunch</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.dinner} style={styles.myIcon} />
                    <Text style={styles.text}>Dinner</Text>
                </View>
                <View style={styles.box}>
                    <Image source={AppImages.fastFood} style={styles.myIcon} />
                    <Text style={styles.text}>FastFood</Text>
                </View>

            </ScrollView>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.col1,
        width: '100%',
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