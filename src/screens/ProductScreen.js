import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { btn2, color, nonVeg, veg } from '../global/GlobalStyle';


//route is used to get the data when you pass the data form the navigation
const ProductScreen = ({ navigation, route }) => {

    //this is the way to get the data when passed through navigation
    const data = route.params;
    console.log(data.foodImageUrl)
    // console.log("Product screen",data);

    if (route.params === undefined) {
        navigation.navigate('HomeScreen')
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
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={btn2}>
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
        justifyContent:'center'
    },
    backButton: {
        fontSize: 24,
        color: 'white',
        marginBottom:4
        
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
        padding: 20
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
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        flexDirection:'row'
    },
    btntxt: {
      color:color.col1,
      fontSize:20,
      textAlign:'center',
      fontWeight:'bold'
    }
})