import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { styles } from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "@/theme/paper";
import { useEffect, useState } from "react";
import { IAgendamentoFull } from "@/@types/databaseTypes";
import { agendamentoService } from "@/services/supabase/agendamentoService";
import { useAuth } from "@/hooks/useAuth";
import { notify } from "react-native-notificated";


const DetalhesAgendamento = ({ route }: any) => {
    const { clienteData } = useAuth();

    const navigator = useNavigation<TAppClienteNavigationRoutes>();
    const [agendamentoData, setAgendamentoData] = useState<IAgendamentoFull>();

    useEffect(() => {

        const getAgendamentoData = async () => {
            const { idAgendamento } = route.params;

            if (!idAgendamento) {
                notify('error', {
                    params: {
                        title: 'Agendamento não encontrado',
                        description: 'Tente novamente mais tarde!'
                    }
                });
                navigator.goBack();
                return;
            }
            if (clienteData) {
                const result = await agendamentoService.getById(idAgendamento, clienteData.id);

                if (!result) {
                    notify('error', {
                        params: {
                            title: 'Agendamento não encontrado',
                            description: 'Tente novamente mais tarde!'
                        }
                    });
                    navigator.goBack();
                    return;
                }

                setAgendamentoData(result);
            }
        }

        getAgendamentoData();

    }, [route.params]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableRipple onPress={() => navigator.goBack()} style={styles.buttonVoltar}>
                    <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
                </TouchableRipple>

                <Text variant='headlineSmall'>Detalhes Agendamento</Text>
            </View>
        </ScrollView>
    )
}

export { DetalhesAgendamento };