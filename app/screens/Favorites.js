import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";
import { size } from "lodash";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
    const { navigation} = props;
    const [restaurants, setRestaurants] = useState([]);
    const [userLogged, setUserLogged] = useState(false);

    console.log(restaurants);

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    useFocusEffect(
        useCallback(() => {
            if(userLogged){
                const idUser = firebase.auth().currentUser.uid;
                db.collection("favorites")
                    .where("idUser", "==", idUser)
                    .get()
                    .then((response) => {
                        const idRestaurantsArray = [];
                        response.forEach((doc) => {
                            idRestaurantsArray.push(doc.data().idRestaurant)
                        });
                        getDataRestaurant(idRestaurantsArray).then((response) => {
                            const restaurants = [];
                            response.forEach((doc) => {
                                const restaurant = doc.data();
                                restaurant.id = doc.id;
                                restaurants.push(restaurant);
                            });
                            setRestaurants(restaurants);
                        })
                    })
            }
        }, [userLogged])
    );

    const getDataRestaurant = (idRestaurantsArray) => {
        const arrayRestaurants = [];
        idRestaurantsArray.forEach((idRestaurant) => {
            const result = db.collection("restaurants").doc(idRestaurant).get();
            arrayRestaurants.push(result);
        })
        return Promise.all(arrayRestaurants);
    }

    if(!userLogged){
        return <UserNoLogged navigation={navigation} />
    }

    if (size(restaurants) === 0) {
        return <NotFoundRestaurants /> 
    }

    return (
        <View>
            <Text>Favorites...</Text>
        </View>
    );
}

function NotFoundRestaurants(){
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Icon
                type="material-community"
                name="alert-outline"
                size={50} 
            />
            <Text style={{fontSize: 20, fontWeight: "bold"}}>
                No tienes restaurantes en tu lista
            </Text>
        </View>
    )
}

function UserNoLogged(props) {
    const { navigation } = props;

    return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Icon 
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center"}}>
                Necesitas estar loggeado para ver esta sección
            </Text>
            <Button 
                title="Ir al login"
                containerStyle={{ marginTop: 20, width: "80%"}}
                buttonStyle={{ backgroundColor: "#00a680"}}
                onPress={() => navigation.navigate("account", { screen: "login" })}
            />
        </View>
    )
}