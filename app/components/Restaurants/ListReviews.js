import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button, Avatar, Rating } from "react-native-elements";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

const db = firebase.firestore(firebaseApp);

export default function ListReviews() {
    const [userLogged, setUserLogged ] = useState(false);
 
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    return (
        <View>
            {userLogged ? (
                <Button 
                    title="Escribe una opinion"
                />
            ): (
                <View>
                    <Text>Para escribir un comentario es necesario estar loggeado</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({})
