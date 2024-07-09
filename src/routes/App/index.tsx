import { useAuth } from '@/hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text } from 'react-native-paper';

const Tabs = createBottomTabNavigator();

const AppClienteRoutes = () => {
    const { handleLogout } = useAuth();

    return (
        <Tabs.Navigator>
            <Tabs.Screen name='Home' component={() => (
                <>
                    <Text variant='titleLarge'>Tela Home</Text>
                    <Button mode='outlined' onPress={handleLogout}>Sair</Button>
                </>
            )} />
        </Tabs.Navigator>
    )
}

export { AppClienteRoutes };