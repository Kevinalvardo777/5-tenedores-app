import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";

export default function ChangeDisplayNameForm(props) {
    const { displayName, setShowModal, toastRef } = props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = () => {
        setError(null);
        if(!newDisplayName) {
            setError("El nombre no puede estar vacío");
        } else if (displayName === newDisplayName) {
            setError("El nombre no puede ser igual al actual");
        } else {
            console.log("OK");
        }
    }

    return (
        <View styler={styles.view}> 
            <Input 
                placeholder="Nombres y apellidos"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                defaultValue={displayName || ""}
                onChange={ e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button 
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center", 
        paddingTop: 10, 
        paddingBottom: 10
    }, 
    input: {
        marginBottom: 10
    }, 
    btnContainer: {
        marginTop: 20, 
        width: "95%"
    }, 
    btn: {
        backgroundColor: "#00a680"
    }
});