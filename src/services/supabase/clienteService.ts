import { ICliente, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';


const getById = async (id: string): Promise<ICliente | null> => {
    const { data, error } = await supabase
        .from(Tabelas.clientes)
        .select('*')
        .eq('id', id)
        .returns<ICliente>();


    if (error) {
        console.log('ERRO AO BUSCAR DADOS DE CLIENTE POR ID: ', error)
        return null;
    }

    return data;
}

export const clienteService = {
    getById
}