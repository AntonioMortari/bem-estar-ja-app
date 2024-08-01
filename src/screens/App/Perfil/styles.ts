import { theme } from "@/theme/paper";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{

    },

    header:{
        backgroundColor: theme.colors.primary,
        minHeight: 140,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 20,
    },

    containerTitulo:{
        flexDirection:  'row',
        gap: 15,
        alignItems: 'center',
        marginTop: 20

    },

    nome:{
        color: theme.colors.light
    },

    subtitulo:{
        color: theme.colors.grayLight
    },

    perfil:{

    },

    containerOpcoes:{
        width: '90%',
        margin: 'auto',
        marginTop: 35,
        gap: 10
    },

    legenda:{
        marginTop: 35,
        color: theme.colors.grayLight,
        paddingHorizontal: 40,
        textAlign: 'center'
    }
});

export { styles };