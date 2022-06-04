import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'


import waterDrop from '../assets/waterdrop.png'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface PlantWaterProps{
    title: string
}

export function PlantWater({title}:PlantWaterProps) {
    return (
        <View style={style.container}>
            <Image style={style.waterImage} source={waterDrop} />
            <Text style={style.text}>{title} </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,

        backgroundColor: colors.blue_light,
        padding: 20,
        
        position: 'relative',
        bottom: 60

    },
    waterImage: {
        height: 56,
        width:56
    },
    text: {
        flex:1,
        fontFamily: fonts.text,
        fontSize: 16,
        lineHeight:20,
        color: colors.blue,
        textAlign: 'justify',
        marginLeft: 20
    }
})