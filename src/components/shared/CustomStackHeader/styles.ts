import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    header:{
        backgroundColor: 'transparent',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 15,
        zIndex:10,
        borderRadius: 16
    },
    back:{
        padding: 5,
        borderRadius: 16,
    }
});

export { styles };