import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';


import { IProfissionalFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { profissionalService } from '@/services/supabase/profissionalService';
import { CustomStackHeader } from '@/components/shared/CustomStackHeader';
import { favoritoService } from '@/services/supabase/favoritoService';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme/paper';
import { styles } from './styles';

import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Avatar, List, SegmentedButtons, Text } from 'react-native-paper';

const PerfilProfissional = ({ route }: any) => {
    const [profissionalData, setProfissionalData] = useState<IProfissionalFull>();

    const [isFavorito, setIsFavorito] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [atualizarIsFavorito, setAtualizarIsFavorito] = useState<boolean>(false);
    const [secaoSelecionada, setSecaoSelecionada] = useState<string>('informacoes');

    const { clienteData } = useAuth();

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    useEffect(() => {
        const getProfissionalData = async () => {
            setIsLoading(true);
            const { idProfissional } = route.params;

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

        getProfissionalData();
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

    const addProfissionalFavorito = async () => {
        if (profissionalData && clienteData) {
            await favoritoService.adicionarProfissionalFavorito(clienteData.id, profissionalData.id);

            setAtualizarIsFavorito(!atualizarIsFavorito);
        }
    }

    const removerProfissionalFavorito = async () => {
        if (clienteData && profissionalData) {
            await favoritoService.removerProfissionalFavorito(clienteData.id, profissionalData.id);
            setAtualizarIsFavorito(!atualizarIsFavorito);
        }
    }

    return (
        <>
            {isLoading ? (
                <>
                    <ActivityIndicator color={theme.colors.primary} animating />
                </>
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
                        <ImageBackground
                            style={styles.image}
                            source={{ uri: profissionalData?.foto_perfil }}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 15 }}>
                        <View style={styles.header}>

                            <View>
                                <Text variant='titleLarge' style={styles.titulo}>{profissionalData?.nome}</Text>
                                <Text variant='titleMedium' style={styles.subtitulo}>Profisisonal de {profissionalData?.area_atuacao.nome}</Text>
                            </View>

                            <Avatar.Image source={{ uri: profissionalData?.foto_perfil }} />

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

                                <List.Section>
                                    <List.Accordion title='Horário de Funcionamento'    >
                                        <List.Item title='Primeiro item' />
                                        <List.Item title='Segundo Item' />
                                        <List.Item title='Terceiro Item' />
                                    </List.Accordion>
                                </List.Section>

                                <View style={styles.secao}>
                                    <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Sobre</Text>

                                    <Text variant='bodyLarge' style={styles.sobre}>{profissionalData?.sobre}</Text>
                                </View>

                                {/* <View style={styles.secao}>
                                    <Text variant='titleMedium' style={{ fontFamily: theme.fonts.semibold }}>Endereço</Text>

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
                                                coordinate={{
                                                    latitude: -22.89897976290171,
                                                    longitude: -47.06117848896528
                                                }}
                                            />
                                        </MapView>
                                    </View>

                                </View> */}

                            </View>

                        ) : (
                            <View style={styles.containerServicos}>
                                <Text>Serviços</Text>
                            </View>

                        )}

                    </View>

                </ScrollView>
            )}
        </>
    );
}

export { PerfilProfissional };