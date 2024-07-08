import { theme } from '@/theme/paper';
import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    containerText: {
        flex: 0.2,
        paddingHorizontal: 15
    },
    image: {
        flex: 0.5,
        justifyContent: 'center'
    },
    title: {
        marginBottom: 10,
        color: theme.colors.primary,
        textAlign: 'center'
    },
    description: {
        color: theme.colors.grayDark,
        textAlign: 'center',
        paddingHorizontal: 10,
    }
});

export { styles };