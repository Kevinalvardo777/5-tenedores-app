import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";

export default function Search(props) {
    const { navigation } = props;
    const [search, setSearch] = useState("");

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