import { IServicoFull, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';
import { enderecoService } from './enderecoService';


const getAll = async (): Promise<IServicoFull[] | string> => {
    const { data, error } = await supabase
        .from(Tabelas.servicos)
        .select(`
                *,
                procedimento:procedimento_id(*, area_atuacao:area_atuacao_id(*)),
                profissional:profissional_id(*)
            `)
        .returns<IServicoFull[]>()

    if (error) {
        console.log('ERRO AO BUSCAR POR SERVIÇOS: ', error);
        return error.message;
    }

    return data || [];
}

export const servicoService = {
    getAll
};