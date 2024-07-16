import { theme } from "@/theme/paper";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container:{
        height: 120,
        borderRadius: 8,
        borderColor: theme.colors.grayDark,
        borderWidth: .5,
        padding: 15
    },
    header:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    conteudo:{

    },
    containerNome:{
    },
    data:{
        marginVertical: 10,
        color: theme.colors.gray
    },
    avaliacao:{
        
    }
})

export { styles };