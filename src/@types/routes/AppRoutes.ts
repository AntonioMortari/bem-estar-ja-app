import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TCategoriaNomeVerTodos = 'Profissionais perto de você' | 'Serviços em Destaque' | 'Novidades' | 'Estética' | 'Massoterapia';

export type TAppClienteRoutes = {
    MainTabs: undefined;
    PerfilProfissional: { idProfissional: number };
    DetalhesServico: { idServico: number };
    VerTodos: { categoriaNome: TCategoriaNomeVerTodos, cidade: string, estado: string};
}

export type TAppClienteMainTabsRoutes = {
    Home: undefined;
    Agendamentos: undefined;
    Busca: undefined;
    Perfil: undefined;
    Favoritos: undefined;
}

export type TAppClienteNavigationRoutes = BottomTabNavigationProp<TAppClienteRoutes & TAppClienteMainTabsRoutes>