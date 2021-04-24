import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface EnviromentButtonProps extends RectButtonProps{
    title: string
    active?: boolean
}

export function EnviromentButton({title, active = false, ...rest} : EnviromentButtonProps) {
    return (
        <RectButton {...rest} style={[style.button, active && style.buttonActive]} >
                <Text style={[style.text, active && style.textActive]} >
                    {title}
                </Text>
            </RectButton>
    )
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'baseline',
        paddingHorizontal:20,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 0,
        backgroundColor: colors.shape,
        height: 40,
        borderRadius: 12,
        
        marginRight: 8

    },
    buttonActive: {
        backgroundColor: colors.green_light

    },
    text: {
        fontFamily: fonts.complement,
        fontSize: 14,
        color: colors.heading
    },
    textActive: {
        fontFamily: fonts.heading,
        color:colors.green_dark
    }
})