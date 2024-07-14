import { IServicoFull, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';
import { enderecoService } from './enderecoService';

const joins = `procedimento:procedimento_id(*, area_atuacao:area_atuacao_id(nome)),
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

const getMelhorAvaliados = async (cidade: string, estado: string): Promise<IServicoFull[] | string> => {
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
        .limit(6)
        .returns<IServicoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇOS MELHOR AVALIADOS');
        return error.message;
    }

    if (!data[0].endereco) return []

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
        return error.message;
    }

    if (!data[0].endereco) return []

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

export const servicoService = {
    getAll,
    getMelhorAvaliados,
    getNovidades,
    getById
};