import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { color, nonVeg, veg } from '../global/GlobalStyle'


const CardSlider = ({ title, data, navigation}) => {

    const openProductPage = (item) => {
       console.log(item)
       //here you are navigatig to produect screen and also passing all the data of item
       //suppose someone click on the burger slide then all the data of the burger will be passed to the product page
       navigation.navigate('ProductScreen', item)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.cardOutHead}>{title}</Text>

            <FlatList style={styles.cardOut}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity  onPress={() => {
                        openProductPage(item)
                    }}>
                        <View style={styles.card}>
                            <View style={styles.s1}>
                                <Image
                                    source={{
                                        uri: item.foodImageUrl
                                    }}
                                    style={styles.cardImgIn}
                                />
                            </View>

                            <View style={styles.s2}>
                                <Text style={styles.txt1}>{item.foodName}</Text>
                                <View style={styles.s2In}>
                                    <Text style={styles.txt2}>{'Rs.' + item.foodPrice + '/'}</Text>
                                    {
                                        item.foodType == 'veg' ? <View style={veg}></View> : <View style={nonVeg}></View>
                                    }
                                </View>
                            </View>

                            <TouchableOpacity style={styles.s3}>
                                <Text style={styles.btn}>Buy</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default CardSlider

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    cardOutHead: {
        color: color.text3,
        width: '90%',
        fontSize: 30,
        fontWeight: '200',
        borderRadius: 10,
        marginHorizontal: 10
    },
    cardOut: {
        width: '100%',
    },
    card: {
        width: 300,
        height: 300,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: color.col1
    },
    cardImgIn: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    s2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:'red',
        marginHorizontal: 15
    },
    txt1: {
        fontSize: 18,
        color: color.text3,
        marginHorizontal: 5,
        width: 150
    },
    txt2: {
        fontSize: 20,
        color: color.text2,
        marginRight: 10
    },
    s2In: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    s3: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 1,
        width: '100%'
    },
    btn: {
        backgroundColor: color.text1,
        color: color.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center'
    },
})