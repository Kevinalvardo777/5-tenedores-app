import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "../../components/Loading";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Restaurant(props) {
    const { navigation, route} = props;
    const { id, name } = route.params;
    const [restaurant, setRestaurant] = useState(null);

    navigation.setOptions({ title: name });

    useEffect(() => {
        db.collection("restaurants")
            .doc(id)
            .get()
            .then((response) => {
                const data = response.data();
                data.id = response.id;
                setRestaurant(data);
            });
    }, []);

    if(!restaurant) return <Loading isVisible={true} text="Cargando..." />

    return (
        <View>
            <Text>Restaurante info</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
