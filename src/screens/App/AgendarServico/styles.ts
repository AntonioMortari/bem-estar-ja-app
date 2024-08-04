import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        marginTop: 30
    },

    header:{
        gap: 10
    },

    buttonVoltar:{
        width: 30,
        marginBottom: 15
    },

    containerServicoData:{
        marginTop: 20
    },

    containerServicoNomeFoto:{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },

    containerIcons: {
        gap: 6,
        alignItems: 'flex-start',
    },

    imagem:{
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 16
    },

    buttonDetalhes:{
        marginVertical: 10
    }
})

export { styles };