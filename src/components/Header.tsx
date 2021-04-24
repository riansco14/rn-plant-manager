import React from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function Header() {
    return (
            <View style={style.container}>
                <View>
                    <Text style={style.title}>
                        Olá,
                    </Text>
                    <Text style={style.spanTitle}>
                        Tiago
                    </Text>
                </View>

                <Image style={style.avatarImage} source={{ uri: "https://avatars.githubusercontent.com/u/26466516?v=4" }} />
            </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 32
    },
    spanTitle: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 32,
        lineHeight:34
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    },

})
