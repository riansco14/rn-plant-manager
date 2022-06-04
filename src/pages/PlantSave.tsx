import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native'

import DateTimePicker, {Event} from '@react-native-community/datetimepicker'

import { SvgFromUri } from 'react-native-svg'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import waterDrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import { PlantWater } from '../components/PlantWater'
import { format, isBefore } from 'date-fns'
import { loadPlant, PlantProps, savePlant } from '../libs/storage'

interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS ==='ios')

    const navigation = useNavigation()
    const route = useRoute()

    const { plant } = route.params as Params

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android')
            setShowDatePicker(oldState => !oldState)
        
        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro! ')
        }

        if (dateTime)
            setSelectedDateTime(dateTime)
        
    }

    function handleDatePickerAndroid() {
        setShowDatePicker(oldState => !oldState)
    }

    async function handleSave() {
        const data = await loadPlant()
        console.log(data);
        
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })
            
            navigation.navigate('Confirmation',
            {
                title:'Tudo certo',
                subtitle:'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha',
                buttonTitle:'Muito obrigado',
                icon: 'hug',
                nextScreen:'MyPlants',
                })
            
        } catch (error) {
            Alert.alert('Não foi possivel salvar')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height:'100%',width: '100%'}}
        >
        <View style={style.container}>
            <View style={style.plantInfo}>
                <SvgFromUri uri={plant.photo} width={150} height={150} />
                <Text style={style.title}>
                    {plant.name}
                </Text>
                <Text style={style.subtitle}>
                    {plant.about}
                </Text>
            </View>
            <View style={style.controller}>
                <View style={style.tipContainer}>
                    <Image style={style.tipImage} source={waterDrop} />
                    <Text style={style.tipText}>{plant.water_tips} </Text>
                </View>
                <Text style={style.alertLabel}>
                    Escolha o melhor horário para ser lembrado
                </Text>

                {showDatePicker && (<DateTimePicker
                    value={selectedDateTime}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTime}
                />)}
                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                            style={style.dateTimePickerButton}
                            onPress={handleDatePickerAndroid}>
                        <Text style={style.dateTimePickerText}>
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                        </TouchableOpacity>
                    )
                }
                <Button title="Cadastrar Planta" onPress={handleSave} />
            </View>
            </View>
            </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: colors.shape,

    },
    plantInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
        backgroundColor: colors.shape
    },
    controller: {
        width: '100%',
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15

    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        textAlign: 'center',
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 16,
        lineHeight:20,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        padding: 20,
        alignItems: 'center'
    },
    dateTimePickerText: {
        fontSize: 22,
        color: colors.heading,
        fontFamily: fonts.text
    }
})