import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem} from "react-native-elements";
import { map } from "lodash";

export default function AccountOptions(props) {
    const { userInfo, toastRef } = props;
    //console.log(menuOptions);

    const selectComponent = (key) => {
        console.log("Click!!!")
        console.log(key);
    }

    const menuOptions = generateOptions(selectComponent);


    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem 
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType, 
                        name: menu.iconNameLeft, 
                        color: menu.iconColorLeft, 
                    }}
                    rightIcon={{
                        type: menu.iconType, 
                        name: menu.iconNameRight, 
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}
        </View>
    );
}

function generateOptions(selectComponent) {
    return [
        {
            title: "Cambiar nombre y apellidos", 
            iconType: "material-community", 
            iconNameLeft: "account-circle", 
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("displayName")
        }, 
        {
            title: "Cambiar email", 
            iconType: "material-community", 
            iconNameLeft: "at", 
            iconColorLeft: "#ccc", 
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc", 
            onPress: () => selectComponent("email")
        }, 
        {
            title: "Cambiar contraseña", 
            iconType: "material-community", 
            iconNameLeft: "lock-reset", 
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc", 
            onPress: () => selectComponent("password")
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1, 
        borderBottomColor: "#e3e3e3"
    }
});