import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { color, hr80, title } from '../global/GlobalStyle';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RazorpayCheckout from 'react-native-razorpay';


const PlaceOrder = ({ navigation, route }) => {

    const { cartData } = route.params;// object destructuring means data is stored in object
    console.log('Cart data in place order', cartData)

    const [orderData, setOrderData] = useState([])
    const [totalCost, setTotalCost] = useState('0')
    const [userLoggedUid, setUserLoggedUid] = useState(null);
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        setOrderData(JSON.parse(cartData))
    }, [cartData])

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

                totalFoodPrice += (foodPrice * foodQuantity) + (foodAddonPrice * addOnQuantity);
            })

            setTotalCost(JSON.stringify(totalFoodPrice))
        }
    }, [cartData])

    useEffect(() => {
        const checkLogin = () => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserLoggedUid(user.uid);
                    console.log('User logged in, place order screen');
                } else {
                    setUserLoggedUid(null);
                    console.log('No user logged in, profile screen');
                }
            });
        };

        checkLogin();
    }, [navigation]);

    useEffect(() => {
        const getUserData = async () => {
            if (userLoggedUid) {
                try {
                    const userRef = firestore().collection('UserData').where('uid', '==', userLoggedUid);
                    const querySnapshot = await userRef.get();
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        setUserData(userData);
                    } else {
                        console.log('No such document');
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                }
            }
        };

        getUserData();
    }, [userLoggedUid]);

   const OrderPlaced = () => {
    try {
        const orderId = new Date().getTime().toString();
        RazorpayCheckout.open({
            key: "rzp_test_XZXlIZEFXyAYyU",
            amount: totalCost * 100,
            image:'',
            description: "Payment for food delivery",
            currency: "INR",
            prefill: {
                contact: "1234567890", // Replace with a valid phone number
                email: "harsh.infranix@gmail.com",
            },
            theme: { color: color.text1 },
        }).then(async (res) => {
            if (res) {
                const docRef = firebase.firestore().collection('UserOrders').doc(orderId);
                await docRef.set({
                    orderId: docRef.id,
                    orderData: orderData.cart,
                    orderstatus: 'pending',
                    ordercost: totalCost,
                    orderDate: firebase.firestore.FieldValue.serverTimestamp(),
                    orderAddress: userData.address,
                    orderPhone: userData.phone,
                    orderName: userData.name,
                    orderUserId: userLoggedUid,
                    orderpayment: 'online',
                    paymentStatus: 'paid'
                });
                Alert.alert('Order Placed');
            }
        }).catch((err) => {
            console.error("Razorpay Checkout Error:", err);
            Alert.alert("Error", err.description || JSON.stringify(err));
        });
    } catch (error) {
        console.error("Error in OrderPlaced function:", error);
        Alert.alert("Error2", error.message || JSON.stringify(error));
    }
};


    console.log(orderData.cart)
    console.log('user data in place order screen', userData)
    return (
        <ScrollView style={styles.containerOut}>
            <View style={styles.headingContainer}>
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>Place Order</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.head1}>Your Order Summary</Text>
                <FlatList
                    style={styles.c1}
                    data={orderData.cart}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <View style={styles.rowOut}>
                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <Text style={styles.qty}>{item.FoodQuantity}</Text>
                                            <Text style={styles.title}>{item.data.foodName}</Text>
                                            <Text style={styles.price}>Rs.{item.data.foodPrice}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Text style={styles.totalPrice}>Rs.{parseInt(item.FoodQuantity) * parseInt(item.data.foodPrice)}</Text>
                                        </View>
                                    </View>

                                    {
                                        item.AddOnQuantity > 0
                                        &&
                                        <View style={styles.row}>
                                            <View style={styles.left}>
                                                <Text style={styles.qty}>{item.AddOnQuantity}</Text>
                                                <Text style={styles.title}>{item.data.foodAddon}</Text>
                                                <Text style={styles.price}>Rs{item.data.foodAddonPrice}</Text>
                                            </View>
                                            <View style={styles.right}>
                                                <Text style={styles.totalPrice}>Rs.{parseInt(item.AddOnQuantity) * parseInt(item.data.foodAddonPrice)}</Text>
                                            </View>
                                        </View>
                                    }
                                </View>
                            </>
                        )
                    }}
                />


                <View style={hr80} />

                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.title}>Order Total:</Text>
                    </View>
                    <View style={styles.left}>
                        <Text style={styles.totalPrice}>Rs.{totalCost}/-</Text>
                    </View>
                </View>

                <View style={hr80} />


                <TouchableOpacity style={styles.PlaceOrderButton} onPress={OrderPlaced}>
                    <Text style={styles.btnText}>Place Order</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default PlaceOrder

const styles = StyleSheet.create({
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
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: 'red',
        marginRight: '2%'
    },
    backButton: {
        fontSize: 24,
        color: 'white',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    head1: {
        fontSize: 30,
        fontWeight: '200',
        color: color.text1,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
        width: '90%'
    },
    rowOut: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: color.col1,
        padding: 10,
        borderRadius: 10
    },
    qty: {
        width: 40,
        height: 30,
        backgroundColor: color.text1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: color.col1,
        fontSize: 17,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: 'black'
    },
    price: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: color.text1
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    totalPrice: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    PlaceOrderButton: {
        width: 130,
        height: 50,
        backgroundColor: color.text1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: color.col1,
        fontSize: 18,
        fontWeight: 'bold'
    }
})