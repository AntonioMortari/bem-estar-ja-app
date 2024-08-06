import { z } from 'zod';


const loginSchema = z.object({
    email: z.string({ message: 'Campo Obrigatório' }).min(1, 'Campo Obrigatório').trim().email({ message: 'Insira um email válido' }),
    senha: z.string({ message: 'Campo Obrigatório' }).trim()
});

const cadastro1Schema = z.object({
    nome: z.string({ message: 'Campo Obrigatório' }).trim().min(1, 'Campo Obrigatório'),
    cpf: z.string({ message: 'Campo Obrigatório' }).min(11, { message: 'CPF inválido' })
});

const cadastro2Schema = z.object({
    cep: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    logradouro: z.string({ message: 'Campo obrigatório' }).min(1, { message: 'Campo obrigatório' }),
    cidade: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    estado: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    numero: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    complemento: z.string().trim().optional(),
    bairro: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
});

const novoEnderecoSchema = z.object({
    cep: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    logradouro: z.string({ message: 'Campo obrigatório' }).min(1, { message: 'Campo obrigatório' }),
    cidade: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    estado: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    numero: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
    complemento: z.string().trim().optional(),
    bairro: z.string({ message: 'Campo obrigatório' }).trim().min(1, { message: 'Campo obrigatório' }),
});

const cadastro3Schema = z.object({
    email: z.string({ message: 'Campo obrigatório' }).trim().email({ message: 'Digite um email válido' }),
    senha: z.string({ message: 'Campo obrigatório' }).trim().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});

const informacoesPessoaisSchema = z.object({
    nome: z.string({ message: 'Campo Obrigatório' }).trim().min(1, 'Campo Obrigatório'),
    // senha: z.string({ message: 'Campo obrigatório' }).trim().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    // email: z.string({ message: 'Campo Obrigatório' }).min(1, 'Campo Obrigatório').trim().email({ message: 'Insira um email válido' }),

});

export { loginSchema, cadastro1Schema, cadastro2Schema, cadastro3Schema, informacoesPessoaisSchema, novoEnderecoSchema };