import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Animated from 'react-native-reanimated'
import { SvgFromUri } from 'react-native-svg'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface PlantCardProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string
    },
    handleRemove: ()=>void
}

export function PlantCardSecond({ data, handleRemove, ...rest }: PlantCardProps) {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={
                () => (
                    <Animated.View>
                        <View>
                            <RectButton
                                style={style.buttonRemove}
                                onPress={handleRemove}
                            >
                                <Feather name="trash" size={32} color={colors.white} />

                            </RectButton>
                        </View>
                    </Animated.View>
                )}
        >
        <RectButton style={style.container} {...rest}>
            <SvgFromUri style={style.avatarImage} uri={data.photo} width={70} height={70} />
            <Text style={style.title}>
                {data.name}
            </Text>

            <View style={style.details}>
                <Text style={style.timeLabel}>
                    Regar às 
                </Text>
                <Text style={style.time}>{data.hour}</Text>
            </View>


            </RectButton>
        </Swipeable>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    avatarImage: {
        width: 50,
        height: 50,
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        paddingLeft: 10

    }
})