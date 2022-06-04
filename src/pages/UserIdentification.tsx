import React, { useState } from 'react'
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native'

import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

import fonts from '../../styles/fonts'
import colors from '../../styles/colors'
import { Button } from '../components/Button'

export function UserIdentification() {

    const [isFocused, setFocused] = useState(false)
    const [isFilled, setFilled] = useState(false)
    const [name, setName] = useState<string>()

    const navigation = useNavigation()

    async function handleConfirm() {
        if (!name) 
            return Alert.alert('Me diz como chamar você')
        
        try {
            await AsyncStorage.setItem("@plantmanager:user", name)
            navigation.navigate('Confirmation',
            {
                title:'Prontinho',
                subtitle:'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle:'Começar',
                icon: 'smile',
                nextScreen:'PlantSelect',
            })
        } catch (error) {
            Alert.alert('Não foi possivel salvar seu nome')
        }
    }


    function handleFocus() {
        setFocused(true)
    }

    function handleBlur() {
        setFocused(false)
        setFilled(!!name)
    }

    function handleName(value: string) {
        setFilled(!!value)
        setName(value)
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <KeyboardAvoidingView style={style.safeArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback style={style.container} onPress={Keyboard.dismiss}>
                    <View style={style.container}>
                        <View style={style.form}>
                            <Text style={style.emoji}>
                                {isFilled ? '😄' : '😀'}
                            </Text>
                            <Text style={style.title}>Como podemos {'\n'}chamar você ?</Text>
                            <TextInput
                                style={[style.textInput, (isFocused || isFilled) && { borderBottomColor: colors.green }]}
                                placeholder="Digite um nome"
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                onChangeText={handleName}
                            ></TextInput>
                            <View style={style.buttonView}>

                                <Button title="Confirmar" onPress={handleConfirm}></Button>
                            </View>




                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: '100%',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    container: {
        flex: 1,
        width: '100%',

    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 34,
        paddingHorizontal: 54

    },
    emoji: {
        fontSize: 44
    },
    title: {
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 24,
        lineHeight: 32

    },
    textInput: {
        width: '100%',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: colors.gray,
        marginTop: 50,
        padding: 10,

        fontSize: 18,
        fontFamily: fonts.text,
        lineHeight: 23,
        textAlign: 'center'
    },
    buttonView: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
})