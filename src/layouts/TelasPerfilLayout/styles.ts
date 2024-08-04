import { theme } from "@/theme/paper";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        marginTop: 30,
    },

    header:{
        gap: 10
    },

    buttonVoltar:{
        width: 30,
        marginBottom: 15
    },

    titulo:{

    },

    descricao:{
        color: theme.colors.grayDark
    },
    containerConteudo:{
        marginTop: 30
    }
})

export { styles };