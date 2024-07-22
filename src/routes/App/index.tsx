import { useAuth } from '@/hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text } from 'react-native-paper';
import { MainTabs } from './MainTabs';
import { PerfilProfissional } from '@/screens/App/PerfilProfissional';
import { DetalhesServico } from '@/screens/App/DetalhesServico';
import { TAppClienteRoutes } from '@/@types/routes/AppRoutes';
import { CustomStackHeader } from '@/components/shared/CustomStackHeader';

const Stack = createStackNavigator<TAppClienteRoutes>();

const AppClienteRoutes = () => {
    const { handleLogout } = useAuth();

    return (
        <Stack.Navigator initialRouteName='MainTabs'>
            <Stack.Screen name='MainTabs' component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name='PerfilProfissional' component={PerfilProfissional} options={{headerMode: 'screen', headerShown: false}} />
            <Stack.Screen name='DetalhesServico' component={DetalhesServico} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export { AppClienteRoutes };