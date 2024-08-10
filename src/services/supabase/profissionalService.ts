import { IProfissionalFull, Tabelas } from "@/@types/databaseTypes";
import { supabase } from ".";

const joins = `area_atuacao:area_atuacao_id(*), endereco:endereco_id(*)`;


const getAll = async (): Promise<IProfissionalFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.profissionais)
        .select(`
                *,
                area_atuacao:area_atuacao_id(nome)
            `)
        .returns<IProfissionalFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR PROFISSIONAIS: ', error);
        return [];
    }

    return data || [];
}

const getById = async (idProfissional: number): Promise<IProfissionalFull | null> => {
    const { data, error } = await supabase
        .from(Tabelas.profissionais)
        .select(`
                *,
                ${joins}
            `)
        .eq('id', idProfissional)
        .single<IProfissionalFull>();

    if (error) {
        console.log('ERRO AO BUSCAR PROFISSIONAL POR ID', error);
        return null;
    }


    return data;
}

const getByCidadeEstado = async (cidade: string, estado: string) => {
    const { data, error } = await supabase
        .from(Tabelas.profissionais)
        .select(`
            *,
            ${joins}
            `)
        .eq('endereco.cidade', cidade)
        .eq('endereco.estado', estado)
        .returns<IProfissionalFull[]>();

    if(error){
        console.log('ERRO AO BUSCAR PROFISSIONAIS POR CIDADE E ESTADO: ', error);
        return [];
    }

    const result = data.filter(profissioal => profissioal.endereco != undefined);

    return result || [];
}

const procurarProfissionais = async (value: string): Promise<IProfissionalFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.profissionais)
        .select(`*, ${joins}`)
        .ilike('nome', `${value}%`)
        .returns<IProfissionalFull[]>();

    if (error) {
        console.log('ERRO AO PESQUISAR PROFISSIONAIS: ', error)
        return [];
    }

    const result = data.filter(profissional => profissional.id != undefined);

    return result || [];
}

export const profissionalService = {
    getAll,
    getById,
    procurarProfissionais,
    getByCidadeEstado
}