import { theme } from "@/theme/paper";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    circulo:{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.dark
    },
    texto:{
    }
})

export { styles };