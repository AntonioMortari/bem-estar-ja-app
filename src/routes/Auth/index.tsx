import { createStackNavigator } from '@react-navigation/stack';
import { TAuthClienteRoutes } from '@/@types/routes/AuthRoutes';

// telas
import { Preload } from '@/screens/Auth/Preload';
import { OnboardingScreen } from '@/screens/Auth/Onboarding';

const Stack = createStackNavigator<TAuthClienteRoutes>();

const AuthClienteRoutes = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* Tela que verifica se o usuário está autenticado e atualiza os estados do contexto de autenticão */}
            <Stack.Screen name='Preload' component={Preload} />

            {/* Tela para apresentação de funcionalidades do aplicativo */}
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />

            {/* Tela para o usuário fazer login */}
            <Stack.Screen name='Login' component={() => <></>} />

            {/* Tela para o usuário preencher informações pessoais */}
            <Stack.Screen name='Cadastro1' component={() => <></>} />

            {/* Tela para o usuário preencher endereço*/}
            <Stack.Screen name='Cadastro2' component={() => <></>} />

            {/* Tela para o usuário preencher dados de acesso*/}
            <Stack.Screen name='Cadastro3' component={() => <></>} />
        </Stack.Navigator>
    )
}

export { AuthClienteRoutes };