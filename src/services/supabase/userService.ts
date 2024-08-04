import { supabase } from '.';



const getSessao = async () => {
    // Verifica se o usuário tem sessão ativa, se não tiver, retorna null
    const { data: { session } } = await supabase.auth.getSession();

    return session;
}

const login = async (email: string, senha: string) => {
    // função pra fazer login e, caso dê erro, retorna uma string com a mensagem
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });

    if (error) {
        console.log('ERRO AO FAZER LOGIN: ', error);
        return error.message;
    }

    return data;
}

const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log('ERRO AO FAZER LOGOUT: ', error);
        return error.message
    }
}

const cadastrar = async (email: string, senha: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password: senha
    });

    

    if(error){
        console.log('ERRO AO FAZER CADASTRO: ', error);
        return error.message;
    }

    return data;
}

export const userService = {
    getSessao,
    login,
    logout,
    cadastrar
}
