import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StatusBar, StyleSheet } from 'react-native'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { Icon } from 'react-native-elements';
import { color } from '../global/GlobalStyle'
import firestore from '@react-native-firebase/firestore'

const HomeScreen = () => {
    const [foodData,setFoodData]= useState([]);
    const foodRef = firestore().collection('FoodData')

    useEffect(() => {
         foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
         })
    }, [])

    console.log(foodData)
    return (
        <>
            <View style={styles.container}>
                <StatusBar />
                <HomeHeadNav />
                <View style={styles.searchBox}>
                    <Icon name="search" size={30} color={color.text1} />
                    <TextInput placeholder='Search' style={styles.input} />
                </View>
                <Categories />
                <OfferSlider />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize:18,
        color:color.text1,
        fontWeight:'bold'
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: color.col1,
        width: '90%',
        borderRadius: 15,
        alignItems: 'center',
        padding: 8,
        margin: 20,
        elevation: 20,
    },
    container: {
        flex: 1,
        backgroundColor: color.col1,
        alignItems: 'center',
        width: '100%'
    }
})
export default HomeScreen
