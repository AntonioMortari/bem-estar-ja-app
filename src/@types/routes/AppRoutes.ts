import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TAppClienteRoutes = {
    MainTabs: undefined;
    PerfilProfissional: { idProfissional: number };
    DetalhesServico: { idServico: number };
}

export type TAppClienteMainTabsRoutes = {
    Home: undefined;
    Agendamentos: undefined;
    Busca: { searchValueParam: string };
    Perfil: undefined;
    Favoritos: undefined;
}

export type TAppClienteNavigationRoutes = BottomTabNavigationProp<TAppClienteRoutes & TAppClienteMainTabsRoutes>