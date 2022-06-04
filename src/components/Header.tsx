import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function Header() {
    const [username, setUsername] = useState<string>()
    useEffect(() => {
        async function loadStorageUsername() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUsername(user || '')

        }
        loadStorageUsername()
        

    }, [username])


    return (
        <View style={style.container}>
            <View>
                <Text style={style.title}>
                    Olá,
                    </Text>
                <Text style={style.spanTitle}>
                    {username}
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
        justifyContent: 'space-between',
        paddingVertical: 20,  
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
        lineHeight: 40
    },
    avatarImage: {
        width: 70,
        height: 70,
        borderRadius: 40
    },

})
