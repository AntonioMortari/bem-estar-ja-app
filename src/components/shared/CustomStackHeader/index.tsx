
import { View } from 'react-native';
import { styles } from './styles';

import { AntDesign } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { theme } from '@/theme/paper';

interface ICustomHeaderProps {
    isFavorito: boolean;
    onPress: () => void;
}

const CustomStackHeader = ({ isFavorito, onPress }: ICustomHeaderProps) => {
    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <View style={styles.header}>
            <TouchableRipple onPress={() => navigator.goBack()} style={styles.button}>
                <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
            </TouchableRipple>

            <TouchableRipple onPress={onPress} style={styles.button}>
                {isFavorito ? (
                    <AntDesign name="heart" size={30} color={theme.colors.heart} />

                ) : (
                    <AntDesign name="hearto" size={30} color={theme.colors.heart} />

                )}
            </TouchableRipple>
        </View>
    );
}

export { CustomStackHeader };