import { IAvaliacaoFull, IServicoFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { servicoService } from '@/services/supabase/servicoService';
import { theme } from '@/theme/paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { notify } from 'react-native-notificated';
import { ActivityIndicator, Avatar, Button, Text } from 'react-native-paper';
import { styles } from './styles';
import { IconWithLabel } from '@/components/shared/IconLabel';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { CustomStackHeader } from '@/components/shared/CustomStackHeader';
import { Avaliacao } from '@/components/shared/Avaliacao';
import Stars from '@/components/shared/Stars';
import { ServicoCard } from '@/components/shared/ServicoCard';
import { avaliacaoService } from '@/services/supabase/avaliacaoService';
import { favoritoService } from '@/services/supabase/favoritoService';
import { useAuth } from '@/hooks/useAuth';
import { TituloSecao } from '@/components/shared/TituloSecao';





const DetalhesServico = ({ route }: any) => {
    const { clienteData } = useAuth();

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    const [servicoData, setServicoData] = useState<IServicoFull>();
    const [servicosSemelheantes, setServicosSemelheantes] = useState<IServicoFull[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<IAvaliacaoFull[]>([]);

    const [isFavorito, setIsFavorito] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [atualizarIsFavorito, setAtualizarIsFavorito] = useState<boolean>(false);


    useEffect(() => {
        // busca os dados do serviço selecionado, resgatando o id por parâmetro
        const { idServico } = route.params;

        if (!idServico) {
            // se não houver id do serviço, volta para a tela anterior
            navigator.goBack();
        }

        const getServicoData = async () => {
            // busca os dados do serviço por id
            setIsLoading(true);
            const result = await servicoService.getById(idServico);
            if (!result) {
                notify('error', {
                    params: {
                        title: 'Ocorreu um erro inesperado',
                        description: 'Tente novamente mais tarde'
                    }
                });
                return navigator.goBack();
            }

            setServicoData(result);
            setIsLoading(false);
        }

        getServicoData();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        //busca serviços semelheantes, com base na área de atuação do serviço selecionado, cidade e estado
        const getServicosSemelheantes = async () => {
            if (servicoData) {
                const result = await servicoService.getServicosSemelheantes(servicoData?.procedimento.area_atuacao_id, servicoData?.endereco.cidade, servicoData?.endereco.estado);

                setServicosSemelheantes(result);
                setIsLoading(false);
            }
        }

        getServicosSemelheantes();
    }, [servicoData]);

    useEffect(() => {
        // busca as 3 últimas avaliações pelo id do serviço
        const getAvaliacoes = async () => {
            if (servicoData) {
                const result = await avaliacaoService.getByServicoId(servicoData.id);
                setAvaliacoes(result);
            }
        }

        getAvaliacoes();
    }, [servicoData]);

    useEffect(() => {
        const checkIsFavorito = async () => {
            if (clienteData && servicoData) {
                const result = await favoritoService.checkServicoIsFavorito(clienteData.id, servicoData.id);

                setIsFavorito(result);
            }
        }

        checkIsFavorito();
    }, [clienteData, servicoData, atualizarIsFavorito]);

    const addServicoFavoritos = async () => {
        if (clienteData && servicoData) {
            const result = await favoritoService.adicionarServicoFavorito(clienteData.id, servicoData.id);

            setAtualizarIsFavorito(!atualizarIsFavorito);
        }
    }

    const removerServicoFavoritos = async () => {
        if (clienteData && servicoData) {
            const result = await favoritoService.removerServicoFavorito(clienteData.id, servicoData.id);

            setAtualizarIsFavorito(!atualizarIsFavorito);
        }
    }

    const handleNavigatePerfilProfissional = () => {
        // navega para o perfil do profissional
        if (servicoData?.profissional.id) {
            navigator.navigate('PerfilProfissional', { idProfissional: servicoData?.profissional.id });
        }
    }


    return (
        <>
            {isLoading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={theme.colors.primary} animating />
                </View>
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CustomStackHeader
                            isFavorito={isFavorito}
                            onPress={() => {
                                if (isFavorito) {
                                    removerServicoFavoritos();
                                } else {
                                    addServicoFavoritos();
                                }
                            }}
                        />

                        <View style={styles.containerImage}>
                            <ImageBackground
                                style={styles.image}
                                source={{ uri: servicoData?.foto }}
                            />
                        </View>

                        <View style={styles.conteudo}>

                            <View style={styles.secao}>

                                <Text variant='titleLarge' style={styles.titulo}>{servicoData?.procedimento.nome}</Text>

                                <Text variant='bodyMedium' style={styles.descricao}>{servicoData?.procedimento.descricao}</Text>

                                <View style={styles.containerIcons}>
                                    <IconWithLabel
                                        icon={<AntDesign name="clockcircleo" size={20} color={theme.colors.primary} />}
                                        label={`${servicoData?.procedimento.duracao} minutos`}
                                    />

                                    <IconWithLabel
                                        icon={<FontAwesome6 name="location-dot" size={20} color={theme.colors.primary} />}
                                        label={`${servicoData?.endereco.cidade}, ${servicoData?.endereco.estado}`}
                                    />
                                </View>

                            </View>


                            <View style={styles.secao}>
                                <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Endereço</Text>

                                <Text>{servicoData?.endereco.logradouro} - {servicoData?.endereco.bairro}</Text>
                                <Text>{servicoData?.endereco.cidade}, {servicoData?.endereco.estado}</Text>
                                <Text>CEP: {servicoData?.endereco.cep}</Text>

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
                                            coordinate={{
                                                latitude: -22.89897976290171,
                                                longitude: -47.06117848896528
                                            }}
                                        />
                                    </MapView>
                                </View>

                                <View style={styles.containerPerfil}>
                                    <Avatar.Image source={{ uri: servicoData?.profissional.foto_perfil }} size={70} />

                                    <View style={styles.containerTextPerfil}>
                                        <Text variant='titleMedium' style={styles.nomePerfil}>{servicoData?.profissional.nome}</Text>
                                        <Text style={styles.areaAtuacaoPerfil}>Profissional de {servicoData?.profissional.area_atuacao.nome}</Text>
                                    </View>
                                </View>

                                <Button onPress={handleNavigatePerfilProfissional} style={styles.botaoVerPerfil} mode='contained'>Ver Perfil</Button>
                            </View>


                            {avaliacoes.length > 0 && (
                                <View style={styles.secao}>
                                    <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Avaliações dos clientes</Text>
                                    <Stars stars={servicoData?.avaliacao || 0} showNumber />
                                    <View>

                                        <View style={styles.containerAvaliacoes}>
                                            {avaliacoes.map(avaliacaoData => (
                                                <Avaliacao
                                                    clienteData={{
                                                        nome: avaliacaoData.cliente.nome,
                                                        foto: avaliacaoData.cliente.foto_perfil
                                                    }}
                                                    data={avaliacaoData.created_at}
                                                    avaliacao={avaliacaoData.avaliacao}
                                                    nota={avaliacaoData.nota}
                                                />
                                            ))}
                                        </View>
                                    </View>

                                </View>
                            )}

                            {servicosSemelheantes.length > 0 && (
                                <View style={styles.secao}>
                                    {/* <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Serviços Semelheantes</Text> */}

                                    <TituloSecao
                                        titulo='Serviços Semelheantes'
                                        showButton={false}
                                    />

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {servicosSemelheantes.map(servico => {
                                            if (servico.id != servicoData?.id) {
                                                return <ServicoCard
                                                    data={servico}
                                                    key={servico.id}
                                                    onPress={() => {
                                                        navigator.goBack();
                                                        navigator.navigate('DetalhesServico', { idServico: servico.id })
                                                    }}
                                                />
                                            }
                                        })}
                                    </ScrollView>
                                </View>
                            )}


                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <Text variant='titleLarge'>R${servicoData?.procedimento.preco}</Text>

                        <Button mode='contained'>Agendar</Button>
                    </View>
                </>
            )}
        </>
    );
}

export { DetalhesServico };