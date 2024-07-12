import { IProfissionalFull, Tabelas } from "@/@types/databaseTypes"
import { supabase } from "."


const getAll = async (): Promise<IProfissionalFull[] | string> => {
    const {data, error } = await supabase
        .from(Tabelas.profissionais)
        .select(`
                *,
                area_atuacao:area_atuacao_id(nome)
            `)
        .returns<IProfissionalFull[]>();

    if(error){
        console.log('ERRO AO BUSCAR PROFISSIONAIS: ', error);
        return error.message;
    }

    return data || [];
}

export const profissionalService = {
    getAll
}