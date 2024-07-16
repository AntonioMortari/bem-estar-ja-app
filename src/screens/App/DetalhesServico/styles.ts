import { theme } from '@/theme/paper';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
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
    mapa:{
        height: 200,
        width: '100%',
        borderRadius: 8,
        borderColor: theme.colors.gray,
        borderWidth: 0.5
    },
    containerPerfil:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop:15
    },
    containerTextPerfil:{
        gap: 4
    },
    nomePerfil:{
        fontFamily: theme.fonts.semibold
    },
    areaAtuacaoPerfil:{
        color: theme.colors.grayDark
    },
    botaoVerPerfil:{
        width: '40%'
    },
    containerAvaliacoes:{
        gap: 15
    },
    footer:{
        flexDirection: 'row',
        padding: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: theme.colors.gray,
        borderTopWidth: .5
    }
});

export { styles };