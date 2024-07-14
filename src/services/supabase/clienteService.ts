import { ICliente, IClienteFull, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';
import { enderecoService } from './enderecoService';


const getById = async (id: string): Promise<IClienteFull | null> => {
    const { data, error } = await supabase
        .from(Tabelas.clientes)
        .select('*')
        .eq('id', id)
        .single<IClienteFull>();

    const enderecos = await enderecoService.getEnderecoByUsuarioId(id);

    if(!enderecos){
        return null;
    }

    if (error) {
        console.log('ERRO AO BUSCAR DADOS DE CLIENTE POR ID: ', error)
        return null;
    }

    return {...data, enderecos};
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

const create = async (clienteData: ICliente): Promise<ICliente | string> => {
    const { data, error } = await supabase
        .from(Tabelas.clientes)
        .insert<ICliente>(clienteData)
        .returns<ICliente>()
        .single();

    if (error) {
        console.log('ERRO AO CRIAR CLIENTE: ', error);
        return error.message;
    }

    return data;

}

export const clienteService = {
    getById,
    create,
    getByCPF
}