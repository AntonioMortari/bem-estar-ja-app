import { AuthContext } from '@/contexts/Auth';
import { useContext } from 'react';


const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('ERRO AO CRIAR CONTEXTO DE AUTENTICAÇÂO');
    }

    return context;
}

export { useAuth };