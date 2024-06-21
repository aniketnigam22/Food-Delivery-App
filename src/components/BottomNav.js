import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppImages } from '../common/AppImages'
import { color } from '../global/GlobalStyle'


const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnCon1} onPress={() => navigation.navigate('HomeScreen')}>
        <Image source={AppImages.homeIcon} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnCon1} onPress={() => navigation.navigate('HomeScreen')}>
        <Image source={AppImages.searchIcon} style={styles.search} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnCon1} onPress={() => navigation.navigate('UserCart')}>
        <Image source={AppImages.cartIcon} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnCon1} onPress={() => navigation.navigate('HomeScreen')}>
        <Image source={AppImages.mapIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems:'center',
    width:'100%',
    elevation:30,
    borderTopColor:color.text1,
    borderTopWidth:0.5,
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    paddingVertical:5
  },
  icon: {
    height:30,
    width: 30,
  },
  search: {
    height:40,
    width:40,
    // top:-20,
    borderRadius:30,
  }
})