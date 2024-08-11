import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { useNavigation } from "@react-navigation/native";
import { Image, Linking, ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Dialog, Portal, Text, TouchableRipple } from "react-native-paper";
import { styles } from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "@/theme/paper";
import { useEffect, useState } from "react";
import { IAgendamentoFull, StatusAgendamentos } from "@/@types/databaseTypes";
import { agendamentoService } from "@/services/supabase/agendamentoService";
import { useAuth } from "@/hooks/useAuth";
import { notify } from "react-native-notificated";
import { IconWithLabel } from "@/components/shared/IconLabel";
import Stars from "@/components/shared/Stars";
import { FontAwesome6 } from '@expo/vector-icons';
import { format } from "date-fns";


const DetalhesAgendamento = ({ route }: any) => {
    const { clienteData } = useAuth();

    const navigator = useNavigation<TAppClienteNavigationRoutes>();
    const [agendamentoData, setAgendamentoData] = useState<IAgendamentoFull>();

    const [dialogIsVisible, setDialogIsVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [buscarAgendamentos, setBuscarAgendamentos] = useState<boolean>(false);

    const cancelarAgendamento = async () => {
        if (agendamentoData) {
            const result = await agendamentoService.cancelarById(agendamentoData?.id);

            if (result) {
                notify('error', {
                    params: {
                        title: 'Erro ao cancelar agendamento',
                        description: 'Tente novamente mais tarde ou entre em contato com o suporte!'
                    }
                });
                return;
            }

            notify('success', {
                params: {
                    title: 'Agendamento cancelado com sucesso!',
                    description: agendamentoData.status === 3 ? 'Você receberá seu reembolso em até 7 dias úteis' : ''
                }
            });

            navigator.goBack();
        }
    }

    useEffect(() => {

        const getAgendamentoData = async () => {
            setIsLoading(true);
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
                setIsLoading(false);
            }
        }

        getAgendamentoData();

    }, [route.params, buscarAgendamentos]);

    const gotToDetalhesServico = () => {
        if (agendamentoData) {
            navigator.navigate('DetalhesServico', { idServico: agendamentoData.servico.id })
        }
    };

    const agendar = async () => {
        if (agendamentoData) {
            const result = await agendamentoService.setStatusById(agendamentoData.id, StatusAgendamentos.Agendado);

            if (result) {
                notify('error', {
                    params: {
                        title: 'Ocorreu um erro inesperado',
                        description: 'Tente novamente mais tarde!'
                    }
                });

                return;
            }

            setBuscarAgendamentos(!buscarAgendamentos);
            await Linking.openURL('https://wa.me/5519992276384');
        }
    }

    return (
        <>
            {isLoading ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator animating color={theme.colors.primary} />
                </View>
            ) : (
                <ScrollView style={styles.container}>
                    <Portal>
                        <Dialog visible={dialogIsVisible} onDismiss={() => setDialogIsVisible(false)}>
                            <Dialog.Title>Confirmação</Dialog.Title>

                            <Dialog.Content>
                                <Text>Tem certeza que cancelar este agendamento?</Text>

                                <Dialog.Actions style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Button style={{ width: '45%' }} mode='outlined' onPress={async () => {
                                        await cancelarAgendamento();
                                        setDialogIsVisible(false);
                                    }}>Confirmar</Button>
                                    <Button style={{ width: '45%' }} mode='contained' onPress={() => setDialogIsVisible(false)}>Cancelar</Button>
                                </Dialog.Actions>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>
                    <View style={styles.header}>
                        <TouchableRipple onPress={() => navigator.goBack()} style={styles.buttonVoltar}>
                            <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
                        </TouchableRipple>

                        <Text variant='headlineSmall'>Detalhes do agendamento</Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.containerServicoNomeFoto}>
                            <View style={{ borderRadius: 16 }}>
                                <Image
                                    source={{ uri: agendamentoData?.servico?.foto }}
                                    style={styles.imagem}
                                />
                            </View>

                            <Text variant='titleLarge'>{agendamentoData?.servico?.procedimento.nome}</Text>
                        </View>

                        <View style={styles.containerIcons}>

                            {agendamentoData && (
                                <IconWithLabel
                                    label={`${format(agendamentoData?.data_hora_inicio || '', 'dd/MM/yyyy')} - ${format(agendamentoData?.data_hora_inicio || '', 'HH:mm')} ás ${format(agendamentoData.data_hora_fim, 'HH:mm')}`}
                                    icon={<AntDesign name="clockcircleo" size={20} color={theme.colors.primary} />}
                                />
                            )}


                            <IconWithLabel
                                // localização
                                label={`${agendamentoData?.servico.endereco?.cidade}, ${agendamentoData?.servico?.endereco?.estado}`}
                                icon={<FontAwesome6 name="location-dot" size={20} color={theme.colors.primary} />}
                            />

                            <IconWithLabel
                                // nome do profissional
                                label={agendamentoData?.profissional?.nome || ''}
                                icon={<AntDesign name="user" size={24} color={theme.colors.primary} />}
                            />

                            {agendamentoData && (
                                <Stars
                                    stars={agendamentoData.servico?.avaliacao}
                                    showNumber
                                />
                            )}

                            <Text variant='titleLarge' style={{ marginTop: 10 }}>Preço: R${agendamentoData?.servico.procedimento.preco}</Text>
                        </View>

                        <Button style={styles.buttonDetalhes} onPress={gotToDetalhesServico} mode='outlined'>Detalhes</Button>
                    </View>

                    <Text variant="titleMedium" style={{ marginTop: 15 }}><Text style={{ fontFamily: theme.fonts.semibold }}>Status:</Text> {agendamentoService.getStatusByNumero(agendamentoData?.status || 0)}</Text>

                    <View style={styles.containerButtons}>
                        {agendamentoData?.status === 1 && (
                            <Button mode="contained" style={{ width: '100%' }}>Avaliar</Button>
                        )}
                        {agendamentoData?.status === 2 && (
                            <Button mode="contained" style={{ width: '100%' }}>Agendar novamente</Button>
                        )}
                        {agendamentoData?.status === 3 && (
                            <>
                                <Button mode="outlined" onPress={() => setDialogIsVisible(true)}>Cancelar</Button>
                                <Button mode="contained" onPress={async () => await Linking.openURL('https://wa.me/5519992276384')}>Entrar em contato</Button>
                            </>
                        )}
                        {agendamentoData?.status === 4 && (
                            <>
                                <Button mode="outlined" onPress={() => setDialogIsVisible(true)}>Cancelar</Button>
                                <Button mode="contained" onPress={agendar}>Enviar Comprovante</Button>
                            </>
                        )}
                    </View>


                </ScrollView >
            )}
        </>

    )
}

export { DetalhesAgendamento };