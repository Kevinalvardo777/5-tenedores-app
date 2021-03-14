import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AddReviewRestaurant(props) {
    const { navigation, route } = props;
    const { idRestaurant } = route.params;
    
    console.log(idRestaurant);

    return (
        <View>
            <Text>AddReviewRestaurant</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
