import { Image, View } from 'react-native';
import { useEffect } from 'react';

import { ActivityIndicator } from 'react-native-paper';

import { styles } from './styles';
import { theme } from '@/theme/paper';


const Preload = () => {

    useEffect(() => {
        // verificar se o usuário está autenticado

        // atualizar os estados de autenticação e buscar os dados do usuário
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image
                    source={require('@/images/logo.png')}
                    style={styles.image}
                />
            </View>

            <ActivityIndicator
                size={24}
                color={theme.colors.primary}
            />
        </View>
    )
}

export { Preload };