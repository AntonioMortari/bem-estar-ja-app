

export enum Tabelas {
    agenda = 'agenda',
    agendamento = 'agendamento',
    area_atuacao = 'area_atuacao',
    avaliacoes = 'avaliacoes',
    clientes = 'clientes',
    enderecos = 'enderecos',
    procedimentos = 'procedimentos',
    profissionais = 'profissionais',
    servicos = 'servicos',
    favoritos = 'favoritos'
}

export enum StatusAgendamentos {
    Concluido = 1,
    Cancelado = 2,
    Agendado = 3,
    AguardandoPagamento = 4
}

export interface ICliente {
    id: string;
    cpf: string;
    nome: string;
    data_nascimento: Date;
    foto_perfil?: string;
    genero: 'F' | 'M' | 'O'
}
export interface IClienteFull extends ICliente {
    enderecos: IEndereco[]
}

export interface IEndereco {
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

export interface IProfissional {
    id: number;
    created_at: Date;
    nome: string;
    area_atuacao_id: string;
    agenda_id: string;
    sobre: string;
    foto_perfil: string;
    usuario_id: string;
    outras_informacoes: any;
}

export interface IProfissionalFull extends IProfissional {
    area_atuacao: IAreaAtuacao;
    endereco: IEndereco;
}

export interface IAreaAtuacao {
    id: number;
    nome: 'Estética' | 'Massoterapia' | 'Estética e Massoterapia'
}

export interface IProcedimento {
    id: number;
    area_atuacao_id: number;
    nome: string;
    preco: number;
    duracao: number;
    descricao: string;
}

export interface IProcedimentoFull extends IProcedimento {
    area_atuacao: IAreaAtuacao;
}

export interface IServicos {
    id: number;
    created_at: Date;
    procedimento_id: number;
    profissional_id: number;
    endereco_id: string;
    avaliacao: number;
    foto: string;
}
export interface IServicoFull extends IServicos {
    profissional: IProfissionalFull;
    procedimento: IProcedimentoFull;
    endereco: IEndereco;
}

export interface IAvaliacao {
    id: string;
    cliente_id: string;
    avaliacao: string;
    nota: number;
    servico_id: string;
    created_at: Date;
}

export interface IAvaliacaoFull {
    id: string;
    cliente: ICliente;
    avaliacao: string;
    nota: number;
    servico_id: string;
    created_at: Date;
}

export interface IFavorito {
    id?: string;
    usuario_id: string;
    tipo_favorito_id: 1 | 2;
    servico_id?: number;
    profissional_id?: number;

}
export interface IFavoritoFull extends IFavorito {
    servico?: IServicoFull;
    profissional?: IProfissionalFull

}

export interface IFotosProfissionais {
    id: number;
    usuario_id: string;
    foto: string;
}

export interface IAgenda {
    id: string;
    profissional_id: number;
    dia_semana: number;
    hora_inicio: string;
    hora_fim: string;
}

export interface IAgendamento {
    id: number;
    created_at: Date;
    profissional_id: number;
    cliente_id: string;
    data_hora_inicio: Date;
    data_hora_fim: Date;
    status: number
    servico_id: number
}

export interface IAgendamentoFull extends IAgendamento {
    profissional: IProfissionalFull;
    servico: IServicoFull;
}