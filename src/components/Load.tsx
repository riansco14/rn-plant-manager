import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, TouchableOpacityProps, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'

import loadAnimation from '../assets/load.json'

export function Load() {
    return (
        <View style={style.container}>
                <LottieView source={loadAnimation} loop autoPlay style={style.animation}></LottieView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation: {
        backgroundColor: 'transparent',
        height: 200,
        width: 200
    }
})