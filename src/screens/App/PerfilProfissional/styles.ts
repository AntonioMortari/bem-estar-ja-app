import { theme } from '@/theme/paper';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container:{
    },
    containerImage:{
        height: 220,
    },
    image:{
        height: '100%',
    },
    titulo:{
        fontFamily: theme.fonts.semibold
    },
    subtitulo:{
        color: theme.colors.gray  
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
    sobre:{
        color: theme.colors.grayDark,
        textAlign: 'justify'  
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    containerInformacoes:{
        gap: 30,
        marginTop: 30
    },
    containerServicos:{

    },
    mapa:{
        
    }
})

export { styles };