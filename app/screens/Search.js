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
            {restaurants.length === 0 ? (
                <NoFoundRestaurants />
            ) : (
                <View>
                    <Text>Resultado...</Text>
                </View>
            )}
        </View>
    );
}

function NoFoundRestaurants(){
    return (
    <View style={{ flex: 1, alignItems: "center"}}>
        <Image 
            source={require("../../assets/img/no-result-found.png")}
            resizeMode="cover"
            style={{ width: 200, height: 200}}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    }
})