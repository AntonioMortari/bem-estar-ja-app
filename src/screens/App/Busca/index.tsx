import { DialogEnderecos } from '@/components/shared/DialogEnderecos';
import { useAuth } from '@/hooks/useAuth';
import { enderecoService } from '@/services/supabase/enderecoService';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Searchbar, SegmentedButtons, Text, TouchableRipple } from 'react-native-paper';
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

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [localizacaoIsLoading, setLocalizacaoIsLoading] = useState<boolean>(true);
    const [dialogEnderecoIsVisible, setDialogEnderecoIsVisible] = useState<boolean>(false);

    const [cidadeEstadoAtual, setCidadeEstadoAtual] = useState<ICidadeEstadoAtual | null>(null);
    const [localizacaoValue, setLocalizacaoValue] = useState<string>('localizacaoAtual');
    const [secaoSelecionada, setSecaoSelecionada] = useState<string>('');

    const [valorBusca, setValorBusca] = useState<string>(route.params?.searchValueParam || '');

    // useFocusEffect(() => {
    //     setValorBusca(route.params?.searchValueParam || '');
    // });


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
            }
        }

        setLocalizacaoIsLoading(false);
    }

    const procurarServico = async () => {
        console.log('buscar')
        setIsLoading(true);
        const result = await servicoService.procurarServicos(valorBusca);

        setServicosResult(result);

        setIsLoading(false);
    }

    const procurarProfissional = async () => {
        const result = await profissionalService.procurarProfissionais(valorBusca);

        setProfissionalResult(result);
    }

    return (
        <ScrollView>
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
                        onChangeText={setValorBusca}
                        onEndEditing={() => {
                            procurarProfissional();
                            procurarServico();
                        }}
                    />

                </View>

            </View>

            {isLoading ? (
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator animating color={theme.colors.primary} />
                </View>
            ) : (
                <>
                    <SegmentedButtons
                        value={secaoSelecionada}
                        onValueChange={(value) => setSecaoSelecionada(value)}
                        style={{marginTop: 30, width: '90%', margin: 'auto'}}
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
                        <View style={styles.containerResult}>
                            {servicosResult.map(servico => {
                                return (
                                    <ServicoCardHorizontal data={servico} key={servico.id} />
                                )
                            })}
                        </View>
                    ) : (
                        <View style={styles.containerResult}>
                            {profissionalResult.map(profissional => {
                                return (
                                    <ProfissionalCardHorizontal data={profissional} key={profissional.id} />
                                )
                            })}
                        </View>
                    )}

                </>

            )
            }

        </ScrollView >
    );
}

export { Busca };