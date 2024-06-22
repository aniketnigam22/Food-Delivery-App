import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FieldValue, firebase } from '@react-native-firebase/firestore';
import { color } from '../global/GlobalStyle';
import BottomNav from '../components/BottomNav';
import { AppImages } from '../common/AppImages';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const UserCart = ({ navigation }) => {

    const [cartData, setCartData] = useState(null)
    const [totalCost, setTotalCost] = useState('0')

    const getCartData = async () => {
        // you are calling the data from the UserCart collection which is saved with this userid
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid)

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log('data exist');
                const data = JSON.stringify(doc.data())
                console.log('data:', data)
                setCartData(data)
            } else {
                console.log('No data found in cart screen')
            }
        }).catch((error) => {
            console.log('Error in cart screen while fetching data', error.message)
        })
    }

    useEffect(() => {
        getCartData()
    }, [])

    useEffect(() => {
        if (cartData != null) {
            const food = JSON.parse(cartData).cart
            console.log('food', food)
            let totalFoodPrice = 0;
            food.map((item) => {
                const foodPrice = parseInt(item.data.foodPrice) || 0;
                const foodQuantity = parseInt(item.FoodQuantity) || 0;
                const foodAddonPrice = parseInt(item.data.foodAddonPrice) || 0;
                const addOnQuantity = parseInt(item.AddOnQuantity) || 0;
    
                console.log('food prices', foodPrice);
                console.log('food quantity', foodQuantity);
                console.log('food Addon Price', foodAddonPrice);
                console.log('food Addon Quantity', addOnQuantity);
    
                totalFoodPrice += (foodPrice * foodQuantity) + (foodAddonPrice * addOnQuantity);

            })

            setTotalCost(JSON.stringify(totalFoodPrice))
        }
    }, [cartData])

    const deleteItem = (item) => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid)
        docRef.update({
            cart: firebase.firestore.FieldValue.arrayRemove(item)
        })
        getCartData()
    }
    return (
        <View style={styles.containerOut}>

            <View style={styles.bottomNav}>
                <BottomNav navigation={navigation} />
            </View>

            <View style={styles.headingContainer}>
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>Your Cart</Text>
            </View>

            {
                // const parsedCartData = { item1: "value1", item2: "value2" };
                // const keys = Object.keys(parsedCartData);
                // keys is now ["item1", "item2"]
                // &nbsp; it is used for space

                cartData == null || Object.keys(JSON.parse(cartData)).length === 0
                    ?
                    <Text style={styles.head2}>Your cart is empty</Text>
                    :
                    <FlatList
                        style={styles.cardList}
                        data={JSON.parse(cartData).cart}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <View style={styles.cardCart}>
                                        <Image source={{ uri: item.data.foodImageUrl }} style={styles.cartImg} />
                                        <View style={styles.cartCardIn}>
                                            <View style={styles.c1}>
                                                <Text style={styles.text1}>{item.FoodQuantity} &nbsp; {item.data.foodName}</Text>
                                                <Text style={styles.text2}>Rs.{item.data.foodPrice}/- each</Text>
                                            </View>
                                            {
                                                item.AddOnQuantity > 0 &&
                                                <View style={styles.c2}>
                                                    <Text style={styles.text3}>{item.AddOnQuantity} &nbsp; {item.data.foodAddon}</Text>
                                                    <Text style={styles.text3}>Rs.{item.data.foodAddonPrice}/-</Text>
                                                </View>
                                            }
                                            <View style={styles.c4}>
                                                <TouchableOpacity onPress={() => {
                                                    deleteItem(item)
                                                }}>
                                                    <Image source={AppImages.deleteIcon} style={styles.deleteIcon} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            )
                        }}
                    />
            }

            <View style={styles.btnContainer}>
                <View style={styles.c3}>
                    <Text style={styles.text5}>Total:</Text>
                    <Text style={styles.text6}>Rs.{totalCost}/-</Text>

                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PlaceOrder', {cartData})}>
                    <Text style={styles.btnText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserCart

const styles = StyleSheet.create({
    containerOut: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonContainer: {
        marginRight: 10,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 20,
        elevation: 15,
        marginLeft: 4
    },
    backButton: {
        fontSize: 24,
        color: 'white',
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: 'red',
        marginRight: '2%'
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: color.col1,
        zIndex: 1000
    },
    head2: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200',
        marginVertical: 20,
        elevation: 10,
        backgroundColor: color.col1,
        width: '90%',
        height: '50%',
        alignSelf: 'center',
        paddingVertical: '25%',
        borderRadius: 10,
        color: color.text1
    },
    cardList: {
        width: '100%'
    },
    cardCart: {
        flexDirection: 'row',
        backgroundColor: color.col1,
        marginVertical: 5,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        elevation: 10,
        alignItems: 'center'
    },
    cartImg: {
        width: 150,
        height: 100,
        borderRadius: 10
    },
    deleteIcon: {
        width: 50,
        height: 50
    },
    cartCardIn: {
        flexDirection: 'column',
        margin: 5,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    c1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: color.col1,
    },
    c2: {
        backgroundColor: color.text1,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row'
    },
    text1: {
        fontSize: 16,
        color: color.text1,
        width: '60%',
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 16,
        color: color.text3,
        fontWeight: 'bold'
    },
    text3: {
        fontSize: 15,
        color: color.col1
    },
    c4: {
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: 'centers',
        width: '100%',
        borderRadius: 10,
        borderColor: color.col1,
        borderWidth: 1,
        // marginVertical:5,
        // padding:5
    },
    btnContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: color.text3,
        borderTopWidth: 0.2
    },
    btn: {
        backgroundColor: 'red',
        height: 50,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    btnText: {
        color: color.col1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text5: {
        fontSize: 20,
        color: color.text3,
        marginHorizontal: 5
    },
    text6: {
        fontSize: 25,
        color: color.text3,
        marginHorizontal: 5,
        fontWeight: 'bold'
    }


})