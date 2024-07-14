

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
export interface IClienteFull extends ICliente{
    enderecos:IEndereco[]
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
    usuario_id: string;
    outras_informacoes: any;
}

export interface IProfissionalFull extends IProfissional{
    area_atuacao: IAreaAtuacao;
    agenda: IAgenda;
    endereco: IEndereco;
}

export interface IAreaAtuacao{
    id: number;
    nome: 'Estética' | 'Massoterapia' | 'Estética e Massoterapia'
}

export interface IAgenda{
    id: string;
    dia_semana: number;
    hora_inicio: number;
    hora_fim: number;
}


export interface IProcedimento{
    id: number;
    area_atuacao_id:number;
    nome: string;
    preco: number;
    duracao: number;
    descricao: string;
}

export interface IProcedimentoFull extends IProcedimento{
    area_atuacao: IAreaAtuacao;
}

export interface IServicos{
    id: number;
    created_at: Date;
    procedimento_id: number;
    profissional_id: number;
    endereco_id: string;
    avaliacao: number;
    foto: string;
}
export interface IServicoFull extends IServicos{
    profissional:IProfissionalFull;
    procedimento: IProcedimentoFull;
    endereco: IEndereco;
}