import { theme } from "@/theme/paper";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    starArea: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    starText: {
        marginLeft: 5,
        color: theme.colors.grayDark,
    }
});

export { styles };