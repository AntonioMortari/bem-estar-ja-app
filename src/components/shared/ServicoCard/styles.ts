import { StyleSheet } from 'react-native';

import { theme } from '@/theme/paper';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.light,
        width: 270,
        marginRight: 20
    },
    containerIcons: {
        gap: 6,
        alignItems: 'flex-start',
    },
    cover: {
        height: 120,
        resizeMode: 'contain'
    }
});

export { styles };