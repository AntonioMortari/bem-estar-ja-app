import { CadastroContext } from '@/contexts/Cadastro';
import { useContext } from 'react';


const useCadastro = () => {
    const context = useContext(CadastroContext);

    if (!context) {
        throw new Error('ERRO AO CRIAR CONTEXTO DE CADASTRO');
    }

    return context;
}

export { useCadastro };