import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        marginVertical: 30,
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
        marginVertical: 15
    },

    imagem:{
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 16
    },

    buttonDetalhes:{
        marginVertical: 10,
        width: 150
    },

    containerButtons:{
        flexDirection: 'row',
        width: '100%',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },

    containerHorarios:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 25,
        marginTop: 20,
        justifyContent: 'center'
    }
})

export { styles };