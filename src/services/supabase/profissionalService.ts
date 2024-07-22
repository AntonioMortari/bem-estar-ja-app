import { IProfissionalFull, Tabelas } from "@/@types/databaseTypes";
import { supabase } from ".";

const joins = `area_atuacao:area_atuacao_id(*)`;


const getAll = async (): Promise<IProfissionalFull[] | string> => {
    const { data, error } = await supabase
        .from(Tabelas.profissionais)
        .select(`
                *,
                area_atuacao:area_atuacao_id(nome)
            `)
        .returns<IProfissionalFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR PROFISSIONAIS: ', error);
        return error.message;
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

    if(error){
        console.log('ERRO AO BUSCAR PROFISSIONAL POR ID', error);
        return null;
    }


    return data;
}

export const profissionalService = {
    getAll,
    getById
}