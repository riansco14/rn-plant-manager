import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import colors from '../../styles/colors'

import waterImage from '../assets/watering.png'
import { Button } from '../components/Button'


export function Welcome() {
    const [visible, setVisible] = useState(true)

    function handleVisible() {
        setVisible(!visible)
    }

    return (<SafeAreaView style={style.container}>
        <Text style={style.title}>
            Gerencie {'\n'}
            suas plantas de forma fácil
        </Text>

        {
            visible &&
            <Image source={waterImage} style={style.image} />
        }


        <Text style={style.subtitle}>
            Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
            sempre que precisar.
        </Text>

        <Button title=">" onPress={handleVisible}>
        </Button>
    </SafeAreaView>)
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? 25 : 0,

    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    image: {
        width: 292,
        height: 284
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        justifyContent: 'center',
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
    buttonText: {
        color: colors.white,
        fontSize: 22,
        alignSelf: 'center'

    }

})