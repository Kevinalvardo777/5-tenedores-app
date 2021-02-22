import React, { useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";

export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const onSubmit = () => {
        setErrors({});
        if (!formData.email || email === formData.email) {
            setErrors({
                email: "El email no ha cambiado."
            });
        } else if (!validateEmail(formData.email)) {
            setErrors({
                email: "Email incorrecto."
            })
        } else if (!formData.password){
            setErrors({
                password: "La contraseña no puede estar vacía."
            })
        } else {
            console.log("OK");
        }
    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Correo electrónico"
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false: true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline": "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Button 
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
            />
        </View>
    );
}

function defaultValue() {
    return {
        email: "", 
        password: ""
    }
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
        width: "95%",
    }, 
    btn: {
        backgroundColor: "#00a680"
    }
})