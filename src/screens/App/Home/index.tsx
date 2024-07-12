import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Searchbar, Text, TouchableRipple } from 'react-native-paper';

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



const Home = () => {
    const navigation = useNavigation<TAppClienteNavigationRoutes>();
    const [servicos, setServicos] = useState<IServicoFull[]>([]);
    const [profissionais, setProfissionais] = useState<IProfissionalFull[]>([]);
    const { clienteData, handleLogout } = useAuth();

    useEffect(() => {
        const getData = async () => {
            // busca os dados
            const servicosData = await servicoService.getAll()
            if (typeof servicosData != 'string') {
                setServicos(servicosData);
            }

            const profissionaisData = await profissionalService.getAll();
            if (typeof profissionaisData != 'string') {
                setProfissionais(profissionaisData);
            }
            
        }

        getData();
    }, [])

    return (
        <ScrollView>
            <View style={styles.header}>
                <TouchableRipple rippleColor="rgba(0, 0, 0, .05)" style={styles.containerLocalizacao}>

                    <>
                        {/* Ao pressionar, o cliente pode selecionar o endereço ou a localização atual */}
                        <FontAwesome6 name="location-dot" size={20} color={theme.colors.light} />
                        <Text variant='bodyLarge' style={{ color: theme.colors.light }}>Campinas, SP</Text>

                        <AntDesign name="down" size={18} color={theme.colors.light} />
                    </>
                </TouchableRipple>

                <View style={styles.titulo}>
                    {/* Título/Saudação */}
                    <Text variant='headlineMedium' style={{ color: theme.colors.light }}><Text style={{ color: theme.colors.light }}>Bom dia,</Text> {clienteData?.nome.split(' ')[0]}</Text>
                </View>

            </View>

            <View style={styles.containerBusca}>
                {/* Container do input de busca */}

                <Searchbar
                    style={styles.inputBusca}
                    placeholder='Faça sua pesquisa'
                    elevation={3}
                    placeholderTextColor={theme.colors.gray}
                    value={''}
                />

            </View>

            <View style={styles.containerSecoes}>

                <View>
                    {/* Seção Profissionais perto de você */}
                    <TituloSecao
                        titulo='Profissionais perto de você'
                        onPress={() => console.log('Olá')}
                    />

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {profissionais.map(profissional => (
                            <ProfissionalCard onPress={() => console.log('Olá')} data={profissional} />
                        ))}
                    </ScrollView>
                </View>

                <View>
                    {/* Seção Serviços em Destaque */}
                    <TituloSecao
                        titulo='Serviços em Destaque'
                        onPress={() => console.log('Olá')}
                    />

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {servicos.map(servico => (
                            <ServicoCard data={servico} />
                        ))}
                    </ScrollView>
                </View>

            </View>
        </ScrollView>
    );
}

export { Home };