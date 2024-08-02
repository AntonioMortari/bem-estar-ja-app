import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TCategoriaNomeVerTodos = 'Profissionais perto de você' | 'Serviços em Destaque' | 'Novidades' | 'Estética' | 'Massoterapia';

export type TAppClienteRoutes = {
    MainTabs: undefined;
    PerfilRotas: undefined;
    PerfilProfissional: { idProfissional: number };
    DetalhesServico: { idServico: number };
    VerTodos: { categoriaNome: TCategoriaNomeVerTodos, cidade: string, estado: string };
    NovoEndereco: undefined;
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
    InformacoesPessoais: undefined;
    DadosAcesso: undefined;
    Enderecos: undefined;
    NovoEndereco: undefined;
    PerguntasFrequentes: undefined;
}

export type TAppClienteNavigationRoutes = BottomTabNavigationProp<TAppClienteRoutes & TAppClienteMainTabsRoutes>