import React, {useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image , Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { map, size, filter } from "lodash";
import Modal from "../Modal";

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
    const { toastRef, setIsLoading, navigation } = props;
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [imageSelected, setImageSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);


    const addRestaurant = () => {
        console.log("ok");
        console.log(imageSelected);

        /*console.log("restaurantName: " + restaurantName);
        console.log("restaurantAddress: " + restaurantAddress);
        console.log("restaurantDescription: " + restaurantDescription);*/
    }

    return (
        <ScrollView style={styles.scrollView}>
            <ImageRestaurant 
                imageRestaurant={imageSelected[0]}
            />
            <FormAdd 
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}
            />
            <UploadImage toastRef={toastRef} setImageSelected={setImageSelected} imageSelected={imageSelected} />
            <Button 
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap} />
        </ScrollView>
    );
}

function ImageRestaurant(props) {
    const { imageRestaurant } = props;

    return(
        <View style={styles.viewPhoto}>
            <Image 
                source={
                    imageRestaurant ? {uri: imageRestaurant} 
                    : require("../../../assets/img/no-image.png") }
                style={{ width: widthScreen, height: 200}}
            />
        </View>
    )
}

function FormAdd(props) {
    const { setRestaurantName, setRestaurantAddress, setRestaurantDescription, setIsVisibleMap} = props;
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
                rightIcon={{
                    type: "material-community", 
                    name: "google-maps", 
                    color: "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
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

function Map(props) {
    const { isVisibleMap, setIsVisibleMap } = props;
    const [location, setLocation] = useState(null);

    useEffect(() => {
        //Funcion anonima asincrona autoejecutable
        (async () => {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            );
            const statusPermissions = resultPermissions.permissions.location.status;

            if(statusPermissions !== "granted"){
                toastRef.current.show("Tienes que aceptar los permisos de localización para crear un restaurante", 3000)
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude, 
                    longitude: loc.coords.longitude, 
                    latitudeDelta: 0.001, 
                    longitudeDelta: 0.001
                })
            }
        })()
    }, []);
    
    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <Text>Mapa</Text>
        </Modal>
    )
}

function UploadImage(props){
    const { toastRef, setImageSelected, imageSelected } = props;
    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA
        );


        if(resultPermissions === "denied"){
            toastRef.current.show("Es necesario activar los permisos de la galeria, si los has rechazado, tienes que ir a ajustes y activarlos manualmente");

        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true, 
                aspect:[4,3]
            });

            console.log(result);
            if(result.cancelled){
                toastRef.current.show(
                    "Has cerrado la galería sin seleccionar ninguna imagen",
                    2000
                )
            } else {
                setImageSelected([...imageSelected, result.uri])
            }
        }
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "Estás seguro de que quieres eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style:"cancel"
                }, 
                {
                    text: "Eliminar",
                    onPress: () => {
                        setImageSelected(
                        filter(imageSelected, (imageUrl) => imageUrl !== image)
                        );
                    }
                },
            ], 
            {cancelable: false}
        )
    }

    return (
        <View style={styles.viewImage}>
            {size(imageSelected) < 4 && (
                 <Icon 
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
           
        {map(imageSelected, (imageRestaurant, index) => (
            <Avatar 
                key={index}
                style={styles.miniatureStyle}
                source={{ uri: imageRestaurant }}
                onPress={() => removeImage(imageRestaurant)}
            />  
        ))}
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
    }, 
    miniatureStyle: {
        width: 70,
        height: 70, 
        marginRight: 10
    }, 
    viewPhoto: {
        alignItems: "center", 
        height: 200, 
        marginBottom: 20
    }
})