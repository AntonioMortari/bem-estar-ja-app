import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';


import { IAgenda, IProfissionalFull, IServicoFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { profissionalService } from '@/services/supabase/profissionalService';
import { CustomStackHeader } from '@/components/shared/CustomStackHeader';
import { favoritoService } from '@/services/supabase/favoritoService';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme/paper';
import { styles } from './styles';

import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Avatar, Button, List, SegmentedButtons, Text, TouchableRipple } from 'react-native-paper';
import { CustomListItem } from '@/components/shared/CustomListItem';
import { servicoService } from '@/services/supabase/servicoService';
import { ServicoCardHorizontal } from '@/components/shared/ServicoCardHorizontal';
import { DialogPerfil } from '@/components/shared/DialogPerfil';
import { Slider } from '@/components/shared/Slider';
import { HorarioFuncionamentoItem } from '@/components/shared/HorarioFuncionamentoItem';
import { agendaService } from '@/services/supabase/agendaService';

const images = [
    { id: 1, usuario_id: '123', foto: 'https://kannoarquitetura.com.br/wp-content/uploads/2023/06/Editadas-24.jpg' },
    { id: 2, usuario_id: '123', foto: 'https://carolcunha.design/wp-content/uploads/2021/06/clinica-de-estetica-danielle-bosco-repepc%CC%A7ao.jpeg' },
    { id: 3, usuario_id: '123', foto: 'https://exhf7dsr2zu.exactdn.com/wp-content/uploads/2021/08/regras-abrir-clinica-1.jpg?strip=all&lossy=1&ssl=1' }
]

