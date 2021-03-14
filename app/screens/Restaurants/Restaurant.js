import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Restaurant(props) {
    const { navigation, route} = props;
    const { id, name } = route.params;
    
    navigation.setOptions({ title: name });

    return (
        <View>
            <Text>Restaurante info</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
