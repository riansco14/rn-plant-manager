import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import {SvgFromUri} from 'react-native-svg'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface PlantCardProps extends RectButtonProps{
    data: {
        name: string,
        photo: string
    }
}

export function PlantCardPrimary({data, ...rest}: PlantCardProps) {
    return (
        
        <RectButton  style={style.container} {...rest}>
        <SvgFromUri style={style.avatarImage} uri={data.photo} width={70} height={70} />
        <Text style={style.text}>
            {data.name}
        </Text>


        </RectButton>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%' ,
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
        marginVertical: 16
    },
    avatarImage: {
        width: 80,
        height: 80,
    },
})