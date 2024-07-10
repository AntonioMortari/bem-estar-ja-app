import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper"


const Home = () => {
    const navigation = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <>
            <Text variant='titleLarge'>Home</Text>
            <Button mode='outlined' onPress={() => navigation.navigate('DetalhesServico')}>Ir para detalhes serviço</Button>
        </>
    );
}

export { Home };