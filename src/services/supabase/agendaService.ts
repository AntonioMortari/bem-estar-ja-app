import { IAgenda, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';


const getByProfissionalId = async (profissionalId: number): Promise<IAgenda[]> => {
    const { data, error } = await supabase
        .from(Tabelas.agenda)
        .select('*')
        .eq('profissional_id', profissionalId)
        .order('dia_semana', { ascending: true })
        .returns<IAgenda[]>();

    if (error) {
        console.log('ERRO AO BUSCAR POR AGENDA POR ID DE PROFISSIONAL: ', error);
        return [];
    }

    return data || [];
}

const getByDiaSemana = async (profissionalId: number, diaSemana: number) => {
    const { data, error } = await supabase
        .from(Tabelas.agenda)
        .select('*')
        .eq('profissional_id', profissionalId)
        .eq('dia_semana', diaSemana)
        .single<IAgenda>();

    if(error){
        console.log('ERRO AO BUSCAR AGENDA POR DIA DA SEMANA: ', error);
        return null;
    }

    return data;


}

export const agendaService = {
    getByProfissionalId,
    getByDiaSemana
}