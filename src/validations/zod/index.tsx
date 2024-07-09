import { z } from 'zod';


const loginSchema = z.object({
    email: z.string({ message: 'Campo Obrigatório' }).min(1, 'Campo Obrigatório').trim().email({message: 'Insira um email válido'}),
    senha: z.string({ message: 'Campo Obrigatório' }).min(6, 'A senha deve ter no mínimo 6 caracteres').trim()
});

export { loginSchema };