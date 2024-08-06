import { TelasPerfilLayout } from "@/layouts/TelasPerfilLayout";
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from "react";
import { Button, Dialog, Divider, Portal, Text } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { useAuth } from "@/hooks/useAuth";
import Feather from '@expo/vector-icons/Feather';
import { theme } from "@/theme/paper";
import { IEndereco } from "@/@types/databaseTypes";
import { enderecoService } from "@/services/supabase/enderecoService";
import { notify } from "react-native-notificated";



const Enderecos = () => {
    const { clienteData } = useAuth();
    const [enderecos, setEnderecos] = useState<IEndereco[]>([]);

    const [dialogIsVisible, setDialogIsVisible] = useState<boolean>(false);

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    useFocusEffect(() => {
        const getEnderecos = async() => {
            if(clienteData){
                const result = await enderecoService.getEnderecoByUsuarioId(clienteData.id);

                if(!result){
                    notify('error', {
                        params: {
                            title: 'Algo deu errado',
                            description: 'Tente novamente mais tarde'
                        }
                    });

                    return;
                }

                setEnderecos(result);
            }
        }

        getEnderecos();
    })

    const excluirEndereco = async (idEndereco: string) => {

    }


    return (
        <TelasPerfilLayout titulo='Endereços' descricao='Gerencie seus endereços para encontrar serviços e profissionais na sua região'>

            <Portal>
                <Dialog visible={dialogIsVisible} onDismiss={() => setDialogIsVisible(false)}>
                    <Dialog.Title>Confirmação</Dialog.Title>

                    <Dialog.Content>
                        <Text>Tem certeza que deseja excluir o endereço selecionado?</Text>

                        <Dialog.Actions style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{width: '45%'}} mode='outlined' onPress={() => {
                                excluirEndereco('')
                                setDialogIsVisible(false)
                            }}>Confirmar</Button>
                            <Button style={{width: '45%'}} mode='contained' onPress={() => setDialogIsVisible(false)}>Cancelar</Button>
                        </Dialog.Actions>
                    </Dialog.Content>
                </Dialog>
            </Portal>

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

                                        <Pressable onPress={() => setDialogIsVisible(true)}>
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

                <Button style={{marginBottom: 30}} mode="outlined" onPress={() => navigator.navigate('NovoEndereco')}>Cadastrar novo endereço</Button>
            </>
        </TelasPerfilLayout>
    );
}

export { Enderecos };