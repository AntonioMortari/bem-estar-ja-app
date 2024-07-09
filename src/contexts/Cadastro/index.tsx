import { createContext, ReactNode, useCallback, useState } from 'react';

interface IDadosPessoais {
    cpf: string;
    nome: string;
    genero: 'M' | 'F' | 'O';
    dataNascimento: Date;
}

interface IDadosEndereco {
    cep: string;
    logradouro: string;
    estado: string;
    cidade: string;
    complemento?: string;
    numero: number | string;
}

interface IDadosAcesso {
    email: string;
    senha: string;
}

interface ICadastroContextValues {
    dadosPessoais: IDadosPessoais | null;
    dadosEndereco: IDadosEndereco | null;
    dadosAcesso: IDadosAcesso | null;

    handleDadosPessoais: (data: IDadosPessoais) => void;
    handleDadosEndereco: (data: IDadosEndereco) => void;
    handleDadosAcesso: (data: IDadosAcesso) => void;
}

interface ICadastroContextProviderProps {
    children: ReactNode
}

const CadastroContext = createContext({} as ICadastroContextValues);

const CadastroContextProvider = ({ children }: ICadastroContextProviderProps) => {
    const [dadosPessoais, setDadosPessoais] = useState<IDadosPessoais | null>(null);
    const [dadosEndereco, setDadosEndereco] = useState<IDadosEndereco | null>(null);
    const [dadosAcesso, setDadosAcesso] = useState<IDadosAcesso | null>(null);

    const handleDadosAcesso = useCallback((data: IDadosAcesso) => {
        setDadosAcesso(data);
    }, []);

    const handleDadosEndereco = useCallback((data: IDadosEndereco) => {
        setDadosEndereco(data);
    }, []);

    const handleDadosPessoais = useCallback((data: IDadosPessoais) => {
        setDadosPessoais(data);
    }, []);

    return (
        <CadastroContext.Provider value={{
            dadosAcesso,
            dadosEndereco,
            dadosPessoais,
            handleDadosAcesso,
            handleDadosEndereco,
            handleDadosPessoais
        }}>
            {children}
        </CadastroContext.Provider>
    );
}

export { CadastroContext, CadastroContextProvider };