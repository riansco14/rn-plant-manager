import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, TouchableOpacityProps } from 'react-native'
import colors from '../../styles/colors'

import waterImage from '../assets/watering.png'

interface ButtonProps extends TouchableOpacityProps{
    title: string
}

export function Button({title, ...rest}: ButtonProps) {
    return (
        <TouchableOpacity style={style.button} activeOpacity={0.8} {...rest}>
            <Text style={style.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 16,
        height: 56,
        padding: 20
    },
    buttonText: {
        color: colors.white,
        fontSize: 22,
        alignSelf: 'center'

    }

})