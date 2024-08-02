import { IServicoFull, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';
import { TCategoriaNomeVerTodos } from '@/@types/routes/AppRoutes';

const joins = `procedimento:procedimento_id(*, area_atuacao:area_atuacao_id(id, nome)),
                profissional:profissional_id(*, area_atuacao:area_atuacao_id(nome)),
                endereco:endereco_id(*)`; // join com a tabela de procedimento, profissional, endereço e area de atuação para filtros

const getAll = async (): Promise<IServicoFull[] | string> => {
    // busca todos os serviços do banco de dados
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`
                *,
                ${joins}
            `)
        .returns<IServicoFull[]>()

    if (error) {
        console.log('ERRO AO BUSCAR POR SERVIÇOS: ', error);
        return error.message;
    }

    return data || [];
}

const getMelhorAvaliados = async (cidade: string, estado: string): Promise<IServicoFull[]> => {
    // busca os serviços de uma região com avaliações maiores ou iguais a 4.5
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`
                *,
                ${joins}
            `)
        .gte('avaliacao', 4.5)
        .eq('endereco.cidade', cidade)
        .eq('endereco.estado', estado)
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇOS MELHOR AVALIADOS');
        return [];
    }

    if (!data[0].endereco) return [];

    return data || [];
}

const getNovidades = async (cidade: string, estado: string) => {
    // busca os serviços que foram criados no último mês em uma determinada região
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`
                *,
                ${joins}
            `)
        .eq('endereco.cidade', cidade)
        .eq('endereco.estado', estado)
        .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 1)))
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR POR NOVIDADES', error)
        return [];
    }

    if (!data[0].endereco) return [];

    return data || [];
}

const getById = async (id: number): Promise<IServicoFull | null> => {
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`
                *,
                ${joins}
            `)
        .eq('id', id)
        .single<IServicoFull>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇO POR ID: ', error);
        return null;
    }

    return data;
}

const getServicosSemelheantes = async (areaAtuacaoId: number, cidade: string, estado: string): Promise<IServicoFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`*,
                ${joins}
            `)
        .eq('procedimento.area_atuacao_id', areaAtuacaoId)
        .eq('endereco.cidade', cidade)
        .eq('endereco.estado', estado)
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇOS SEMELHANTES: ', error);
        return [];
    }

    const result = data.filter(servico => servico.procedimento != undefined && servico.profissional != undefined);


    return result || [];
}

const getByProfissionalId = async (profissionalId: number): Promise<IServicoFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`
            *,
            ${joins}
            `)
        .eq('profissional_id', profissionalId)
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇOS POR ID DO PROFISSIONAL: ', error);
        return [];
    }

    const result = data.filter(servico => servico.profissional != undefined);

    return result || [];
}

const getServicosEstetica = async (cidade: string, estado: string): Promise<IServicoFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`*,
                ${joins}
            `)
        .eq('procedimento.area_atuacao_id', 1)
        .eq('endereco.cidade', cidade)
        .eq('endereco.estado', estado)
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇOS DE ESTÈTICA: ', error);
        return [];
    }

    const result = data.filter(servico => servico.endereco != undefined && servico.profissional != undefined && servico.procedimento != undefined);

    return result || [];
}

const getServicosMassoterapia = async (cidade: string, estado: string): Promise<IServicoFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`*,
                ${joins}
            `)
        .eq('procedimento.area_atuacao_id', 2)
        .eq('endereco.cidade', cidade)
        .eq('endereco.estado', estado)
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇOS DE MASSOTERAPIA: ', error);
        return [];
    }

    const result = data.filter(servico => servico.endereco != undefined && servico.profissional != undefined && servico.procedimento != undefined);

    return result || [];
}

const procurarServicos = async (value: string, cidade: string, estado: string): Promise<IServicoFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`*, ${joins}`)
        .ilike('procedimento.nome', `${value}%`)
        .eq('endereco.cidade', cidade)
        .eq('endereco.estado', estado)
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO PESQUISAR POR SERVIÇOS', error);
        return [];
    }

    const result = data.filter(servico => servico.procedimento != undefined && servico.profissional != undefined && servico.endereco != undefined);

    return result || [];
}

const getByCategoriaNome = async(categoriaNome: TCategoriaNomeVerTodos, cidade: string, estado: string) => {
    let data: IServicoFull[] = [];

    switch (categoriaNome) {
        case 'Estética':
            data = await getServicosEstetica(cidade, estado);
            break;

        case 'Massoterapia':
            data = await getServicosMassoterapia(cidade, estado);
            break;

        case 'Novidades':
            data = await getNovidades(cidade, estado);
            break;  

        case 'Serviços em Destaque':
            data = await getMelhorAvaliados(cidade, estado);
            console.log(data);
            break;
    
        default:
            break;
    }

    const result = data.filter(servico => 
        servico.endereco != undefined && 
        servico.procedimento != undefined && 
        servico.profissional != undefined
    )

    return result || [];
}

export const servicoService = {
    getAll,
    getMelhorAvaliados,
    getNovidades,
    getById,
    getServicosSemelheantes,
    getByProfissionalId,
    getServicosEstetica,
    getServicosMassoterapia,
    procurarServicos,
    getByCategoriaNome
};