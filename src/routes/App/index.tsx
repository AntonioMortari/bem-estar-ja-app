import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native-paper';

const Tabs = createBottomTabNavigator();

const AppClienteRoutes = () => {

    return(
        <Tabs.Navigator>
            <Tabs.Screen name='Home' component={() => <Text variant='titleLarge'>Tela Home</Text>} />
        </Tabs.Navigator>
    )
}

export { AppClienteRoutes };