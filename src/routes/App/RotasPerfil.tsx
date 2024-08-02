import { TAppClientePerfilRoutes } from '@/@types/routes/AppRoutes';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<TAppClientePerfilRoutes>();

const PerfilRotas = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='InformacoesPessoais' component={() => <></>} />
            <Stack.Screen name='DadosAcesso' component={() => <></>} />
            <Stack.Screen name='Enderecos' component={() => <></>} />
            <Stack.Screen name='PerguntasFrequentes' component={() => <></>} />
        </Stack.Navigator>
    )
}

export { PerfilRotas };