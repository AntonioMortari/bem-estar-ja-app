import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';

import { styles } from './styles';
import { Onboarding } from '@/components/Onboarding';
import { TAuthClienteNavigationRoutes } from '@/@types/routes/AuthRoutes';
import { notify } from 'react-native-notificated';

const OnboardingScreen = () => {
    const navigation = useNavigation<TAuthClienteNavigationRoutes>();

    const goCadastro = () => {
        // navega para a tela de cadastro
        navigation.navigate('Cadastro1');
    }

    const goLogin = () => {
        // navega para a tela de login
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>

            <Onboarding />


            <View style={styles.containerButtons}>
                <Button mode='contained' onPress={goCadastro} style={{ transform: [{ scale: 1.3 }], width: 150 }} >
                    Começar
                </Button>

                <Button mode='text' onPress={goLogin}>
                    <Text variant='bodyMedium'>Já tem uma conta?</Text>  Faça Login!
                </Button>
            </View>
        </View>
    );
}

export { OnboardingScreen };