import { theme } from '@/theme/paper';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container:{

    },
    containerImage:{
        height: 220
    },
    image:{
        height: '100%'
    },
    titulo:{
        fontFamily: theme.fonts.semibold
    },
    conteudo:{
        padding: 15,
        gap: 30
    },
    descricao:{
        color: theme.colors.grayDark
    },
    secao:{
        gap: 10
    },
    containerIcons:{
        gap: 10
    },
})

export { styles };