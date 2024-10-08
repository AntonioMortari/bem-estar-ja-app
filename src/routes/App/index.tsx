import { createStackNavigator } from '@react-navigation/stack';
import { MainTabs } from './MainTabs';
import { PerfilProfissional } from '@/screens/App/PerfilProfissional';
import { DetalhesServico } from '@/screens/App/DetalhesServico';
import { TAppClienteRoutes } from '@/@types/routes/AppRoutes';
import { VerTodos } from '@/screens/App/VerTodos';
import { AgendarServico } from '@/screens/App/AgendarServico';
import { InformacoesPessoais } from '@/screens/App/PerfilRotas/InformacoesPessoais';
import { PerguntasFrequesntes } from '@/screens/App/PerfilRotas/PerguntasFrequentes';
import { Enderecos } from '@/screens/App/PerfilRotas/Enderecos';
import { NovoEndereco } from '@/screens/App/NovoEndereco';
import { DetalhesAgendamento } from '@/screens/App/DetalhesAgendamento';

const Stack = createStackNavigator<TAppClienteRoutes>();

const AppClienteRoutes = () => {

    return (
        <Stack.Navigator initialRouteName='MainTabs' screenOptions={{ headerShown: false }}>
            {/* rotas do menu */}
            <Stack.Screen name='MainTabs' component={MainTabs} />

            {/* rotas de perfil */}
            <Stack.Screen name='InformacoesPessoais' component={InformacoesPessoais} />
            <Stack.Screen name='PerguntasFrequentes' component={PerguntasFrequesntes} />
            <Stack.Screen name='Enderecos' component={Enderecos} />

            {/* Outras rotas */}
            <Stack.Screen name='PerfilProfissional' component={PerfilProfissional} options={{ headerMode: 'screen', headerShown: false }} />
            <Stack.Screen name='DetalhesServico' component={DetalhesServico} />
            <Stack.Screen name='DetalhesAgendamento' component={DetalhesAgendamento} />
            <Stack.Screen name='VerTodos' component={VerTodos} />
            <Stack.Screen name='NovoEndereco' component={NovoEndereco} />
            <Stack.Screen name='AgendarServico' component={AgendarServico} />

        </Stack.Navigator>
    )
}

export { AppClienteRoutes };