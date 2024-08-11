import { Image, Pressable, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { servicoService } from '@/services/supabase/servicoService';
import { IAgenda, IServicoFull } from '@/@types/databaseTypes';
import { notify } from 'react-native-notificated';
import { ActivityIndicator, Button, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { theme } from '@/theme/paper';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { IconWithLabel } from '@/components/shared/IconLabel';

// icons
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Stars from '@/components/shared/Stars';

import { Calendar, CalendarProvider, ExpandableCalendar, LocaleConfig, WeekCalendar } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip'
import { utils } from '@/utils';
import { agendaService } from '@/services/supabase/agendaService';
import { addMinutes, format } from 'date-fns';
import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { HorarioItem } from '@/components/shared/HorarioItem';
import { agendamentoService } from '@/services/supabase/agendamentoService';
import { useAuth } from '@/hooks/useAuth';

LocaleConfig.locales['pt-br'] = utils.ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface IHorario {
    horaInicio: string;
    disponivel?: boolean;
}

const AgendarServico = ({ route }: any) => {
    const [servicoData, setServicoData] = useState<IServicoFull | null>(null);
    const [agendaProfissionalData, setAgendaProfissionalData] = useState<IAgenda | null>(null);
    const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
    const [horarioSelecionado, setHorarioSelecionado] = useState<string>('');
    const [horarios, setHorarios] = useState<IHorario[]>([]);

    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [isLoadingHorario, setIsLoadingHorario] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    const { clienteData } = useAuth();

    // Função para gerar horários disponíveis
    const gerarHorarios = async (horaInicio: string, horaFim: string, intervaloMinutos: number) => {
        let horarios = [];
        let horaAtual = new Date(`1970-01-01T${horaInicio}:00`);
        const fim = new Date(`1970-01-01T${horaFim}:00`);

        while (horaAtual < fim) {
            horarios.push(horaAtual.toTimeString().substr(0, 5)); // Formatando para HH:MM
            horaAtual.setMinutes(horaAtual.getMinutes() + intervaloMinutos);
        }

        // Use Promise.all para lidar com as promessas
        const horariosResult = await Promise.all(
            horarios.map(async (horario) => {
                const dataHoraInicio = new Date(`${format(dataSelecionada, 'yyyy-MM-dd')}T${horario}:00.432Z`);
                const dataHoraFim = addMinutes(dataHoraInicio, servicoData?.procedimento.duracao || 30);

                if (servicoData) {
                    const checarHorarioResult = await agendamentoService.checarHorario({
                        dataHoraInicio,
                        dataHoraFim,
                        profissionalId: servicoData.profissional_id,
                        servicoId: servicoData.id
                    });

                    if (checarHorarioResult.length > 0) {
                        return { horaInicio: horario, disponivel: false };
                    }

                    return { horaInicio: horario, disponivel: true }

                }
                return { horaInicio: horario, disponivel: false };
            })
        );

        return horariosResult;
    }


    useEffect(() => {

        const getServicoData = async () => {
            setIsLoading(true);
            const { idServico } = route.params;

            const result = await servicoService.getById(idServico);

            setServicoData(result);

            if (!result) {
                notify('error', {
                    params: {
                        title: 'Algo deu errado',
                        description: 'Tente novamente mais tarde'
                    }
                })

                navigator.goBack();
                return
            }

            setIsLoading(false);

        }

        getServicoData();

    }, [route.params]);

    useEffect(() => {
        const getAgendaProfissionalData = async () => {
            setIsLoadingHorario(true);
            if (servicoData) {
                const result = await agendaService.getByDiaSemana(servicoData.profissional_id, dataSelecionada.getDay());

                if (result) {
                    setAgendaProfissionalData(result);
                    const horariosResult = await gerarHorarios(result.hora_inicio, result.hora_fim, 60)
                    setHorarios(horariosResult);
                }

                setIsLoadingHorario(false);
            }
        }

        getAgendaProfissionalData();
    }, [servicoData, dataSelecionada]);

    const gotToDetalhesServico = () => {
        if (servicoData) {
            navigator.navigate('DetalhesServico', { idServico: servicoData.id })
        }
    };

    const handleDate = (e: DateTimePickerEvent, newDate: Date | undefined) => {
        if (e.type == 'set' && newDate) {
            setDataSelecionada(newDate);
        }
        setShowPicker(false);

    };

    const agendar = async () => {
        const dataHoraInicio = new Date(`${format(dataSelecionada, 'yyyy-MM-dd')}T${horarioSelecionado}:00.432Z`);
        const dataHoraFim = addMinutes(dataHoraInicio, servicoData?.procedimento.duracao || 30);

        if (clienteData && servicoData) {
            const result = await agendamentoService.create(
                clienteData.id,
                servicoData.profissional_id,
                servicoData.id,

                dataHoraInicio,
                dataHoraFim
            );

            if (!result) {
                notify('error', {
                    params: {
                        title: 'Erro ao criar agendamento',
                        description: 'Tente novamente mais tarde'
                    }
                });
                return;
            }

            notify('success', {
                params: {
                    title: 'Agendamento criado com sucesso!'
                }
            });

            navigator.navigate('Agendamentos');
        }

    }

    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    <ActivityIndicator animating color={theme.colors.primary} />
                </View>
            ) : (
                <ScrollView style={styles.container}>


                    <View style={styles.header}>
                        <TouchableRipple onPress={() => navigator.goBack()} style={styles.buttonVoltar}>
                            <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
                        </TouchableRipple>

                        <Text variant='headlineSmall'>Agendar Serviço</Text>
                    </View>

                    <View style={styles.containerServicoData}>

                        <View style={styles.containerServicoNomeFoto}>
                            <View style={{ borderRadius: 16 }}>
                                <Image
                                    source={{ uri: servicoData?.foto }}
                                    style={styles.imagem}
                                />
                            </View>

                            <Text variant='titleLarge'>{servicoData?.procedimento.nome}</Text>
                        </View>

                        <View style={styles.containerIcons}>

                            <IconWithLabel
                                // duração
                                label={`${servicoData?.procedimento?.duracao} minutos`}
                                icon={<AntDesign name="clockcircleo" size={20} color={theme.colors.primary} />}
                            />

                            <IconWithLabel
                                // localização
                                label={`${servicoData?.endereco?.cidade}, ${servicoData?.endereco?.estado}`}
                                icon={<FontAwesome6 name="location-dot" size={20} color={theme.colors.primary} />}
                            />

                            <IconWithLabel
                                // nome do profissional
                                label={servicoData?.profissional?.nome || ''}
                                icon={<AntDesign name="user" size={24} color={theme.colors.primary} />}
                            />

                            {servicoData && (
                                <Stars
                                    stars={servicoData?.avaliacao}
                                    showNumber
                                />
                            )}
                        </View>

                    </View>

                    <Button style={styles.buttonDetalhes} onPress={gotToDetalhesServico} mode='outlined'>Detalhes</Button>

                    <View>
                        <Pressable onPress={() => setShowPicker(true)}>
                            {/* pressable para datepicker */}

                            <TextInput
                                mode='flat'
                                style={{ backgroundColor: 'transparent' }}
                                label='Dia do Agendamento'
                                value={format(dataSelecionada, 'dd/MM/yyyy')}
                                editable={false}
                            />

                            {showPicker && (
                                <DatePicker
                                    mode='date'
                                    value={dataSelecionada}
                                    onChange={handleDate}
                                    minimumDate={new Date()}

                                />
                            )}
                        </Pressable>

                        {isLoadingHorario ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                                <ActivityIndicator animating color={theme.colors.primary} />
                            </View>
                        ) : (

                            <>
                                {horarios.length === 0 ? (
                                    <Text style={{marginTop: 25}} variant='titleMedium'>Nenhum horário disponível para este dia</Text>
                                ) : (
                                    <View style={styles.containerHorarios}>
                                        {horarios.map((horario, index) => {
                                            return (
                                                <HorarioItem
                                                    horario={horario.horaInicio}
                                                    onPress={() => setHorarioSelecionado(horario.horaInicio)}
                                                    isSelected={horario.horaInicio === horarioSelecionado}
                                                    disabled={horario.disponivel ? false : true}
                                                    key={index}

                                                />
                                            )
                                        })}
                                    </View>
                                )}
                            </>
                        )}

                    </View>

                    <View style={styles.containerButtons}>
                        <Button style={{ width: '40%' }} onPress={() => navigator.goBack()} mode='outlined'>Cancelar</Button>
                        <Button style={{ width: '40%', opacity: !horarioSelecionado ? .8 : 1 }} mode='contained' disabled={horarioSelecionado ? false : true} onPress={agendar}>Agendar</Button>
                    </View>

                </ScrollView >
            )}
        </>

    );
}

export { AgendarServico };