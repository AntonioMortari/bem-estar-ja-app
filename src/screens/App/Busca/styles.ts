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
        minHeight: 140,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 10
    },
    titulo: {
        marginTop: 35
    },
    containerBusca: {
        alignItems: 'center',
        marginTop: 30
    },
    inputBusca: {
        backgroundColor: theme.colors.light,
        width: '90%',
        height: 50
    },
    containerResult:{
        marginTop: 20,
        gap: 20,
        width: '90%',
        margin: 'auto',
        marginBottom: 30
    }

});

export { styles };