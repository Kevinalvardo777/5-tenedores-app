import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
    const { navigation} = props;
    const [restaurants, setRestaurants] = useState(null);
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

    if (restaurants?.length === 0) {
        return <NotFoundRestaurants /> 
    }

    return (
        <View style={styles.viewBody}>
           {restaurants ? (
               <FlatList 
                    data={restaurants}
                    renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
                    keyExtractor={ (item, index) => index.toString()}
               />
           ) : (
               <View style={styles.loaderRestaurants}>
                   <ActivityIndicator size="large" />
                   <Text style={{textAlign: "center"}}>Cargando restaurantes...</Text>
               </View>
           )}
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

function Restaurant(props){
    const { restaurant } = props;    
    const { name, images } = restaurant.item;
    return (
        <View style={styles.restaurant}>
            <TouchableOpacity onPress={() => console.log("IR")}>
                <Image  
                    resizeMode="cover"
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    source={
                        images[0]
                        ? { uri: images[0]}
                        : require("../../assets/img/no-image.png")
                    }
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Icon 
                        type="material-community"
                        name="heart"
                        color="#f00"
                        containerStyle={styles.favorites}
                        onPress={() => console.log("remove")}
                        underlayColor="transparent"
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10
    }, 
    restaurant: {
        margin: 10    
    },
    image: {
        width: "100%",
        height: 180
    }, 
    info: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30, 
        backgroundColor: "#fff"
    }, 
    name: {
        fontWeight: "bold",
        fontSize: 30
    },
    favorites: {
        marginTop: -35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100
    }
})