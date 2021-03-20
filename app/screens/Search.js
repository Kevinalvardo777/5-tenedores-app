import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" }); 

export default function Search(props) {
    const { navigation } = props;
    const [search, setSearch] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    console.log(restaurants);

    useEffect(() => {
        if(search){
        fireSQL.query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
            .then((response) => {
                console.log(response);
                setRestaurants(response);
            })  
        }
    }, [search])

    return (
        <View>
            <SearchBar 
                placeholder="Busca tu restaurante..."
                onChangeText={(e) => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    }
})