import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    containerDots:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    image:{
        height: 200,
        width: 200
    },
    dot:{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 1
    }
});

export { styles };