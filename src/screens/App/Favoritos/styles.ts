import { theme } from "@/theme/paper";
import { StyleSheet, SafeAreaView } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    titulo: {
        // marginTop: 57
    },
    containerHeader: {
        backgroundColor: theme.colors.primary,
        minHeight: 140,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 10,
        justifyContent: 'center'
    },
    containerBusca: {
        marginTop: 100,
        alignItems: 'center'
    },

    containerSegmentos: {
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 10
    },

    containerConteudo: {
        marginTop: 20,
        gap: 10,
        paddingHorizontal: 15
    },
});


