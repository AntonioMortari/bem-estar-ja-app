import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TAppClienteRoutes = {
    Home: undefined;
    Agendamentos: undefined;
    Busca: {searchValueParam: string};
    Perfil: undefined;
    PerfilProfissional: undefined;
    DetalhesServico: undefined;
}

export type TAppClienteNavigationRoutes = BottomTabNavigationProp<TAppClienteRoutes>