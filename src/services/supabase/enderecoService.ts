import { IEndereco, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';


const create = async (enderecoData: Omit<IEndereco, 'id'>): Promise<IEndereco | string> => {
    const { data, error } = await supabase
        .from(Tabelas.enderecos)
        .insert<Omit<IEndereco, 'id'>>(enderecoData)
        .returns<IEndereco>()
        .single();

    if (error) {
        console.log('ERRO AO CRIAR ENDEREÇO', error);
        return error.message;
    }

    return data;

}

const getEnderecoByUsuarioId = async (usuarioId: string): Promise<IEndereco | string> => {
    const { data, error } = await supabase
        .from(Tabelas.enderecos)
        .select('*')
        .eq('usuario_id', usuarioId)
        .single<IEndereco>()

    if(error){
        console.log('ERRO AO BUSCAR ENDEREÇO POR ID DE USUÁRIO: ', error)
        return error.message;
    }

    return data;
}

export const enderecoService = {
    create,
    getEnderecoByUsuarioId
};