

export enum Tabelas{
    agenda = 'agenda',
    agendamento = 'agendamento',
    area_atuacao = 'area_atuacao',
    avaliacoes= 'avaliacoes',
    clientes = 'clientes',
    enderecos = 'enderecos',
    procedimentos = 'procedimentos',
    profissionais = 'profissionais',
    servicos = 'servicos'
}

export interface ICliente{
    id: string;
    cpf: string;
    nome: string;
    data_nascimento: Date;
    foto_perfil?: string;
    genero: 'F' | 'M' | 'O' 
}

export interface IEndereco{
    id: string;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    complemento?: string;
    usuario_id: string;
}

export interface IProfissional{
    id: number;
    created_at: Date;
    nome: string;
    area_atuacao_id: string;
    agenda_id: string;
    sobre: string;
    foto_perfil: string;
    outras_informacoes: any;
}

export interface IServicos{
    id: number;
    created_at: Date;
    procedimento_id: number;
    profissional_id: number;
    avaliacao: number;
}