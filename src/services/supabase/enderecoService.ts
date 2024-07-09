import { IEndereco, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';


const create = async (enderecoData: Omit<IEndereco, 'id'>): Promise<IEndereco | string> => {
    const { data, error } = await supabase
        .from(Tabelas.enderecos)
        .insert<Omit<IEndereco, 'id'>>(enderecoData)
        .returns<IEndereco>()
        .single();

    if(error){
        console.log('ERRO AO CRIAR ENDEREÇO', error);
        return error.message;
    }

    return data;

}

export const enderecoService = {
    create
};