import { IAvaliacaoFull, Tabelas } from "@/@types/databaseTypes"
import { supabase } from "."


const getByServicoId = async (servicoId: number): Promise<IAvaliacaoFull[]> => {
    const { data, error } = await supabase
        .from(Tabelas.avaliacoes)
        .select(`
                *,
                cliente:cliente_id(*)
            `)
        .eq('servico_id', servicoId)
        .returns<IAvaliacaoFull[]>();

    if(error){
        console.log('ERRO AO BUSCAR AVALIAÇÔES POR SERVICO ID');
        return [];
    }

    return data || [];
}

export const avaliacaoService = {
    getByServicoId
}