import { ScrollView, View } from 'react-native';
import { ActivityIndicator, SegmentedButtons, Text } from 'react-native-paper';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { agendamentoService } from '@/services/supabase/agendamentoService';
import { useAuth } from '@/hooks/useAuth';
import { IAgendamentoFull } from '@/@types/databaseTypes';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '@/theme/paper';
import { ServicoAgendamento } from '@/components/shared/ServicoAgendamento';
import { RefreshControl } from 'react-native';



const Agendamentos = () => {
    const { clienteData } = useAuth();

    const [agendamentos, setAgendamentos] = useState<IAgendamentoFull[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const getAgendamentos = async () => {
        setIsLoading(false);
        if (clienteData) {
            const result = await agendamentoService.getByClienteId(clienteData.id);

            setAgendamentos(result);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        getAgendamentos();
    }, [])

    return (
        <>
            {isLoading ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator animating color={theme.colors.primary} />
                </View>
            ) : (
                <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={getAgendamentos}
                        />
                    }>
                    <View style={styles.header}>
                        <Text variant='headlineMedium' style={styles.titulo}>Meus Agendamentos</Text>
                    </View>

                    <View style={styles.containerAgendamentos}>
                        {agendamentos.map(agendamento => {
                            return (
                                <ServicoAgendamento
                                    data={agendamento}
                                    key={agendamento.id}
                                />
                            );
                        })}
                    </View>

                </ScrollView>
            )}
        </>
    );
}

export { Agendamentos };