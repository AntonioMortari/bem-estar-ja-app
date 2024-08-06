import { TelasPerfilLayout } from "@/layouts/TelasPerfilLayout";
import { Pressable, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from "react";
import { Button, Dialog, Divider, Portal, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { useAuth } from "@/hooks/useAuth";
import Feather from '@expo/vector-icons/Feather';
import { theme } from "@/theme/paper";



const Enderecos = () => {
    const { clienteData } = useAuth();

    const [dialogIsVisible, setDialogIsVisible] = useState<boolean>(false);

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

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
                {clienteData?.enderecos && clienteData?.enderecos.length > 0 ? (
                    <>
                        <View style={styles.containerEnderecos}>

                            {clienteData?.enderecos.map(endereco => (
                                <>
                                    <View style={styles.enderecoItemContainer}>
                                        <View>
                                            <Text variant='titleMedium' numberOfLines={1} style={{ width: '80%' }}>{endereco.logradouro}</Text>
                                            <Text variant='titleMedium'>{endereco.cep}</Text>
                                            <Text variant='titleMedium'>{endereco.cidade}, {endereco.estado}</Text>
                                        </View>

                                        <Pressable onPress={() => setDialogIsVisible(true)}>
                                            <Feather name="trash-2" size={24} color={theme.colors.grayDark} />
                                        </Pressable>


                                    </View>

                                    <Divider />
                                </>
                            ))}

                        </View>
                    </>
                ) : (
                    <>
                        <Text variant='titleMedium' style={{ textAlign: 'center' }}>Nenhum endereço cadastrado</Text>
                    </>
                )}

                <Button mode="outlined" onPress={() => navigator.navigate('NovoEndereco')}>Cadastrar novo endereço</Button>
            </>
        </TelasPerfilLayout>
    );
}

export { Enderecos };