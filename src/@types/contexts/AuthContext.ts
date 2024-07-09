import { Session } from '@supabase/supabase-js';
import { ReactNode } from 'react';
import { ICliente, IProfissional } from '../databaseTypes';
import { IDadosAcesso, IDadosEndereco, IDadosPessoais } from './CadastroContext';

export interface IAuthContextProvider {
    children: ReactNode;
}

export interface IUserData {
    id: string;
    accessToken: string;
}

export interface IAuthContextValues {
    isAuth: boolean; // booleano que indica se o usuário está ou não autenticado
    handleLogin: (email: string, senha: string) => void;
    handleLogout: () => void;
    getSessao: () => Promise<Session | null>; // // Verifica se o usuário tem sessão ativa e salva no asyncStorage, se não tiver, retorna null
    cadastrar: (dadosPessoais: IDadosPessoais, dadosEndereco: IDadosEndereco, dadosAcesso: IDadosAcesso) => void; // faz o cadastro e atualiza os estados de autenticação

    userData: IUserData | null; // id e access token do usuário
    clienteData: ICliente | null; // dados específicos caso o usuário seja cliente
    profissionalData: IProfissional | null // dados específicos caso o usuário seja profissional

    setIsAuth: (data: boolean) => void; //atualiza o estado IsAuth
    setUserData: (data: IUserData) => void; // atualiza o estado userData
    setClienteData: (data: ICliente) => void; //atualiza o estado clienteData
}