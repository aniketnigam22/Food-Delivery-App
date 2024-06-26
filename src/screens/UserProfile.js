import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserProfileScreen = ({ navigation }) => {
    const [userLoggedUid, setUserLoggedUid] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        const checkLogin = () => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserLoggedUid(user.uid);
                    console.log('User logged in, profile screen');
                } else {
                    setUserLoggedUid(null);
                    console.log('No user logged in, profile screen');
                    navigation.navigate('LoginScreen'); // Navigate to login if no user is logged in
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
                } finally {
                    setLoading(false); // Set loading to false after fetching data
                }
            }
        };

        getUserData();
    }, [userLoggedUid]);

    if (loading) {
        return (
            <View style={styles.indicator}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Text style={styles.backButton}>{'←'}</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>User Profile</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Name</Text>
                    {userData ? <Text style={styles.labelValue}>{userData.name}</Text> : null}
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>
                    {userData ? <Text style={styles.labelValue}>{userData.email}</Text> : null}
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Phone</Text>
                    {userData ? <Text style={styles.labelValue}>{userData.phone}</Text> : null}
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Address</Text>
                    {userData ? <Text style={styles.labelValue}>{userData.address}</Text> : null}
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Password</Text>
                    {userData ? <Text style={styles.labelValue}>{userData.passward}</Text> : null}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonContainer: {
        marginRight: 10,
        height:30,
        width:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        borderRadius:20,
        elevation:15
    },
    backButton: {
        fontSize: 24,
        color: 'white',
        // alignSelf:'center',
        textAlignVertical:'center',
        textAlign:'center',
        // padding:10,
        // backgroundColor:'green',
        height:30,
        width:30,
        marginBottom:14
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: 'red',
    },
    box: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        width: '100%', // Make the box take full width
        borderWidth:2,
        borderColor:'red',
        elevation:30
    },
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color:'black'
    },
    labelValue: {
        fontSize: 18,
        color:"red",
        fontWeight:'bold'
    },
});

export default UserProfileScreen;
