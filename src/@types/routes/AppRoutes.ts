import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TCategoriaNomeVerTodos = 'Profissionais perto de você' | 'Serviços em Destaque' | 'Novidades' | 'Estética' | 'Massoterapia';

export type TAppClienteRoutes = {
    MainTabs: undefined;
    PerfilProfissional: { idProfissional: number };
    DetalhesServico: { idServico: number };
    DetalhesAgendamento: { idAgendamento: number }
    VerTodos: { categoriaNome: TCategoriaNomeVerTodos, cidade: string, estado: string };

    AgendarServico: { idServico: number }

    // rotas do perfil
    InformacoesPessoais: undefined;
    Enderecos: undefined;
    NovoEndereco: undefined;
    PerguntasFrequentes: undefined;
}

export type TAppClienteMainTabsRoutes = {
    Home: undefined;
    Agendamentos: undefined;
    Busca: undefined;
    Perfil: undefined;
    Favoritos: undefined;
}

export type TAppClientePerfilRoutes = {
    // rotas do perfil

}

export type TAppClienteNavigationRoutes = BottomTabNavigationProp<TAppClienteRoutes & TAppClienteMainTabsRoutes & TAppClientePerfilRoutes>