import axios from 'axios';
import { notify } from 'react-native-notificated';

interface IViaCepResponse {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

const formatCPF = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = numericValue.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2}).*/,
        '$1.$2.$3-$4'
    );
    return formattedValue;
};

const getEnderecoByCEP = async (cep: string): Promise<IViaCepResponse | string> => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await axios.get(url);

        if(response.data.erro){
            return 'CEP inválido';
        }

        return response.data;
    } catch (err) {
        console.log(err);
        return 'CEP inváido';
    }
}

function getSaudacao(): string {
    const horaAtual = new Date().getHours();

    if (horaAtual >= 0 && horaAtual < 12) {
        return 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
}


export const utils = {
    formatCPF,
    getEnderecoByCEP,
    getSaudacao
}