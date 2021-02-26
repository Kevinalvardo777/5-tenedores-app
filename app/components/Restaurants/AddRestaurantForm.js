import React, {useState} from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image , Input, Button } from "react-native-elements";

export default function AddRestaurantForm(props) {
    const { toastRef, setIsLoading, navigation } = props;
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");

    const addRestaurant = () => {
        console.log("ok");
        console.log("restaurantName: " + restaurantName);
        console.log("restaurantAddress: " + restaurantAddress);
        console.log("restaurantDescription: " + restaurantDescription);
    }

    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd 
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantDescription={setRestaurantDescription}
            />
            <UploadImage />
            <Button 
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
        </ScrollView>
    );
}

function FormAdd(props) {
    const { setRestaurantName, setRestaurantAddress, setRestaurantDescription} = props;
    return (
        <View style={styles.viewForm}>
            <Input 
                placeholder="Nombre del restaurante"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Direccion"
                containerStyle={styles.input}
                onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Descripcion del restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />

        </View>
    )
}

function UploadImage(){
    const imageSelect = () => {
        console.log("imagenes..")
    }

    return (
        <View style={styles.viewImage}>
            <Icon 
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%"
    }, 
    viewForm: {
        marginLeft: 10, 
        marginRight: 10
    }, 
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100, 
        width: "100%", 
        padding: 0, 
        margin: 0
    }, 
    btnAddRestaurant: {
        backgroundColor: "#00a680", 
        margin: 20
    }, 
    viewImage: {
        flexDirection: "row", 
        marginLeft: 20, 
        marginRight: 20, 
        marginTop: 30
    }, 
    containerIcon: {
        alignItems: "center",
        justifyContent: "center", 
        marginRight: 10, 
        height: 70, 
        width: 70,
        backgroundColor: "#e3e3e3"
    }
})