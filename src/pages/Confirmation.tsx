import React, { useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import fonts from '../../styles/fonts'
import colors from '../../styles/colors'
import { Button } from '../components/Button'
import { useNavigation, useRoute } from '@react-navigation/core'

interface Params{
    title: string
    subtitle: string
    buttonTitle: string
    icon: 'smile' | 'hug'
    nextScreen: string
}

const emojis = {
    hug: '🤗',
    smile: '😊'
}


export function Confirmation() {
    const navigation = useNavigation()

    const routes = useRoute()
    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen,
    } = routes.params as Params
    
    function handleNextPage(){
        navigation.navigate(nextScreen)
        //navigation.navigate("PlantSelect")
    }
    
    return (
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <Text style={style.emoji}>
                    😄 
                </Text>
                <Text style={style.title}>
                    {title}
                </Text>
                <Text style={style.subtitle}>
                    {subtitle}
                </Text>
                <View style={style.buttonView}>
                    <Button title={buttonTitle} onPress={ handleNextPage}/>
                </View>
            </View>
        </SafeAreaView>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 36
    },
    emoji: {
        fontSize: 72
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        textAlign: 'center',
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        textAlign: 'center',
        paddingVertical: 10
    },
    buttonView: {
        width: '100%',
        marginTop:20,
        paddingHorizontal: 50
    }
})