import { createStackNavigator } from '@react-navigation/stack';
import { MainTabs } from './MainTabs';
import { PerfilProfissional } from '@/screens/App/PerfilProfissional';
import { DetalhesServico } from '@/screens/App/DetalhesServico';
import { TAppClienteRoutes } from '@/@types/routes/AppRoutes';
import { VerTodos } from '@/screens/App/VerTodos';
import { PerfilRotas } from './RotasPerfil';

const Stack = createStackNavigator<TAppClienteRoutes>();

const AppClienteRoutes = () => {

    return (
        <Stack.Navigator initialRouteName='MainTabs'>
            {/* rotas do menu */}
            <Stack.Screen name='MainTabs' component={MainTabs} options={{ headerShown: false }} />

            {/* rotas de perfil */}
            <Stack.Screen name='PerfilRotas' component={PerfilRotas} />

            <Stack.Screen name='PerfilProfissional' component={PerfilProfissional} options={{ headerMode: 'screen', headerShown: false }} />
            <Stack.Screen name='DetalhesServico' component={DetalhesServico} options={{ headerShown: false }} />
            <Stack.Screen name='VerTodos' component={VerTodos} options={{ headerShown: false }} />
            <Stack.Screen name='NovoEndereco' component={() => <></>} />

        </Stack.Navigator>
    )
}

export { AppClienteRoutes };