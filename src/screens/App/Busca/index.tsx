import { DialogEnderecos } from '@/components/shared/DialogEnderecos';
import { useAuth } from '@/hooks/useAuth';
import { enderecoService } from '@/services/supabase/enderecoService';
import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Searchbar, SegmentedButtons, Text, TouchableRipple } from 'react-native-paper';
import { ICidadeEstadoAtual } from '../Home';
import { styles } from './styles';
import { notify } from 'react-native-notificated';
import { theme } from '@/theme/paper';

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { IProfissionalFull, IServicoFull } from '@/@types/databaseTypes';
import { servicoService } from '@/services/supabase/servicoService';
import { ServicoCardHorizontal } from '@/components/shared/ServicoCardHorizontal';
import { profissionalService } from '@/services/supabase/profissionalService';
import { ProfissionalCard } from '@/components/shared/ProfissionalCard';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { ProfissionalCardHorizontal } from '@/components/shared/ProfissionalCardHorizontal';


const Busca = ({ route }: any) => {
    const { clienteData } = useAuth();
    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    const [servicosResult, setServicosResult] = useState<IServicoFull[]>([]);
    const [profissionalResult, setProfissionalResult] = useState<IProfissionalFull[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [localizacaoIsLoading, setLocalizacaoIsLoading] = useState<boolean>(true);
    const [dialogEnderecoIsVisible, setDialogEnderecoIsVisible] = useState<boolean>(false);
    const [fezBusca, setFezBusca] = useState<boolean>(false);

    const [cidadeEstadoAtual, setCidadeEstadoAtual] = useState<ICidadeEstadoAtual | null>(null);
    const [localizacaoValue, setLocalizacaoValue] = useState<string>('localizacaoAtual');
    const [secaoSelecionada, setSecaoSelecionada] = useState<string>('servicos');

    const [valorBusca, setValorBusca] = useState<string>(route.params?.searchValueParam || '');


    useFocusEffect(() => {
        focusSearchbar();
    })

    const searchbarRef: any = useRef();

    // Função para focar no campo de entrada
    const focusSearchbar = () => {
        if (searchbarRef.current) {
            searchbarRef.current.focus()
        }
    };


    useEffect(() => {
        setLocalizacaoIsLoading(true);
        const getCidadeEstadoAtual = async () => {
            const result = await enderecoService.getCidadeEstadoByCoordenadas();

            if (result) {
                // caso a busca por localização seja bem-sucedida
                setCidadeEstadoAtual(result);
                setLocalizacaoIsLoading(false);
                setLocalizacaoValue('localizacaoAtual')
                return;
            }

            if (clienteData) {
                // se não for possível buscar a localização atual, atualiza o estado: cidadeEstadoAtual com o primeiro endereço da lista de endereços cadastrados
                setCidadeEstadoAtual({
                    cidade: clienteData.enderecos[0].cidade,
                    estado: clienteData.enderecos[0].estado
                });
                setLocalizacaoValue(clienteData.enderecos[0].id); // muda o radio selecionado
            }
            setLocalizacaoIsLoading(false);
        }

        getCidadeEstadoAtual();
    }, [clienteData]);

    const handleCidadeEstadoAtual = () => {
        setDialogEnderecoIsVisible(true);
    }

    const handleLocalizacaoValue = async (value: string) => {
        setLocalizacaoIsLoading(true);
        setLocalizacaoValue(value);
        setDialogEnderecoIsVisible(false);

        if (value === 'localizacaoAtual') {
            // se o usuário selecionar o radio de localização atual
            const result = await enderecoService.getCidadeEstadoByCoordenadas();

            if (result) {
                setCidadeEstadoAtual({
                    cidade: result.cidade,
                    estado: result.estado
                });

                if (valorBusca.length > 0) {
                    // procurar serviços e profissionais com endereço atualizado
                    const result1 = await servicoService.procurarServicos(valorBusca, result.cidade, result.estado);
                    setServicosResult(result1);

                    const result2 = await profissionalService.procurarProfissionais(valorBusca);
                    setProfissionalResult(result2)
                }


            } else {
                // caso algo de errado na busca por localização
                notify('error', {
                    params: {
                        title: 'Erro ao buscar por localização',
                        description: 'Tente novamente mais tarde'
                    }
                })
            }
        } else {
            // se o usuário selecionou um radio de endereço
            const enderecoSelecionado = clienteData?.enderecos.filter(endereco => endereco.id === value)[0];

            // atualiza o estado: cidadeEstadoAtual com as informações do endereço selecionado
            if (enderecoSelecionado) {
                setCidadeEstadoAtual({
                    cidade: enderecoSelecionado.cidade,
                    estado: enderecoSelecionado.estado
                });

                if (valorBusca.length > 0) {
                    // procurar serviços e profissionais com endereço atualizado
                    const result1 = await servicoService.procurarServicos(valorBusca, enderecoSelecionado.cidade, enderecoSelecionado.estado);
                    setServicosResult(result1);

                    const result2 = await profissionalService.procurarProfissionais(valorBusca);
                    setProfissionalResult(result2)
                }
            }
        }

        setLocalizacaoIsLoading(false);
    }

    const procurarServico = async () => {
        setIsLoading(true);

        if (cidadeEstadoAtual) {
            const result = await servicoService.procurarServicos(valorBusca, cidadeEstadoAtual?.cidade, cidadeEstadoAtual?.estado);
            setServicosResult(result);
        }
    }

    const procurarProfissional = async () => {
        setIsLoading(true);
        const result = await profissionalService.procurarProfissionais(valorBusca);

        setProfissionalResult(result);
    }

    const handleOnEndEditing = () => {
        // quando clicar no botão de pesquisar na barra de pesquisa
        if (valorBusca.length === 0) return; //se não houver nada digitado, não faz nada

        procurarProfissional();
        procurarServico();

        setFezBusca(true); // inidica que a busca foi feita
        setIsLoading(false);
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
                {/* Modal de selecionar endereço */}
                <DialogEnderecos
                    isVisible={dialogEnderecoIsVisible}
                    enderecos={clienteData?.enderecos}
                    onDimiss={() => setDialogEnderecoIsVisible(false)}
                    onValueChange={handleLocalizacaoValue}
                    value={localizacaoValue}
                />

                {localizacaoIsLoading ? (
                    <>
                        <ActivityIndicator color={theme.colors.light} animating />
                    </>
                ) : (
                    <>
                        <TouchableRipple rippleColor="rgba(0, 0, 0, .05)" style={styles.containerLocalizacao} onPress={handleCidadeEstadoAtual}>

                            <>
                                {/* Ao pressionar, o cliente pode selecionar o endereço ou a localização atual */}
                                <FontAwesome6 name="location-dot" size={20} color={theme.colors.light} />
                                <Text variant='bodyLarge' style={{ color: theme.colors.light }}>{cidadeEstadoAtual?.cidade}, {cidadeEstadoAtual?.estado}</Text>

                                <AntDesign name="down" size={18} color={theme.colors.light} />
                            </>
                        </TouchableRipple>
                    </>
                )}
                <View style={styles.containerBusca}>
                    {/* Container do input de busca */}

                    <Searchbar
                        style={styles.inputBusca}
                        placeholder='Faça sua pesquisa'
                        elevation={3}
                        placeholderTextColor={theme.colors.gray}
                        value={valorBusca}
                        ref={searchbarRef}
                        onChangeText={(text) => {
                            setValorBusca(text);

                            if (text.length === 0) {
                                // se o campo estiver vazio
                                setFezBusca(false);
                            }
                        }}
                        onEndEditing={handleOnEndEditing}
                    />

                </View>

            </View>

            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 50 }} animating color={theme.colors.primary} />
            ) : (
                <>
                    {!fezBusca ? (
                        <View style={{ gap: 20, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                            <Text variant='titleLarge' style={{ textAlign: 'center' }}>Pesquise por um serviço ou profissional na sua região</Text>

                            <Image
                                source={require('@/images/search-image.png')}
                                style={{ width: 300, height: 300 }}
                            />
                        </View>
                    ) : (
                        <>
                            {fezBusca && valorBusca.length > 0 && servicosResult.length === 0 && profissionalResult.length === 0 ? (
                                // se uma busca foi feita mas não há resultados
                                <View style={{ gap: 20, alignItems: 'center', justifyContent: 'center', marginTop: 20, height: '100%' }}>

                                    <View style={{ alignItems: 'center', gap: 10 }}>
                                        <Text style={{ fontFamily: theme.fonts.semibold, textAlign: 'center', paddingHorizontal: 20 }}>Sem resultados para a busca "{valorBusca}" na sua região</Text>

                                        <Button mode='text' onPress={handleCidadeEstadoAtual}>Tente outro endereço</Button>
                                    </View>

                                    <Image
                                        source={require('@/images/no-results-search.png')}
                                        style={{ width: 300, height: 300 }}
                                    />
                                </View>
                            ) : (
                                <>
                                    {fezBusca && (
                                        // se uma busca foi feita e tem resultados em pelo menos uma categoria (profissional ou serviço)
                                        <>
                                            <SegmentedButtons
                                                value={secaoSelecionada}
                                                onValueChange={(value) => setSecaoSelecionada(value)}
                                                style={{ marginTop: 30, width: '90%', margin: 'auto' }}
                                                buttons={[
                                                    {
                                                        value: 'servicos',
                                                        label: 'Serviços',
                                                    },
                                                    {
                                                        value: 'profissionais',
                                                        label: 'Profissionais',
                                                    },
                                                ]}
                                            />
                                            {secaoSelecionada === 'servicos' ? (
                                                <>
                                                    {servicosResult.length > 0 ? (
                                                        <View style={styles.containerResult}>
                                                            {servicosResult.map(servico => {
                                                                return (
                                                                    <ServicoCardHorizontal data={servico} key={servico.id} />
                                                                )
                                                            })}
                                                        </View>
                                                    ) : (
                                                        <Text variant='bodyLarge' style={{ paddingHorizontal: 20, marginTop: 25 }}>Nenhum serviço encontrado com o nome "{valorBusca}"</Text>

                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {profissionalResult.length > 0 ? (
                                                        <View style={styles.containerResult}>
                                                            {profissionalResult.map(profissional => {
                                                                return (
                                                                    <ProfissionalCardHorizontal data={profissional} key={profissional.id} />
                                                                )
                                                            })}
                                                        </View>
                                                    ) : (
                                                        <Text variant='bodyLarge' style={{ paddingHorizontal: 20, marginTop: 25 }}>Nenhum profissional encontrado com o nome "{valorBusca}"</Text>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )
            }

        </ScrollView >
    );
}

export { Busca };