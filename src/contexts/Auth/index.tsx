import { createContext, ReactNode, useCallback, useState } from 'react';
import { ICliente, IProfissional } from '../../@types/databaseTypes';

interface IAuthContextProvider {
    children: ReactNode
}

interface IUserData {
    id: string;
    accessToken: string;
}

interface IAuthContextValues {
    isAuth: boolean;
    handleLogin: (email: string, senha: string) => void;
    handleLogout: () => void;
    userData: IUserData | null;
    clienteData: ICliente | null;
    profissionalData: IProfissional | null
}

const AuthContext = createContext({} as IAuthContextValues);

const AuthContextProvider = ({ children }: IAuthContextProvider) => {
    const [isAuth, setIsAuth] = useState<boolean>(false); // booleano que indica se o usuário está ou não autenticado
    const [userData, setUserData] = useState<IUserData | null>(null); // id e access token do usuário

    const [clienteData, setClienteData] = useState<ICliente | null>(null); // dados específicos caso o usuário seja cliente
    const [profissionalData, setProfissionalData] = useState<IProfissional | null>(null); // dados específicos caso o usuário seja profissional

    const handleLogin = useCallback((email: string, senha: string) => {
        setIsAuth(true);
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuth(false);
        setUserData(null);
        setClienteData(null);
        setProfissionalData(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            clienteData,
            handleLogin,
            handleLogout,
            profissionalData,
            userData
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider }