import { IEndereco, Tabelas } from '@/@types/databaseTypes';
import { supabase } from '.';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import axios from 'axios';

interface IOpenStreetMapResponse {
    // resposta ao buscar endereço por coordenadas
    address: {
        city: string; //cidade
        'ISO3166-2-lvl4': string; //estado
    }
}

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

const getEnderecoByUsuarioId = async (usuarioId: string): Promise<IEndereco[] | null> => {
    const { data, error } = await supabase
        .from(Tabelas.enderecos)
        .select('*')
        .eq('usuario_id', usuarioId)
        .returns<IEndereco[]>()

    if (error) {
        console.log('ERRO AO BUSCAR ENDEREÇO POR ID DE USUÁRIO: ', error)
        return null;
    }

    return data;
}

const getPermissaoLocalizacao = async (): Promise<boolean> => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
        return granted;
    }

    return false;
}

const getCidadeEstadoByCoordenadas = async (): Promise<{ cidade: string, estado: string } | null> => {
    const permissao = await getPermissaoLocalizacao();

    if (permissao) {
        const posicaoAtual = await getCurrentPositionAsync(); //pega as coordenadas do usuário

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${posicaoAtual.coords.latitude}&lon=${posicaoAtual.coords.longitude}`;

        try {
            const { data: { address } } = await axios.get<IOpenStreetMapResponse>(url);

            return {
                cidade: address.city,
                estado: address['ISO3166-2-lvl4'].split('-')[1]
            }
        } catch (err) {
            console.log('ERRO AO BUSCAR CIDADE E ENDEREÇO POR COORDENADAS: ', err);
            return null
        }

    }

    return null;
}

const deleteById = async (id: string) => {
    const { error } = await supabase
        .from(Tabelas.enderecos)
        .delete()
        .eq('id', id);

    if(error){
        console.log('ERRO AO EXCLUIR ENDEREÇO POR ID: ', error);
    }
}


export const enderecoService = {
    create,
    getEnderecoByUsuarioId,
    getCidadeEstadoByCoordenadas,
    deleteById
};