import { createContext, ReactNode, useCallback, useState } from 'react';

import { ICliente, IProfissional } from '@/@types/databaseTypes';
import { userService } from '@/services/supabase/userService';

import { Session } from '@supabase/supabase-js';

interface IAuthContextProvider {
    children: ReactNode
}

interface IUserData {
    id: string;
    accessToken: string;
}

interface IAuthContextValues {
    isAuth: boolean; // booleano que indica se o usuário está ou não autenticado
    handleLogin: (email: string, senha: string) => void;
    handleLogout: () => void;
    getSessao: () => Promise<Session | null>; // // Verifica se o usuário tem sessão ativa e salva no asyncStorage, se não tiver, retorna null
    userData: IUserData | null; // id e access token do usuário
    clienteData: ICliente | null; // dados específicos caso o usuário seja cliente
    profissionalData: IProfissional | null // dados específicos caso o usuário seja profissional

    setIsAuth: (data: boolean) => void; //atualiza o estado IsAuth
    setUserData: (data: IUserData) => void; // atualiza o estado userData
    setClienteData: (data: ICliente) => void; //atualiza o estado clienteData
}

const AuthContext = createContext({} as IAuthContextValues);

const AuthContextProvider = ({ children }: IAuthContextProvider) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserData | null>(null);

    const [clienteData, setClienteData] = useState<ICliente | null>(null);
    const [profissionalData, setProfissionalData] = useState<IProfissional | null>(null);

    const handleLogin = useCallback((email: string, senha: string) => {
        setIsAuth(true);
    }, []);

    const handleLogout = useCallback(() => {
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