import { View } from 'react-native';
import { styles } from './styles';
import { Divider, Text, TouchableRipple } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ReactNode } from 'react';
import { theme } from '@/theme/paper';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';

interface IPerfilLinkItemProps {
    icon: ReactNode;
    label: string;
    onPress: () => void;
}

const PerfilLinkItem = ({ icon, label, onPress }: IPerfilLinkItemProps) => {
    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <>
            <TouchableRipple onPress={onPress} style={styles.container}>
                <>
                    <View style={{ alignItems: 'center', gap: 10, flexDirection: 'row' }}>
                        {icon}

                        <Text variant='titleMedium'>{label}</Text>
                    </View>

                    <AntDesign name="right" size={20} color={theme.colors.grayDark} />
                </>
            </TouchableRipple>

            <Divider />
        </>
    );
}

export { PerfilLinkItem };