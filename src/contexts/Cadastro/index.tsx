import { createContext, ReactNode, useCallback, useState } from 'react';

import { ICadastroContextProviderProps, ICadastroContextValues, IDadosAcesso, IDadosEndereco, IDadosPessoais } from '@/@types/contexts/CadastroContext';

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