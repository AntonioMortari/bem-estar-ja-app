import { Image, View } from 'react-native';
import { useEffect } from 'react';

import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '@/theme/paper';
import { useAuth } from '@/hooks/useAuth';
import { clienteService } from '@/services/supabase/clienteService';
import { TAuthClienteNavigationRoutes } from '@/@types/routes/AuthRoutes';


const Preload = () => {
    const { getSessao, setIsAuth, setUserData, setClienteData } = useAuth();

    const navigator = useNavigation<TAuthClienteNavigationRoutes>();

    useEffect(() => {
        const verificarAutenticacao = async () => {
            const session = await getSessao();

            if (session) {

                // buscar dados do cliente
                const clienteData = await clienteService.getById(session.user.id);

                if (clienteData) {

                    setIsAuth(true);
                    setUserData({
                        id: session.user.id,
                        accessToken: session.access_token,
                        email: session.user.email
                    });
                    setClienteData(clienteData);
                    return;

                }
                // caso o usuário não tenha sessão, redirecionar para a tela de Login caso não seja a primeira vez que o usuário entra no aplicativo
            }
            navigator.reset({
                index: 0,
                routes: [{ name: 'Onboarding' }]
            });
        }

        verificarAutenticacao();

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