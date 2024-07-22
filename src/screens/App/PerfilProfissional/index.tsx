import { IProfissionalFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { profissionalService } from '@/services/supabase/profissionalService';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, View } from 'react-native';
import { ActivityIndicator, Avatar, Text } from 'react-native-paper';

import { styles } from './styles';
import { CustomStackHeader } from '@/components/shared/CustomStackHeader';
import { favoritoService } from '@/services/supabase/favoritoService';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme/paper';
import { IconWithLabel } from '@/components/shared/IconLabel';

const PerfilProfissional = ({ route }: any) => {
    const [profissionalData, setProfissionalData] = useState<IProfissionalFull>();

    const [isFavorito, setIsFavorito] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [atualizarIsFavorito, setAtualizarIsFavorito] = useState<boolean>(false);

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

                       <View>
                            
                            <View>
                                <Text>{profissionalData?.nome}</Text>
                                <Text>Profisisonal de {profissionalData?.area_atuacao.nome}</Text>
                            </View>

                            <Avatar.Image source={{uri: profissionalData?.foto_perfil}} />
                            
                       </View>

                    </ScrollView>
            )}
        </>
    );
}

export { PerfilProfissional };