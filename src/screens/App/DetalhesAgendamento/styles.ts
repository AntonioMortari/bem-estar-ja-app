import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        marginVertical: 30,
    },
    header: {
        gap: 10
    },

    buttonVoltar: {
        width: 30,
        marginBottom: 15
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
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
});

export { styles }