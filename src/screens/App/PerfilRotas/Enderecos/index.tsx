import { TelasPerfilLayout } from "@/layouts/TelasPerfilLayout";
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Dialog, Divider, Portal, Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { useAuth } from "@/hooks/useAuth";
import Feather from '@expo/vector-icons/Feather';
import { theme } from "@/theme/paper";
import { IEndereco } from "@/@types/databaseTypes";
import { enderecoService } from "@/services/supabase/enderecoService";
import { notify } from "react-native-notificated";



const Enderecos = () => {
    const { clienteData, setClienteData } = useAuth();
    const [enderecos, setEnderecos] = useState<IEndereco[]>([]);

    const [idEnderecoSelecionado, setIdEnderecoSelecionado] = useState<string>('');

    const [dialogIsVisible, setDialogIsVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    useEffect(() => {
        const getEnderecos = async () => {
            setIsLoading(true);
            if (clienteData) {
                const result = await enderecoService.getEnderecoByUsuarioId(clienteData.id);

                if (!result) {
                    notify('error', {
                        params: {
                            title: 'Algo deu errado',
                            description: 'Tente novamente mais tarde'
                        }
                    });

                    return;
                }

                setEnderecos(result);
                setIsLoading(false);
            }
        }

        getEnderecos();
    }, [clienteData])

    const excluirEndereco = async (idEndereco: string) => {
        await enderecoService.deleteById(idEndereco);

        if (clienteData) {
            setClienteData({
                ...clienteData,
                enderecos: clienteData.enderecos.filter(endereco => endereco.id !== idEndereco)
            });

            notify('success', {
                params: {
                    title: 'Endereço exluído com sucesso!'
                }
            });
        }

    }


    return (
        <TelasPerfilLayout titulo='Endereços' descricao='Gerencie seus endereços para encontrar serviços e profissionais na sua região'>

            <Portal>
                <Dialog visible={dialogIsVisible} onDismiss={() => setDialogIsVisible(false)}>
                    <Dialog.Title>Confirmação</Dialog.Title>

                    <Dialog.Content>
                        <Text>Tem certeza que deseja excluir o endereço selecionado?</Text>

                        <Dialog.Actions style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Button style={{ width: '45%' }} mode='outlined' onPress={() => {
                                excluirEndereco(idEnderecoSelecionado);
                                setDialogIsVisible(false)
                            }}>Confirmar</Button>
                            <Button style={{ width: '45%' }} mode='contained' onPress={() => setDialogIsVisible(false)}>Cancelar</Button>
                        </Dialog.Actions>
                    </Dialog.Content>
                </Dialog>
            </Portal>

            {isLoading ? (
                <View style={{ marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={theme.colors.primary} animating />
                </View>
            ) : (
                <>
                    {clienteData?.enderecos && enderecos.length > 0 ? (
                        <>
                            <View style={styles.containerEnderecos}>

                                {enderecos.map(endereco => (
                                    <View key={endereco.id}>
                                        <View style={styles.enderecoItemContainer}>
                                            <View>
                                                <Text variant='titleMedium' numberOfLines={1} style={{ maxWidth: '90%' }}>{endereco.logradouro}</Text>
                                                <Text variant='titleMedium'>{endereco.cep}</Text>
                                                <Text variant='titleMedium'>{endereco.cidade}, {endereco.estado}</Text>
                                            </View>

                                            <Pressable onPress={() => {
                                                setIdEnderecoSelecionado(endereco.id);
                                                setDialogIsVisible(true);
                                            }}>
                                                <Feather name="trash-2" size={24} color={theme.colors.grayDark} />
                                            </Pressable>


                                        </View>

                                        <Divider />
                                    </View>
                                ))}

                            </View>
                        </>
                    ) : (
                        <>
                            <Text variant='titleMedium' style={{ textAlign: 'center' }}>Nenhum endereço cadastrado</Text>
                        </>
                    )}
                </>
            )}



            <Button style={{ marginBottom: 30 }} mode="outlined" onPress={() => navigator.navigate('NovoEndereco')}>Cadastrar novo endereço</Button>
        </TelasPerfilLayout>
    );
}

export { Enderecos };