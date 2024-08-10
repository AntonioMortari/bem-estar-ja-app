import { theme } from '@/theme/paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        
    },
    header: {
        backgroundColor: theme.colors.primary,
        minHeight: 140,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 10,
        justifyContent: 'center'
    },
    titulo: {
        color: theme.colors.light
    },
    containerAgendamentos: {
        marginTop: 35,
        paddingHorizontal: 18,
        gap: 20,
        marginBottom: 35
    }
});

export { styles };