import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { color } from '../global/GlobalStyle'
import { AppImages } from '../common/AppImages'



const OfferSlider = () => {

    return (
        <View>
            <View style={styles.offerSlider}>
                <Swiper
                    showsButtons={true}
                    activeDotColor={color.text1}
                    dotColor={color.text2}
                    nextButton={<Text style={styles.buttonText}>{`→`}</Text>}
                    prevButton={<View style={styles.buttonContainer}><Text style={styles.buttonText}>{`←`}</Text></View>}
                >
                    <View style={styles.slide}>
                        <Image source={AppImages.slider1} style={styles.image} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={AppImages.slider2} style={styles.image} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={AppImages.slider3} style={styles.image} />
                    </View>
                </Swiper>
            </View>
        </View>
    )
}

export default OfferSlider

const styles = StyleSheet.create({
    offerSlider: {
        width: '100%',
        height: 200,
        backgroundColor: color.col1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    slide: {
        width: '100%',
        height: 200,
        backgroundColor: color.col1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    buttonText: {
        color: color.text1,
        fontSize: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        width: 40,
        height: 48,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingBottom: 15
    },
})