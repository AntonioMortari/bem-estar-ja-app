import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { styles } from './styles';
import { theme } from '@/theme/paper';

import { AntDesign } from '@expo/vector-icons';

import { Home } from '@/screens/App/Home';
import { Agendamentos } from '@/screens/App/Agendamentos';
import { Busca } from '@/screens/App/Busca';
import { Favoritos } from '@/screens/App/Favoritos';
import { Perfil } from '@/screens/App/Perfil';
import { TAppClienteMainTabsRoutes } from '@/@types/routes/AppRoutes';

const Tabs = createBottomTabNavigator<TAppClienteMainTabsRoutes>();

const MainTabs = () => {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.gray,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle
            }}
        >
            <Tabs.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <AntDesign name='home' size={size} color={color} />
                        }

                        return <AntDesign name='home' size={size} color={color} />
                    }
                }}
            />

            <Tabs.Screen
                name='Agendamentos'
                component={Agendamentos}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <AntDesign name='calendar' size={size} color={color} />
                        }

                        return <AntDesign name='calendar' size={size} color={color} />
                    }
                }}
            />

            <Tabs.Screen
                name='Busca'
                component={Busca}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <AntDesign name='search1' size={size} color={color} />
                        }

                        return <AntDesign name='search1' size={size} color={color} />
                    }
                }}
            />

            <Tabs.Screen
                name='Favoritos'
                component={Favoritos}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <AntDesign name='heart' size={size} color={color} />
                        }

                        return <AntDesign name='hearto' size={size} color={color} />
                    }
                }}
            />

            <Tabs.Screen
                name='Perfil'
                component={Perfil}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <AntDesign name='user' size={size} color={color} />
                        }

                        return <AntDesign name='user' size={size} color={color} />
                    }
                }}
            />
        </Tabs.Navigator>
    );
}

export { MainTabs };