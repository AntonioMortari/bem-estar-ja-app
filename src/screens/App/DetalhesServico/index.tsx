import { IServicoFull } from '@/@types/databaseTypes';
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
import AvatarImage from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import { CustomStackHeader } from '@/components/shared/CustomStackHeader';





const DetalhesServico = ({ route }: any) => {

    const navigator = useNavigation<TAppClienteNavigationRoutes>();
    const [servicoData, setServicoData] = useState<IServicoFull>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const { idServico } = route.params;

        if (!idServico) {
            navigator.goBack();
        }

        const getServicoData = async () => {
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

    const handleNavigatePerfilProfissional = () => {
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
                    <ScrollView>
                        <CustomStackHeader />
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