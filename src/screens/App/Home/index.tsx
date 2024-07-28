import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Searchbar, Text, TouchableRipple } from 'react-native-paper';

import { IProfissionalFull, IServicoFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { ServicoCard } from '@/components/shared/ServicoCard';
import { TituloSecao } from '@/components/shared/TituloSecao';
import { ProfissionalCard } from '@/components/shared/ProfissionalCard';
import { servicoService } from '@/services/supabase/servicoService';
import { profissionalService } from '@/services/supabase/profissionalService';
import { styles } from './styles';
import { theme } from '@/theme/paper';
import { useAuth } from '@/hooks/useAuth';

import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { enderecoService } from '@/services/supabase/enderecoService';
import { DialogEnderecos } from '@/components/shared/DialogEnderecos';
import { notify } from 'react-native-notificated';
import { utils } from '@/utils';

export interface ICidadeEstadoAtual {
    cidade: string;
    estado: string;
}

const Home = () => {
    const navigation = useNavigation<TAppClienteNavigationRoutes>();
    const { clienteData, handleLogout } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [valorBusca, setValorBusca] = useState<string>('');

    const [servicosEmDestaque, setServicosEmDestaque] = useState<IServicoFull[]>([]);
    const [profissionais, setProfissionais] = useState<IProfissionalFull[]>([]);
    const [servicosNovidades, setServicosNovidades] = useState<IServicoFull[]>([]);
    const [servicosEstetica, setServicosEstetica] = useState<IServicoFull[]>([]);
    const [servicosMassoterapia, setServicosMassoterapia] = useState<IServicoFull[]>([]);


    const [cidadeEstadoAtual, setCidadeEstadoAtual] = useState<ICidadeEstadoAtual | null>(null);

    const [dialogIsVisible, setDialogIsVisible] = useState<boolean>(false);
    const [localizacaoValue, setLocalizacaoValue] = useState<string>('localizacaoAtual');
    const [localizacaoIsLoading, setLocalizacaoIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            // busca os dados quando o estado: cidadeEstadoAtual muda

            if (cidadeEstadoAtual?.cidade && cidadeEstadoAtual.estado) {
                const profissionaisData = await profissionalService.getAll();
                if (typeof profissionaisData != 'string') {
                    setProfissionais(profissionaisData);
                }

                const servicosEmDestaqueResult = await servicoService.getMelhorAvaliados(cidadeEstadoAtual.cidade, cidadeEstadoAtual.estado);
                if (typeof servicosEmDestaqueResult != 'string') {
                    setServicosEmDestaque(servicosEmDestaqueResult);
                }

                const servicosNovidadesResult = await servicoService.getNovidades(cidadeEstadoAtual.cidade, cidadeEstadoAtual.estado);
                if (typeof servicosNovidadesResult != 'string') {
                    setServicosNovidades(servicosNovidadesResult);
                }

                const servicosEsteticaResult = await servicoService.getServicosEstetica(cidadeEstadoAtual.cidade, cidadeEstadoAtual.estado)
                setServicosEstetica(servicosEsteticaResult);

                const servicosMassoterapiaResult = await servicoService.getServicosMassoterapia(cidadeEstadoAtual.cidade, cidadeEstadoAtual.estado);
                setServicosMassoterapia(servicosMassoterapiaResult);
            }

            setIsLoading(false);
        }

        getData();
    }, [cidadeEstadoAtual]);

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
        setDialogIsVisible(true);
    }

    const handleLocalizacaoValue = async (value: string) => {
        setLocalizacaoIsLoading(true);
        setLocalizacaoValue(value);
        setDialogIsVisible(false);

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

    const goSearch = () => {
        setValorBusca('');

        navigation.navigate('Busca', { searchValueParam: valorBusca });
    }


    return (
        <ScrollView>
            <View style={styles.header}>
                {/* Modal de selecionar endereço */}
                <DialogEnderecos
                    isVisible={dialogIsVisible}
                    enderecos={clienteData?.enderecos}
                    onDimiss={() => setDialogIsVisible(false)}
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

                <View style={styles.titulo}>
                    {/* Título/Saudação */}
                    <Text variant='headlineMedium' style={{ color: theme.colors.light }}><Text style={{ color: theme.colors.light }}>{utils.getSaudacao()},</Text> {clienteData?.nome.split(' ')[0]}</Text>
                </View>

            </View>

            <View style={styles.containerBusca}>
                {/* Container do input de busca */}

                <Searchbar
                    style={styles.inputBusca}
                    placeholder='Faça sua pesquisa'
                    elevation={3}
                    placeholderTextColor={theme.colors.gray}
                    value={valorBusca}
                    onChangeText={setValorBusca}
                    onEndEditing={goSearch}
                />

            </View>

            {isLoading ? (
                <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={theme.colors.primary} animating />
                </View>
            ) : (
                <>
                    {servicosEmDestaque.length === 0 && servicosNovidades.length === 0 && profissionais.length === 0 ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, paddingHorizontal: 10 }}>
                            <Text variant='titleLarge'>Desculpe. Não encontramos nenhum serviço ou profissional em sua região.</Text>
                        </View>
                    ) : (
                        <View style={styles.containerSecoes}>

                            {profissionais.length > 0 && (
                                <View>
                                    {/* Seção Profissionais perto de você */}
                                    <TituloSecao
                                        titulo='Profissionais perto de você'
                                        onPress={() => console.log('Olá')}
                                    />

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {profissionais.map(profissional => (
                                            <ProfissionalCard onPress={() => navigation.navigate('PerfilProfissional', { idProfissional: profissional.id })} data={profissional} key={profissional.id} />
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {servicosEmDestaque.length > 0 && (
                                <View>
                                    {/* Seção Serviços em Destaque */}
                                    <TituloSecao
                                        titulo='Serviços em Destaque'
                                        onPress={() => console.log('Olá')}
                                    />

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {servicosEmDestaque.map(servico => (
                                            <ServicoCard data={servico} key={servico.id} />
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {servicosNovidades.length > 0 && (
                                <View>
                                    {/* Seção Serviços em Destaque */}
                                    <TituloSecao
                                        titulo={`Novidades em ${cidadeEstadoAtual?.cidade}`}
                                        onPress={() => console.log('Olá')}
                                    />

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {servicosNovidades.map((servico, index) => (
                                            <ServicoCard data={servico} key={servico.id + index} />
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {servicosEstetica.length > 0 && (
                                <View>
                                    {/* Seção Serviços em Destaque */}
                                    <TituloSecao
                                        titulo={`Estética`}
                                        onPress={() => console.log('Olá')}
                                    />

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {servicosEstetica.map((servico, index) => (
                                            <ServicoCard data={servico} key={servico.id + index} />
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {servicosMassoterapia.length > 0 && (
                                <View>
                                    {/* Seção Serviços em Destaque */}
                                    <TituloSecao
                                        titulo={`Massoterapia`}
                                        onPress={() => console.log('Olá')}
                                    />

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {servicosMassoterapia.map((servico, index) => (
                                            <ServicoCard data={servico} key={servico.id + index} />
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                        </View>
                    )}
                </>
            )}

        </ScrollView>
    );
}

export { Home };