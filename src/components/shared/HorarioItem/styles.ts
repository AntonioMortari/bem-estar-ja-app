import { theme } from "@/theme/paper";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        padding: 8,
        borderWidth: .5,
        borderColor: theme.colors.gray,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100
    },
    
    isSelected:{
        backgroundColor: theme.colors.primary
    },

    disabled: {
        opacity: .8
    }
})

export { styles };