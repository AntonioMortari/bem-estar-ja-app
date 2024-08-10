import { IAgendamento, IAgendamentoFull, Tabelas } from "@/@types/databaseTypes"
import { supabase } from "."
import { format } from "date-fns";

const joins = `
    *,
    servico:servico_id(*, procedimento:procedimento_id(*)),
    profissional:profissional_id(*)
`;

type TChecarHorarioParams = {
    dataHoraInicio: Date;
    dataHoraFim: Date;

    profissionalId: number;
    servicoId: number;
}

const checarHorario = async ({ dataHoraFim, dataHoraInicio, profissionalId, servicoId }: TChecarHorarioParams) => {

    const { data, error } = await supabase
        .from(Tabelas.agendamento)
        .select('*')
        .gte('data_hora_inicio', dataHoraInicio.toISOString())
        .lte('data_hora_fim', dataHoraFim.toISOString())
        .eq('profissional_id', profissionalId)
        .eq('servico_id', servicoId)
        .returns<IAgendamento[]>();


    if (error) {
        console.log('ERRO AO BUSCAR AGENDAMENTOS: ', error);
        return [];
    }

    return data;
}

const create = async (clienteId: string, profissionalId: number, servicoId: number, dataHoraInicio: Date, dataHoraFim: Date) => {
    const { data, error } = await supabase
        .from(Tabelas.agendamento)
        .insert<Omit<IAgendamento, 'id' | 'created_at'>>({
            cliente_id: clienteId,
            profissional_id: profissionalId,
            servico_id: servicoId,
            data_hora_fim: dataHoraFim,
            data_hora_inicio: dataHoraInicio,
            status: 4
        })
        .select()

    if (error) {
        console.log('ERRO AO CRIAR AGENDAMENTO: ', error);
        return null;
    }

    return data;
}

const getByClienteId = async (clienteId: string) => {
    const { data, error } = await supabase
        .from(Tabelas.agendamento)
        .select(joins)
        .eq('cliente_id', clienteId)
        .order('created_at', { ascending: false })
        .returns<IAgendamentoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR AGENDAMENTOS DO CLIENTE');
        return [];
    }

    return data || [];

}

const getById = async (id: number, clienteId: string) => {
    const { data, error } = await supabase
        .from(Tabelas.agendamento)
        .select(joins)
        .eq('id', id)
        .eq('cliente_id', clienteId)
        .single<IAgendamentoFull>();

    if (error) {
        console.log('ERRO AO BUSCAR AGENDAMENTO POR ID: ', error);
        return null;
    }

    return data;

}

export const agendamentoService = {
    checarHorario,
    create,
    getByClienteId,
    getById
}