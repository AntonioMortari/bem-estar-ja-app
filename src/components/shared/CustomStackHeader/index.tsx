
import { View } from 'react-native';
import { styles } from './styles';

import { AntDesign } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { theme } from '@/theme/paper';


const CustomStackHeader = () => {
    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <View style={styles.header}>
            <TouchableRipple onPress={() => navigator.goBack()} style={styles.back}>
                <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
            </TouchableRipple>
        </View>
    );
}

export { CustomStackHeader };