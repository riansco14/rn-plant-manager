import React, { useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import fonts from '../../styles/fonts'
import colors from '../../styles/colors'
import { Button } from '../components/Button'

export function Confirmation() {

    return (
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <Text style={style.emoji}>
                    😄 
                </Text>
                <Text style={style.title}>
                    Prontinho
                </Text>
                <Text style={style.subtitle}>
                    Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
                </Text>
                <View style={style.buttonView}>
                    <Button title="Confirmar"/>
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