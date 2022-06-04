import { formatDistance } from 'date-fns/esm'
import React, { useEffect, useState } from 'react'
import {
    Alert,
    Image,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { pt } from 'date-fns/locale'

import { Header } from '../components/Header'
import { loadPlant, PlantProps, removePlant, StoragePlantProps } from '../libs/storage'
import colors from '../../styles/colors'
import waterDrop from '../assets/waterdrop.png'
import { PlantCardSecond } from '../components/PlantCardSecond'
import fonts from '../../styles/fonts'
import { Load } from '../components/Load'

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWaterPlant, setNextWaterPlant] = useState<string>()


    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover ${plant.name} ?`, [
            { text: 'Não', style: 'cancel' },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removePlant(plant)

                        setMyPlants((oldData) => 
                            oldData.filter(
                                (item) => item.id !== plant.id)
                        )
                    } catch (error) {
                        Alert.alert("Não foi possivel remover!")
                    }

                 },
                style: 'cancel'
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant()

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWaterPlant(`Não esqueça de regar a planta ${plantsStoraged[0].name} à ${nextTime} horas`)

            setMyPlants(plantsStoraged)
            setLoading(false)

        }
        loadStorageData()

    }, [])

    if (loading)
        return (<Load />)


    return (
        <SafeAreaView style={style.safeArea}>
            <View style={style.container}>
                <Header />

                <View style={style.spotlight}>
                    <Image style={style.spotlightImage} source={waterDrop} />
                    <Text style={style.spotlightText}>{nextWaterPlant} </Text>
                </View>

                <View style={style.plants}>
                    <Text style={style.plantsTitle}>
                        Proximas regadas
                </Text>
                

                <FlatList data={myPlants}
                    keyExtractor={item => String(item.id)}
                        renderItem={({ item }) =>
                        (<PlantCardSecond
                            data={item}
                            handleRemove={()=>handleRemove(item)}
                        />)}
                    showsVerticalScrollIndicator={false}
                    />
                    </View>


            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify'
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})