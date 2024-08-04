import { Image, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { servicoService } from '@/services/supabase/servicoService';
import { IServicoFull } from '@/@types/databaseTypes';
import { notify } from 'react-native-notificated';
import { Button, Text, TouchableRipple } from 'react-native-paper';
import { theme } from '@/theme/paper';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { IconWithLabel } from '@/components/shared/IconLabel';

// icons
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Stars from '@/components/shared/Stars';



const AgendarServico = ({ route }: any) => {
    const [servicoData, setServicoData] = useState<IServicoFull | null>(null);

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    useEffect(() => {

        const getServicoData = async () => {
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

        }

        getServicoData();

    }, [route.params]);

    const gotToDetalhesServico = () => {
        if (servicoData) {
            navigator.navigate('DetalhesServico', { idServico: servicoData.id })
        }
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <TouchableRipple onPress={() => navigator.goBack()} style={styles.buttonVoltar}>
                    <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
                </TouchableRipple>

                <Text variant='headlineSmall'>Confirmar Agendamento</Text>
            </View>

            <View style={styles.containerServicoData}>

                <View style={styles.containerServicoNomeFoto}>
                    <View style={{borderRadius: 16}}>
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

        </ScrollView>

    );
}

export { AgendarServico };