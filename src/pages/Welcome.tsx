import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, Dimensions } from 'react-native'
import {Feather} from '@expo/vector-icons'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import waterImage from '../assets/watering.png'
import { useNavigation } from '@react-navigation/core'


export function Welcome() {
    const navigation = useNavigation()

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return (<SafeAreaView style={style.container}>
        <View style={style.wrapper}>
        
        <Text style={style.title}>
            Gerencie {'\n'}
            suas plantas {'\n'}
            de forma fácil
        </Text>

        <Image source={waterImage} style={style.image} resizeMode='contain'/>


        <Text style={style.subtitle}>
            Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
            sempre que precisar.
        </Text>

        <TouchableOpacity style={style.button} activeOpacity={0.8} onPress={handleStart}>
            <Feather name="chevron-right" style={style.buttonIcon}/>
        </TouchableOpacity>
            
        </View>
    </SafeAreaView>)
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        
        paddingTop: Platform.OS === 'android' ? 25 : 0,

    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20

    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        lineHeight: 34
    },
    image: {
        width: Dimensions.get('window').width * 0.7
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 16,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 24

    }

})