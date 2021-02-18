import React,{ useState } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";

export default function RegisterForm() {
    const [ showPasssword, setShowPassword ] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [ formData, setFormData ] = useState(defaultFormValue());

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)) {
            console.log("Todos los campos son obligatorios");
        } else if (!validateEmail(formData.email)) {
           console.log("El email no es correcto");
        } else if (formData.password !== formData.repeatPassword){
            console.log("las contraseñas tienen que ser iguales");
        } else if (size(formData.password) < 6){
            console.log("contraseña tiene que tener al menos 6 caracteres");
        } else {
            console.log("ok");
        }

        
        //console.log(formData);
        //console.log(validateEmail(formData.email));
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electrónico"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "password")}
                password={true}
                secureTextEntry={showPasssword ? false: true}
                rightIcon={
                    <Icon 
                        type="material-community"
                         name={ showPasssword ? "eye-off-outline": "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPasssword)}
                    />
                }
            />
            <Input 
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "repeatPassword")}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={ showRepeatPassword ? "eye-off-outline": "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button 
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "", 
        repeatPassword: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    }, 
    inputForm: {
        width: "100%",
        marginTop: 20,
    }, 
    btnContainerRegister: {
        marginTop: 20,
        width: "95%"
    }, 
    btnRegister: {
        backgroundColor: "#00a680"
    }, 
    iconRight: {
        color: "#c1c1c1"
    }
});