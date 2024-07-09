import { createContext, ReactNode, useCallback, useState } from 'react';

import { userService } from '@/services/supabase/userService';
import { clienteService } from '@/services/supabase/clienteService';
import { IAuthContextProvider, IAuthContextValues, IUserData } from '@/@types/contexts/AuthContext';
import { ICliente, IProfissional } from '@/@types/databaseTypes';

const AuthContext = createContext({} as IAuthContextValues);

const AuthContextProvider = ({ children }: IAuthContextProvider) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserData | null>(null);

    const [clienteData, setClienteData] = useState<ICliente | null>(null);
    const [profissionalData, setProfissionalData] = useState<IProfissional | null>(null);

    const handleLogin = useCallback(async (email: string, senha: string) => {
        const result = await userService.login(email, senha);

        if (typeof result === 'string') {
            // tratar erro
            return;
        }

        // buscar os dados do cliente
        const clienteData = await clienteService.getById(result.user.id);

        if (clienteData) {

            // atualizar os estados de autenticação
            setIsAuth(true);
            setUserData({
                id: result.user.id,
                accessToken: result.session.access_token
            });
            setClienteData(clienteData);
        } else {
            // tratar erro ao buscar os dados do cliente
        }


    }, []);

    const handleLogout = useCallback(async() => {
        const result = await userService.logout();

        if(result){
            // tratar erro ao fazer logout
        }
        setIsAuth(false);
        setUserData(null);
        setClienteData(null);
        setProfissionalData(null);
    }, []);

    const getSessao = useCallback(async () => {
        const session = await userService.getSessao();

        return session;
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            clienteData,
            handleLogin,
            handleLogout,
            getSessao,
            profissionalData,
            userData,
            setClienteData,
            setIsAuth,
            setUserData
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider }