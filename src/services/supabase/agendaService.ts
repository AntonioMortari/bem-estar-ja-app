import { IAgenda, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';


const getByProfissionalId = async (profissionalId: number): Promise<IAgenda[]> => {
    const { data, error } = await supabase
        .from(Tabelas.agenda)
        .select('*')
        .eq('profissional_id', profissionalId)
        .order('dia_semana', { ascending: true})
        .returns<IAgenda[]>();

    if (error) {
        console.log('ERRO AO BUSCAR POR AGENDA POR ID DE PROFISSIONAL: ', error);
        return [];
    }

    return data || [];
}


export const agendaService = {
    getByProfissionalId
}