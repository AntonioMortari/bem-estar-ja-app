import { useAuth } from '@/hooks/useAuth';
import { AuthClienteRoutes } from './Auth';
import { AppClienteRoutes } from './App';
import { NavigationContainer } from '@react-navigation/native';


const Router = () => {
    const { isAuth } = useAuth();

    return(
        // se o usuário estiver autenticado, carrega as rotas do aplicativo, se não, carrega as rotas pra autenticação (login e cadastro)
        <NavigationContainer>
            {isAuth ? <AppClienteRoutes /> : <AuthClienteRoutes />}
        </NavigationContainer>
    )

}

export { Router };