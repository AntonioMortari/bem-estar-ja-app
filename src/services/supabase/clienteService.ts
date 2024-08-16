import { ICliente, IClienteFull, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';
import { enderecoService } from './enderecoService';
import { notify } from 'react-native-notificated';


const getById = async (id: string): Promise<IClienteFull | null> => {
    const { data, error } = await supabase
        .from(Tabelas.clientes)
        .select('*')
        .eq('id', id)
        .single<IClienteFull>();

    const enderecos = await enderecoService.getEnderecoByUsuarioId(id);

    if (!enderecos) {
        return null;
    }

    if (error) {
        console.log('ERRO AO BUSCAR DADOS DE CLIENTE POR ID: ', error)
        return null;
    }

    return { ...data, enderecos };
}

const getByCPF = async (cpf: string): Promise<ICliente | string | null> => {
    const { data, error } = await supabase
        .from(Tabelas.clientes)
        .select('*')
        .eq('cpf', cpf)
        .single<ICliente>()

    if (error) {
        console.log('ERRO AO BUSCAR DADOS DO CLIENTE POR CPF: ', error);
        error.message;
    }

    return data;
}

const create = async (clienteData: ICliente) => {
    const { data, error } = await supabase
        .from(Tabelas.clientes)
        .insert<ICliente>(clienteData)
        .select()

    if (error) {
        console.log('ERRO AO CRIAR CLIENTE: ', error);
        return error.message;
    }

    return data[0];

}

const update = async (id: string, clienteData: Partial<ICliente>) => {
    const { error, data } = await supabase
        .from(Tabelas.clientes)
        .update(clienteData)
        .eq('id', id)

    if (error) {
        console.log('ERRO AO ATUALIZAR OS DADOS DO CLIENTE: ', error);
        return error.message;
    }

}

export const clienteService = {
    getById,
    create,
    getByCPF,
    update
}