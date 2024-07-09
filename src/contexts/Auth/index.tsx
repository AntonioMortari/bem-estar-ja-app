import { createContext, ReactNode, useCallback, useState } from 'react';

import { userService } from '@/services/supabase/userService';
import { clienteService } from '@/services/supabase/clienteService';
import { IAuthContextProvider, IAuthContextValues, IUserData } from '@/@types/contexts/AuthContext';
import { ICliente, IProfissional } from '@/@types/databaseTypes';
import { IDadosAcesso, IDadosEndereco, IDadosPessoais } from '@/@types/contexts/CadastroContext';
import { enderecoService } from '@/services/supabase/enderecoService';

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

    const handleLogout = useCallback(async () => {
        const result = await userService.logout();

        if (result) {
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

    const cadastrar = useCallback(async (dadosPessoais: IDadosPessoais, dadosEndereco: IDadosEndereco, dadosAcesso: IDadosAcesso) => {

        const result = await userService.cadastrar(dadosAcesso.email, dadosAcesso.senha);

        if (typeof result === 'string') {
            // tratar erro no cadastro
            return;
        }

        if (result.user && result.session) {
            // criar cliente
            const clienteData = await clienteService.create({
                cpf: dadosPessoais.cpf,
                data_nascimento: dadosPessoais.dataNascimento,
                id: result.user.id,
                nome: dadosPessoais.nome,
                genero: dadosPessoais.genero,
            });

            if (typeof clienteData === 'string') {
                // tratar erro ao criar cliente;
                return;
            }
            // criar endereço
            const enderecoData = await enderecoService.create({ ...dadosEndereco, usuario_id: result.user.id });

            if (typeof enderecoData === 'string') {
                // tratar erro ao criar endereço
                return;
            }

            // atualizar estados de autenticação
            setIsAuth(true);
            setUserData({
                accessToken: result.session.access_token,
                id: result.user.id

            });
            setClienteData(clienteData);
            return;
        }else{
            // tratar erro ao fazer cadastro
        }

    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            clienteData,
            handleLogin,
            handleLogout,
            getSessao,
            cadastrar,
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