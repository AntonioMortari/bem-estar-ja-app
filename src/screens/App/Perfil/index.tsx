import { useAuth } from "@/hooks/useAuth";
import { Button, Text } from "react-native-paper"


const Perfil = () => {
    const { handleLogout } = useAuth();

    return (
        <>
        <Text variant='titleLarge'>Perfil</Text>
        <Button mode="contained" onPress={handleLogout}>Sair</Button>
        </>
    );
}

export { Perfil };