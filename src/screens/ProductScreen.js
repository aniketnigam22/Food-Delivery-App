import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { btn2, color, hr80, nonVeg, veg } from '../global/GlobalStyle';
import { FieldValue, firebase } from '@react-native-firebase/firestore';




//route is used to get the data when you pass the data form the navigation
const ProductScreen = ({ navigation, route }) => {

    const [quantity, setQuantity] = useState('1')
    const [addOnQuantity, setAddOnQuantity] = useState('0')

    //this is the way to get the data when passed through navigation
    const data = route.params;
    console.log(data.foodImageUrl)
    // console.log("Product screen",data);

    if (route.params === undefined) {
        navigation.navigate('HomeScreen')
    }

    const addToCart = () => {
        console.log('add to cart function clicked')
        //data will be added in the cart with reference to the current user userid
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid)

        const data1 = { data, FoodQuantity: quantity, AddOnQuantity: addOnQuantity }
        // console.log('add to cart data', data1)

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    //if the cart has some data then add this data also
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                Alert.alert('Added to Cart')
            } else {
                docRef.set({
                    // add the data in the cart
                    cart: [data1]
                })
                Alert.alert('Added to Cart')
            }
        })
    }

    const increaseQuantity = () => {
        setQuantity((parseInt(quantity) + 1).toString())
    }

    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setQuantity((parseInt(quantity) - 1).toString())
        }
    }

    const increaseaddQuantity = () => {
        setAddOnQuantity((parseInt(addOnQuantity) + 1).toString())
    }

    const decreaseaddQuantity = () => {
        if (parseInt(addOnQuantity) > 0) {
            setAddOnQuantity((parseInt(addOnQuantity) - 1).toString())
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headingContainer}>
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container1}>
                <View style={styles.s1}>
                    <Image
                        source={{
                            uri: data.foodImageUrl
                        }}
                        style={styles.cardImg}
                    />
                </View>

                <View style={styles.s2}>
                    <View style={styles.s2IN}>
                        <Text style={styles.head1}>{data.foodName}</Text>
                        <Text style={styles.head2}>Rs:{data.foodPrice}/-</Text>
                    </View>

                    <View style={styles.s3}>
                        <Text style={styles.head3}>About Food</Text>
                        <Text style={styles.head4}>{data.foodDescription}</Text>
                        <View style={styles.s3In}>
                            {
                                data.foodType == 'veg'
                                    ?
                                    <Text style={veg}></Text>
                                    :
                                    <Text style={nonVeg}></Text>
                            }
                            <Text style={styles.head5}>{data.foodType}</Text>
                        </View>
                    </View>

                    <View style={styles.container2}>
                        <Text style={styles.text1}>Location</Text>
                        <Text style={styles.text3}>{data.restaurantName}</Text>
                        <View style={styles.container2In}>
                            <Text style={styles.text2}>{data.resturantAddressBuilding}</Text>
                            <View style={styles.dash}></View>
                            <Text style={styles.text2}>{data.resturantAddressStreet}</Text>
                            <View style={styles.dash}></View>
                            <Text style={styles.text2}>{data.resturantAddressCity}</Text>
                        </View>
                    </View>

                    <View style={hr80} />

                    <View >
                        <Text style={styles.text4}>Food Quantity</Text>
                        <View style={styles.container2In}>
                            <TouchableOpacity onPress={decreaseQuantity}><Text style={styles.incdecbutton} >-</Text></TouchableOpacity>
                            <TextInput style={styles.incdecInput} value={quantity} color={'black'} />
                            <TouchableOpacity onPress={increaseQuantity}><Text style={styles.incdecbutton} >+</Text></TouchableOpacity>
                        </View>
                    </View>

                    {
                        data.foodAddonPrice != ""
                            ?

                            <View style={styles.container3}>
                                <View style={hr80} />
                                <Text style={styles.text4}>Add Extra</Text>
                                <View style={styles.c3In}>
                                    <Text style={styles.addOntext}>{data.foodAddon}</Text>
                                    <Text style={styles.addOntext}>Rs.{data.foodAddonPrice}/-</Text>
                                </View>
                                <View style={styles.container2In}>
                                    <TouchableOpacity onPress={decreaseaddQuantity}><Text style={styles.incdecbutton} >-</Text></TouchableOpacity>
                                    <TextInput style={styles.incdecInput} value={addOnQuantity} color={'black'} />
                                    <TouchableOpacity onPress={increaseaddQuantity}><Text style={styles.incdecbutton} >+</Text></TouchableOpacity>
                                </View>
                            </View>
                            :
                            null
                    }
                    <View style={hr80} />
                </View>

                <View style={styles.container4}>
                    <View style={styles.c4in}>
                        <Text style={styles.text3}>Total Price</Text>
                        {
                            data.foodAddonPrice != ""
                                ?
                                <Text style={styles.txt5}>Rs{((
                                    parseInt(data.foodPrice) * parseInt(quantity)
                                ) + parseInt(addOnQuantity) * parseInt(data.foodAddonPrice)).toString()}</Text>
                                :
                                <Text style={styles.txt5}>
                                    Rs{(
                                        parseInt(data.foodPrice) * parseInt(quantity)
                                    ).toString()}
                                </Text>
                        }
                    </View>
                </View>


                <View style={styles.button}>
                    <TouchableOpacity style={btn2} onPress={addToCart}>
                        <Text style={styles.btntxt}>Add to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={btn2}>
                        <Text style={styles.btntxt}>Buy Now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    backButtonContainer: {
        marginRight: 10,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 20,
        elevation: 15
    },
    headingContainer: {
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        margin: 10,
        justifyContent: 'center'
    },
    backButton: {
        fontSize: 24,
        color: 'white',
        marginBottom: 4

    },
    container: {
        flex: 1,
        width: '100%'
    },
    container1: {
        flex: 1
    },
    s1: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImg: {
        width: '100%',
        height: '100%'
    },
    s2: {
        width: '100%',
        padding: 20,
        alignItems: 'center'
    },
    s2IN: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 10
    },
    head1: {
        fontSize: 30,
        fontWeight: '500',
        color: 'red',
        width: 200
        ,
        marginRight: 10
    },
    head2: {
        fontSize: 40,
        fontWeight: '200',
        color: color.text3
    },
    s3: {
        backgroundColor: color.text1,
        padding: 20,
        borderRadius: 20
    },
    head3: {
        fontSize: 30,
        fontWeight: '300',
        color: 'white',
    },
    head4: {
        marginVertical: 10,
        fontWeight: '400',
        fontSize: 20,
        color: color.col1
    },
    s3In: {
        backgroundColor: color.col1,
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    head5: {
        color: color.text3,
        fontSize: 20,
        fontWeight: '400',
        marginLeft: 10
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    btntxt: {
        color: color.col1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container2: {
        width: '90%',
        backgroundColor: color.col1,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
        marginTop: 15
    },
    text1: {
        color: color.text1,
        fontSize: 17,
        fontWeight: '500'
    },
    text2: {
        color: color.text3,
        fontSize: 20,
        fontWeight: '400',
        marginVertical: 10
    },
    text3: {
        color: color.text3,
        fontSize: 30,
        fontWeight: '300',
        marginVertical: 5
    },
    container2In: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dash: {
        width: 2,
        height: 20,
        backgroundColor: color.text1,
        marginHorizontal: 10,
    },
    incdecbutton: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        elevation: 10,
        padding: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        width: 30,
    },
    incdecInput: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        padding: 10,
        width: 50,
        marginHorizontal: 10,
        fontSize: 20,
        borderRadius: 20,
    },
    container2In: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 10
    },
    text4: {
        color: 'red',
        fontSize: 18,
        textAlign: "center"
    },
    addOntext: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: 5
    },
    c3In: {
        flexDirection: 'row',
    },
    txt5: {
        color: 'red',
        fontSize: 28,
        textAlign: "center"
    },
    container4: {
        width: '90%',
        alignSelf: 'center',
        alignItems: "center"
    },
    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',

    }
})