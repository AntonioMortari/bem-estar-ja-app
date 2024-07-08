import { supabase } from '.';



const getSessao = async () => {
    // Verifica se o usuário tem sessão ativa, se não tiver, retorna null
    const { data: { session } } = await supabase.auth.getSession();

    return session;
}

export const userService = {
    getSessao
}
