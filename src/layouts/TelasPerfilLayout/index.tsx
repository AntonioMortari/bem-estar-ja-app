import { ReactNode } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, TouchableRipple } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { theme } from '@/theme/paper';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';


interface IPerfilLayoutProps {
    titulo: string;
    descricao?: string;
    children?: ReactNode
}

const TelasPerfilLayout = ({ children, titulo, descricao }: IPerfilLayoutProps) => {
    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <TouchableRipple onPress={() => navigator.goBack()} style={styles.buttonVoltar}>
                    <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
                </TouchableRipple>

                <Text variant='headlineSmall'>{titulo}</Text>

                <Text variant='titleMedium' style={styles.descricao}>{descricao}</Text>
            </View>

            <View style={styles.containerConteudo}>
                {children}
            </View>

        </ScrollView>
    );
}

export { TelasPerfilLayout };