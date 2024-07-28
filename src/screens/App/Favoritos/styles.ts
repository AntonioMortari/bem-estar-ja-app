import { theme } from "@/theme/paper";
import { StyleSheet, SafeAreaView } from "react-native";

export const styles = StyleSheet.create({
    titulo: {
        marginTop: 45
    },
    containerHeader: {
        backgroundColor: theme.colors.primary,
        minHeight: 180,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 10
    },
    containerBusca: {
                marginTop: 100,
        alignItems: 'center'
    },
    inputBusca: {
        backgroundColor: theme.colors.light,
        width: '90%',
        height: 50
    },



    containerSegmentos: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
      },
    });


