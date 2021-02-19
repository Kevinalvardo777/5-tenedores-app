import React,{ useState } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";


export default function RegisterForm(props) {
    const { toastRef } = props;
    const [ showPasssword, setShowPassword ] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [ formData, setFormData ] = useState(defaultFormValue());
    const [loading, setloading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)) {
            toastRef.current.show("todos los campos son obligatorios");
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("El email no es correcto");
        } else if (formData.password !== formData.repeatPassword){
            toastRef.current.show("Las contraseñas tienen que ser iguales");
        } else if (size(formData.password) < 6){
            toastRef.current.show("contraseña tiene que tener al menos 6 caracteres");
        } else {
            setloading(true)
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then((response) => {
                setloading(false);
                navigation.navigate("account");
            })
            .catch((error) => {
                setloading(false);
                toastRef.current.show("El email ya está en uso, pruebe con otro");
            })
        }
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
            <Loading isVisible={loading} text="Creando cuenta" />
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