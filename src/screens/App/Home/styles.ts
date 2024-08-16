import { theme } from '@/theme/paper';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    containerLocalizacao: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 10,
        alignItems: 'center'
    },
    header: {
        backgroundColor: theme.colors.primary,
        minHeight: 180,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 10
    },
    titulo: {
        marginTop: 35
    },
    containerBusca: {
        marginTop: -30,
    alignItems: 'center'
    },
    inputBusca: {
        backgroundColor: theme.colors.light,
        width: '90%',
        height: 50
    },
    containerSecoes: {
        marginVertical: 40,
        paddingHorizontal: 10,
        gap: 20
    }
});

export { styles };