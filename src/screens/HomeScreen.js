import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, StatusBar, StyleSheet, ScrollView, FlatList } from 'react-native'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { Icon } from 'react-native-elements';
import { color } from '../global/GlobalStyle'
import firestore from '@react-native-firebase/firestore'
import CardSlider from '../components/CardSlider'
import BottomNav from '../components/BottomNav'

const HomeScreen = ({ navigation }) => {
    const [foodData, setFoodData] = useState([]);
    const [vegData, setVegData] = useState([])
    const [nonVegData, setNonVegData] = useState([])
    const [searchText, setSearchText] = useState('')

    const inputRef = useRef(null);
    const focusOnInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    //This line creates a reference to a specific collection in your Firestore database
    const foodRef = firestore().collection('FoodData')

    useEffect(() => {
        //.onSnapshot method is used to watch for changes in a Firestore collection in real-time. and it will trigger when there is any crud operation in collection
        //snapshot.docs array of data within the collecetion and .map() is a function which is used to iterate over each value
        //doc => doc.data() this means retriving the actual data from the document
        foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    useEffect(() => {
        setVegData(foodData.filter(item => item.foodType === 'veg'))
    }, [foodData])

    useEffect(() => {
        setNonVegData(foodData.filter(item => item.foodType === 'non-veg'))
    }, [foodData])

    // console.log('all data',foodData)
    // console.log('veg data', vegData)
    // console.log('non veg data', nonVegData)
    console.log(searchText)


    return (
        <>
            <View style={styles.container}>
                <StatusBar />
                <HomeHeadNav navigation={navigation} />
                <View style={styles.bottomNav}>
                    <BottomNav navigation={navigation} />
                </View>
                <View style={styles.searchBox}>
                        <Icon name="search" size={30} color={color.text1} />
                        <TextInput
                            ref={inputRef}
                            placeholder='Search' style={styles.input}
                            placeholderTextColor={'red'}
                            onChangeText={(text) => { setSearchText(text) }}
                        />
                    </View>
                <ScrollView>
                    
                    {
                        searchText != ''
                        &&
                        <View style={styles.searchReasultOuter}>
                            <FlatList
                                style={styles.searchResultInner}
                                data={foodData}
                                renderItem={({ item }) => {
                                    if (item.foodName.toLowerCase().includes(searchText.toLowerCase())) {
                                        return (
                                            <View style={styles.searchResult}>
                                                <Text style={styles.searchResultText}>{item.foodName}</Text>
                                            </View>
                                        )
                                    }
                                }}
                            />
                        </View>
                    }
                    <Categories />
                    <OfferSlider />
                    <CardSlider title={'Todays Special'} data={foodData} navigation={navigation} />
                    <CardSlider title={'Non Veg Love'} data={nonVegData} navigation={navigation} />
                    <View style={{ marginBottom: 50 }}>
                        <CardSlider title={'Veg Hunger'} data={vegData} navigation={navigation} />

                    </View>
                </ScrollView>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize: 18,
        color: color.text1,
        fontWeight: 'bold'
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
        // alignItems: 'center',
        width: '100%'
    },
    searchResultText: {
        width: '100%',
        padding: 5,
        color: "red",
        fontWeight: '500',
        fontSize: 16
    },
    searchReasultOuter: {
        width: '100%',
        marginHorizontal: 30,
        // height:'6%',
        backgroundColor: color.col1,

    },
    searchResultInner: {
        width: '100%'
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: color.col1,
        zIndex: 1000
    }


})
export default HomeScreen
