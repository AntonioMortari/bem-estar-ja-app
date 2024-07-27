import { theme } from '@/theme/paper';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderColor: theme.colors.grayLight,
        borderWidth: .5,
        borderRadius: 8,
        height: 170
    },
    cover:{
        width: '45%',
        resizeMode: 'cover',
        height: '100%'
    },
    containerContent: {
        padding: 10
    },
    titulo:{
        maxWidth: 200,
        flexWrap: 'wrap'
    },
    containerIcons:{
        gap: 5,
        marginTop: 10
    }
});

export { styles };