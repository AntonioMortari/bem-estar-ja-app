import { Tabelas } from "@/@types/databaseTypes"
import { supabase } from "."
import { format } from "date-fns";


// const getHorariosByIntervalo = async (data: Date, horaInicio: number, horaFim: number, profissionalId: number) => {
//     const { } = await supabase
//         .from(Tabelas.agendamento)
//         .select('*')
//         .eq('data', format())
//         .gte('', dataInicio)
//         .lte('event_date', endDate);
// }

// export const agendamentoService = {
//     getHorariosByIntervalo
// }