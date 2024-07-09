import { ReactNode } from 'react';

export interface IDadosPessoais {
    cpf: string;
    nome: string;
    genero: 'M' | 'F' | 'O';
    dataNascimento: Date;
}

export interface IDadosEndereco {
    cep: string;
    logradouro: string;
    estado: string;
    cidade: string;
    complemento?: string;
    numero: string;
    bairro: string;
}

export interface IDadosAcesso {
    email: string;
    senha: string;
}

export interface ICadastroContextValues {
    dadosPessoais: IDadosPessoais | null;
    dadosEndereco: IDadosEndereco | null;
    dadosAcesso: IDadosAcesso | null;

    handleDadosPessoais: (data: IDadosPessoais) => void;
    handleDadosEndereco: (data: IDadosEndereco) => void;
    handleDadosAcesso: (data: IDadosAcesso) => void;
}

export interface ICadastroContextProviderProps {
    children: ReactNode
}