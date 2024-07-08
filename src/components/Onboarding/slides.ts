
export interface ISlidesData {
    id: string;
    title: string;
    description: string;
    image: any;
}

export const slidesData: ISlidesData[] = [
    {
        id: '1',
        title: 'Boas-Vindas 👋',
        description: 'Seja bem-vindo ao Bem-Estar Já! Descubra uma nova maneira de encontrar os melhores profissionais de estética e massoterapia perto de você.',
        image: require('@/images/onboarding/1.png')
    },
    {
        id: '2',
        title: 'Encontre Profissionais na Sua Região 🔍',
        description: 'Explore uma variedade de profissionais de estética e massoterapia em sua região. Encontre o parceiro perfeito para atender às suas necessidades de cuidados pessoais e bem-estar.',
        image: require('@/images/onboarding/2.png')
    },
    {
        id: '3',
        title: 'Faça Agendamentos de Forma Fácil 📅',
        description: 'Agende suas sessões de estética e massoterapia de forma rápida e conveniente. Reserve seu horário preferido com apenas alguns toques na tela.',
        image: require('@/images/onboarding/3.png')
    },
    {
        id: '4',
        title: 'Ofereça Seus Serviços',
        description: 'Se você é um profissional de estética ou massoterapia, aproveite para oferecer seus serviços aos nossos usuários. Expanda sua base de clientes e cresça sua prática profissional conosco.',
        image: require('@/images/onboarding/4.png')
    }
]