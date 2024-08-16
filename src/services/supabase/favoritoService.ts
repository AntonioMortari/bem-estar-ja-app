import { IFavorito, IFavoritoFull, Tabelas } from "@/@types/databaseTypes"
import { supabase } from "."

const joins = `
    *,
    servico:servico_id(*, procedimento: procedimento_id(*), endereco:endereco_id(*), profissional:profissional_id(*)),
    profissional:profissional_id(*, area_atuacao:area_atuacao_id(*))

`


const checkServicoIsFavorito = async (usuarioId: string, servicoId: number): Promise<boolean> => {
    const { data, error } = await supabase
        .from(Tabelas.favoritos)
        .select('id')
        .eq('usuario_id', usuarioId)
        .eq('servico_id', servicoId)
        .single();
    if (error) {
        console.log('ERRO AO VERIFICAR SE UM SERVIÇO É FAVORITO: ', error);
        return false;
    }

    if (data != null) {
        return true;
    }

    return false;

}

const checkProfissionalIsFavorito = async (usuarioId: string, profissionalId: number): Promise<boolean> => {
    const { data, error } = await supabase
        .from(Tabelas.favoritos)
        .select('id')
        .eq('usuario_id', usuarioId)
        .eq('profissional_id', profissionalId)
        .single();

    if (error) {
        console.log('ERRO AO VERIFICAR SE UM PROFISSIONAL É FAVORITO: ', error);
        return false;
    }

    if (data != null) {
        return true;
    }

    return false;
}

const removerServicoFavorito = async (usuarioId: string, servicoId: number) => {
    const { error } = await supabase
        .from(Tabelas.favoritos)
        .delete()
        .eq('usuario_id', usuarioId)
        .eq('servico_id', servicoId);

    if (error) {
        console.log('ERRO AO REMOVER SERVIÇO FAVORITO: ', error);
    }
}

const adicionarServicoFavorito = async (usuarioId: string, servicoId: number): Promise<IFavorito | null> => {
    const { data, error } = await supabase
        .from(Tabelas.favoritos)
        .insert<IFavorito>({
            usuario_id: usuarioId,
            servico_id: servicoId,
            tipo_favorito_id: 1
        })
        .single();


    if (error) {
        console.log('ERRO AO FAVORITAR SERVIÇO: ', error);
        return null;
    }

    return data;
}

const removerProfissionalFavorito = async (usuarioId: string, profissionalId: number) => {
    const { error } = await supabase
        .from(Tabelas.favoritos)
        .delete()
        .eq('usuario_id', usuarioId)
        .eq('profissional_id', profissionalId);

    if (error) {
        console.log('ERRO AO REMOVER PROFISSIONAL FAVORITO: ', error);
    }
}

const adicionarProfissionalFavorito = async (usuarioId: string, profissionalId: number): Promise<IFavorito | null> => {
    const { data, error } = await supabase
        .from(Tabelas.favoritos)
        .insert<IFavorito>({
            usuario_id: usuarioId,
            profissional_id: profissionalId,
            tipo_favorito_id: 2
        })
        .single();

    if (error) {
        console.log('ERRO AO FAVORITAR PROFISSIONAL: ', error);
        return null;
    }

    return data;

}

const getServicosFavoritos = async (usuarioId: string): Promise<IFavorito[] | null> => {
    const { data, error } = await supabase
        .from(Tabelas.favoritos)
        .select(joins)
        .eq('usuario_id', usuarioId)
        .eq('tipo_favorito_id', 1)
        .returns<IFavorito[]>();

    if (error) {
        console.log('ERRO AO BUSCAR SERVIÇOS FAVORITOS: ', error);
        return [];
    }

    return data || [];
}

const getProfissionaisFavoritos = async (usuarioId: string) => {
    const { data, error } = await supabase
        .from(Tabelas.favoritos)
        .select(joins)
        .eq('usuario_id', usuarioId)
        .eq('tipo_favorito_id', 2)
        .returns<IFavoritoFull[]>();

    if (error) {
        console.log('ERRO AO BUSCAR PROFISSIONAIS FAVORITOS: ', error);
        return [];
    }

    const result = data.filter(favorito => favorito.profissional);

    return result || [];
}


export const favoritoService = {
    checkServicoIsFavorito,
    checkProfissionalIsFavorito,

    adicionarProfissionalFavorito,
    removerProfissionalFavorito,

    adicionarServicoFavorito,
    removerServicoFavorito,

    getServicosFavoritos,
    getProfissionaisFavoritos
}