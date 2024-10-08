import { createContext, ReactNode, useCallback, useState } from 'react';

import { userService } from '@/services/supabase/userService';
import { clienteService } from '@/services/supabase/clienteService';
import { IAuthContextProvider, IAuthContextValues, IUserData } from '@/@types/contexts/AuthContext';
import { ICliente, IClienteFull, IProfissional } from '@/@types/databaseTypes';
import { IDadosAcesso, IDadosEndereco, IDadosPessoais } from '@/@types/contexts/CadastroContext';
import { enderecoService } from '@/services/supabase/enderecoService';

import { notify } from 'react-native-notificated';

const AuthContext = createContext({} as IAuthContextValues);

const AuthContextProvider = ({ children }: IAuthContextProvider) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserData | null>(null);

    const [clienteData, setClienteData] = useState<IClienteFull | null>(null);
    const [profissionalData, setProfissionalData] = useState<IProfissional | null>(null);

    const handleLogin = useCallback(async (email: string, senha: string) => {
        const result = await userService.login(email, senha);

        if (typeof result === 'string') {
            if (result === 'Invalid login credentials') {
                notify('error', {
                    params: {
                        title: 'Erro',
                        description: 'Email ou senha incorretos'
                    }
                })
            }
            return;
        }

        // buscar os dados do cliente
        const clienteData = await clienteService.getById(result.user.id);

        if (clienteData != null) {

            // atualizar os estados de autenticação
            setIsAuth(true);
            setUserData({
                id: result.user.id,
                accessToken: result.session.access_token,
                email: result.user.email
            });
            setClienteData(clienteData);
        } else {
            // erro caso não seja possível buscar os dados do cliente
            await handleLogout();
            notify('error', {
                params: {
                    title: 'Erro',
                    description: 'Tente novamente mais tarde'
                }
            });
        }


    }, []);

    const handleLogout = useCallback(async () => {
        const result = await userService.logout();

        if (result) {
            notify('error', {
                params: {
                    title: 'Ocorreu um erro inesperado',
                }
            });
        }
        setIsAuth(false);
        setUserData(null);
        setClienteData(null);
        setProfissionalData(null);
    }, []);

    const getSessao = useCallback(async () => {
        const session = await userService.getSessao();

        if (!session) {
            await handleLogout();
        }

        return session;
    }, []);

    const cadastrar = useCallback(async (dadosPessoais: IDadosPessoais, dadosEndereco: IDadosEndereco, dadosAcesso: IDadosAcesso) => {

        const result = await userService.cadastrar(dadosAcesso.email, dadosAcesso.senha);

        if (typeof result === 'string') {
            if (result === 'User already registered') {
                notify('warning', {
                    params: {
                        title: 'Erro',
                        description: 'Usuário já cadastrado'
                    }
                });
            } else {
                notify('error', {
                    params: {
                        title: 'Ocorreu um erro inesperado',
                        description: 'Tente novamente mais tarde'
                    }
                });
            }
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
                notify('error', {
                    params: {
                        title: 'Ocorreu um erro inesperado',
                        description: 'Tente novamente mais tarde'
                    }
                });
                await handleLogout();
                return;
            }
            // criar endereço
            const enderecoData = await enderecoService.create({ ...dadosEndereco, usuario_id: result.user.id });

            // buscar os endereços do usuário
            const enderecos = await enderecoService.getEnderecoByUsuarioId(result.user.id);

            if (typeof enderecoData === 'string' || !enderecos) {
                notify('error', {
                    params: {
                        title: 'Ocorreu um erro inesperado',
                        description: 'Tente novamente mais tarde'
                    }
                });
                await handleLogout();
                return;
            }

            // atualizar estados de autenticação
            setIsAuth(true);
            setUserData({
                accessToken: result.session.access_token,
                id: result.user.id,
                email: result.user.email

            });
            setClienteData({ ...clienteData, enderecos });
            return;
        } else {
            notify('error', {
                params: {
                    title: 'Erro ao fazer cadastro',
                    description: 'Tente novamente mais tarde'
                }
            });
            await handleLogout();
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