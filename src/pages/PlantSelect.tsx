import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'


import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import {Load} from '../components/Load'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { PlantProps } from '../libs/storage'


import api from '../services/api'

interface EnviromentProps {
    key: string,
    title: string
}


export function PlantSelect() {
    const [loading, setLoading] = useState(true)
    const [enviroments, setEnviroment] = useState<EnviromentProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [plantsFiltered, setPlantsFiltered] = useState<PlantProps[]>([])
    const [enviromentSelected, setEnviromentSelected] = useState('all')

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)

    const navigation = useNavigation()


    async function fetchEnviroment() {
        const { data } = await api
            .get(`plants_environments?_sort=title&_order=asc`)
        setEnviroment(data)
    }

    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=${6}`)
        
        if (!data)
            return setLoading(true)
        if (page > 1) {
            setPlants(oldValues =>[...oldValues,...data])
            setPlantsFiltered(oldValues =>[...oldValues,...data])
        }
        else {
            setPlants(data)
            setPlantsFiltered(data)
        }
        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) {
            return;
        }
        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    useEffect(() => {
        
        fetchEnviroment()
    }, [])

    useEffect(() => {
        
        fetchPlants()
    }, [])

    if (loading)
        return (<Load />)

    function handleFiltered(enviroment: EnviromentProps) {
        setEnviromentSelected(enviroment.key)
        if (enviroment.key === 'all')
            return setPlantsFiltered(plants)
        /*
                let newArr = []
                for (let i = 0; i < plants.length; i++) {
                    for (let j = 0; j < plants[i].enviroments.length; j++) {
                        if (enviroment.key == plants[i].enviroments[j])
                            newArr.push(plants[i])
                    }
                }
                return setPlantsFiltered(newArr)
                */
        const newArr = plants.filter(plant => 
            plant.environments.includes(enviromentSelected)
        )
        setPlantsFiltered(newArr)
    }

    function handlePlantSelect(plant : PlantProps) {
        navigation.navigate("PlantSave", {plant})
    }


    
    return (
        <SafeAreaView style={style.safeArea}>
            <View style={style.container}>
                <Header />
                <Text style={style.textBold}>
                    Em qual ambiente
                    </Text>
                <Text style={style.text}>
                    você quer colocar a sua planta ?
                    </Text>
                <View>
                    <FlatList contentContainerStyle={style.flatListEnviroment}
                        data={[{ key: 'all', title: 'Todos' }, ...enviroments]}
                       // keyExtractor={(item)=>String(item.key)}
                        renderItem={({ item }) => (<EnviromentButton title={item.title}
                        active={item.key === enviromentSelected} onPress={() => handleFiltered(item)} />)} horizontal showsHorizontalScrollIndicator={false}></FlatList>
                </View>
                <View style={style.plants}>
                    <FlatList
                        data={plantsFiltered}
                        //keyExtractor={(item)=>String(item.key)}
                        renderItem={({ item }) => (<PlantCardPrimary data={item} onPress={()=>handlePlantSelect(item)} />)}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={({distanceFromEnd})=>{handleFetchMore(distanceFromEnd)}}
                        ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green}/>:<></>}
                    ></FlatList>
                </View>


            </View>
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
        padding: 30,
        backgroundColor: colors.background
    },
    textBold: {
        marginTop: 15,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading
    },
    flatListEnviroment: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32,

    },
    plants: {
        flex: 1,
        flexDirection: 'row'
    }
})