const PerfilProfissional = ({ route }: any) => {
    const [profissionalData, setProfissionalData] = useState<IProfissionalFull>();
    const [servicosProfissional, setServicosProfissional] = useState<IServicoFull[]>([]);
    const [horarioFuncionamentoData, setHorarioFuncionamentoData] = useState<IAgenda[]>([]);

    const [isFavorito, setIsFavorito] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalImageIsOpen, setModalImageIsOpen] = useState<boolean>(false);

    const [atualizarIsFavorito, setAtualizarIsFavorito] = useState<boolean>(false);
    const [secaoSelecionada, setSecaoSelecionada] = useState<string>('informacoes');

    const { clienteData, setClienteData } = useAuth();

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    useEffect(() => {
        const { idProfissional } = route.params;
        const getProfissionalData = async () => {
            setIsLoading(true);

            if (!idProfissional) {
                navigator.goBack();
                return;
            }

            const result = await profissionalService.getById(idProfissional);

            if (!result) {
                return navigator.goBack();
            }

            setProfissionalData(result);
            setIsLoading(false);
        }

        const getServicosProfissional = async () => {
            setIsLoading(true);
            const result = await servicoService.getByProfissionalId(idProfissional);

            setServicosProfissional(result);
        }

        getProfissionalData();
        getServicosProfissional();
    }, []);

    useEffect(() => {
        const checkProfissionalIsFavorito = async () => {
            if (clienteData && profissionalData) {
                const result = await favoritoService.checkProfissionalIsFavorito(clienteData.id, profissionalData.id);

                setIsFavorito(result);

            }
        }

        checkProfissionalIsFavorito();
    }, [clienteData, profissionalData, atualizarIsFavorito]);

    useEffect(() => {
        const getHorarioFuncionamento = async () => {
            if (profissionalData?.id) {
                const result = await agendaService.getByProfissionalId(profissionalData.id);

                setHorarioFuncionamentoData(result);
            }
        }

        getHorarioFuncionamento();
    }, [profissionalData])

    const addProfissionalFavorito = async () => {
        if (profissionalData && clienteData) {
            await favoritoService.adicionarProfissionalFavorito(clienteData.id, profissionalData.id);

            setAtualizarIsFavorito(!atualizarIsFavorito);
        }

        if (clienteData) {
            setClienteData({ ...clienteData })
        }
    }

    const removerProfissionalFavorito = async () => {
        if (clienteData && profissionalData) {
            await favoritoService.removerProfissionalFavorito(clienteData.id, profissionalData.id);
            setAtualizarIsFavorito(!atualizarIsFavorito);
        }

        if (clienteData) {
            setClienteData({ ...clienteData })
        }
    }

    return (
        <>
            {isLoading ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator color={theme.colors.primary} animating />
                </View>
            ) : (
                <ScrollView style={styles.container}>

                    <CustomStackHeader
                        isFavorito={isFavorito}
                        onPress={() => {
                            if (isFavorito) {
                                removerProfissionalFavorito();
                            } else {
                                addProfissionalFavorito();
                            }
                        }}
                    />

                    <View style={styles.containerImage}>
                        <Slider
                            data={images}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 15 }}>
                        <View style={styles.header}>

                            <View>
                                <Text variant='titleLarge' style={styles.titulo}>{profissionalData?.nome}</Text>
                                <Text variant='titleMedium' style={styles.subtitulo}>Profisisonal de {profissionalData?.area_atuacao.nome}</Text>
                            </View>

                            <TouchableRipple onPress={() => setModalImageIsOpen(true)}>
                                <Avatar.Image source={{ uri: profissionalData?.foto_perfil }} />
                            </TouchableRipple>

                            {profissionalData?.foto_perfil && (
                                <DialogPerfil
                                    foto={profissionalData.foto_perfil}
                                    isVisible={modalImageIsOpen}
                                    onDimiss={() => setModalImageIsOpen(false)}
                                />
                            )}


                        </View>

                        <SegmentedButtons
                            value={secaoSelecionada}
                            onValueChange={(value) => setSecaoSelecionada(value)}
                            buttons={[
                                {
                                    value: 'informacoes',
                                    label: 'Informações',
                                },
                                {
                                    value: 'servicos',
                                    label: 'Serviços',
                                },
                            ]}
                        />

                        {secaoSelecionada === 'informacoes' ? (
                            <View style={styles.containerInformacoes}>

                                {horarioFuncionamentoData.length > 0 && (
                                    <List.Section>
                                        <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold, marginBottom: 5 }}>Horário de funcionamento</Text>
                                        <List.Accordion title={
                                            <HorarioFuncionamentoItem data={horarioFuncionamentoData.filter(horarioFuncionamento => horarioFuncionamento.dia_semana === new Date().getDay())[0]} key={horarioFuncionamentoData.filter(horarioFuncionamento => horarioFuncionamento.dia_semana === new Date().getDay())[0].id} />
                                        } >
                                            {horarioFuncionamentoData.map(horarioFuncionamento => {
                                                if (horarioFuncionamento.id != horarioFuncionamentoData.filter(horarioFuncionamento => horarioFuncionamento.dia_semana === new Date().getDay())[0].id) {
                                                    return (
                                                        <HorarioFuncionamentoItem key={horarioFuncionamento.id} data={horarioFuncionamento} />
                                                    )
                                                }

                                            })}
                                        </List.Accordion>
                                    </List.Section>
                                )}


                                <View style={styles.secao}>
                                    <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Sobre</Text>

                                    <Text variant='bodyLarge' style={styles.sobre}>{profissionalData?.sobre}</Text>
                                </View>

                                <View style={styles.secao}>
                                    <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Local de Atendimento</Text>

                                    <Text>{profissionalData?.endereco.logradouro} - {profissionalData?.endereco.bairro}</Text>
                                    <Text>{profissionalData?.endereco.cidade}, {profissionalData?.endereco.estado}</Text>
                                    <Text>CEP: {profissionalData?.endereco.cep}</Text>

                                    <View style={styles.mapa}>
                                        <MapView
                                            style={styles.mapa}
                                            initialRegion={{
                                                latitude: -22.89897976290171,
                                                longitude: -47.06117848896528,
                                                latitudeDelta: 0.005,
                                                longitudeDelta: 0.005
                                            }}
                                        >
                                            <Marker
                                                pinColor={theme.colors.primaryDark}
                                                coordinate={{
                                                    latitude: -22.89897976290171,
                                                    longitude: -47.06117848896528
                                                }}
                                            />
                                        </MapView>
                                    </View>

                                </View>

                                {profissionalData?.outras_informacoes && (
                                    <View style={[styles.secao, { paddingBottom: 40 }]}>
                                        <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Outras informações</Text>

                                        {Object.keys(profissionalData.outras_informacoes).map((info, index) => {
                                            if (info === 'atende_homecare') {
                                                return (
                                                    <CustomListItem key={index + 1} text='Atendimento Domiciliar' />
                                                )
                                            }

                                            if (info === 'cnpj') {
                                                return (
                                                    <CustomListItem text={`CNPJ: ${profissionalData.outras_informacoes[info]}`} />
                                                )
                                            }

                                            if (info === 'clientes_atendidos') {
                                                return (
                                                    <CustomListItem text={`Mais de ${profissionalData.outras_informacoes[info]} clientes atendidos`} />
                                                )
                                            }
                                        })}

                                    </View>
                                )}

                            </View>


                        ) : (
                            <View style={styles.containerServicos}>
                                {servicosProfissional.map(servico => {
                                    return (
                                        <ServicoCardHorizontal data={servico} key={servico.procedimento.id} />
                                    )
                                })}
                            </View>

                        )}

                    </View>

                </ScrollView>
            )}
        </>
    );
}

export { PerfilProfissional };