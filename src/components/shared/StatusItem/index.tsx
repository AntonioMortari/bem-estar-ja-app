import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./styles";
import { theme } from "@/theme/paper";

interface IStatusItemProps {
    status: number;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    return (
        <View style={[styles.container,
        status === 1 && { borderColor: theme.colors.success },
        status === 2 && { borderColor: theme.colors.danger },
        status === 3 && { borderColor: theme.colors.primary },
        status === 4 && { borderColor: theme.colors.primaryLight }
        ]}>
            {status === 1 && (
                <Text style={{ color: theme.colors.success }} variant='titleSmall'>Concluído</Text>
            )}
            {status === 2 && (
                <Text style={{ color: theme.colors.danger }} variant='titleSmall'>Cancelado</Text>
            )}
            {status === 3 && (
                <Text style={{ color: theme.colors.primary }} variant='titleSmall'>Agendado</Text>
            )}
            {status === 4 && (
                <Text style={{ color: theme.colors.primaryLight }} variant='titleSmall'>Pagamento pendente</Text>
            )}


        </View>
    )
}

export { StatusItem };