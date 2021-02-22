import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";

export default function ChangePasswordForm(props) {
    const { setShowModal ,toastRef } = props
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false: true}
                rightIcon={{
                    type: "material-community", 
                    name: showPassword ? "eye-off-outline": "eye-outline", 
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
            />
            <Input 
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false: true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline": "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
            />
            <Input 
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false: true}
                rightIcon={{
                    type: "material-community", 
                    name: showPassword ? "eye-off-outline": "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
            />
            <Button 
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
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