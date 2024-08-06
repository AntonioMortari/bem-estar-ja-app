import { IEndereco } from '@/@types/databaseTypes'
import { useAuth } from '@/hooks/useAuth';
import { enderecoService } from '@/services/supabase/enderecoService';
import { useEffect, useState } from 'react';
import { } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Dialog, Divider, Portal, RadioButton } from 'react-native-paper';

interface IDialogEnderecosProps {
    enderecos?: IEndereco[];
    isVisible: boolean;
    onDimiss: () => void;
    onValueChange: (value: string) => Promise<void>;
    value: string;
}

const DialogEnderecos = ({ enderecos, isVisible, onDimiss, onValueChange, value }: IDialogEnderecosProps) => {
    const { clienteData } = useAuth();
    const [enderecosUsuario, setEnderecosUsuario] = useState<IEndereco[]>([]);

    useEffect(() => {
        const getEnderecos = async () => {
            if (clienteData) {

                const result = await enderecoService.getEnderecoByUsuarioId(clienteData.id);

                if (result) {
                    setEnderecosUsuario(result);
                }
            }
        }

        getEnderecos();
    }, [clienteData]);

    return (
        <Portal>
            <Dialog visible={isVisible} onDismiss={onDimiss}>
                <Dialog.Title>Escolha seu endereço</Dialog.Title>
                <Divider />

                <Dialog.Content>

                    <ScrollView style={{maxHeight: 300}}>

                        <RadioButton.Group onValueChange={value => onValueChange(value)} value={value}>
                            {enderecosUsuario && (
                                <>
                                    <RadioButton.Item label="Localização Atual" value="localizacaoAtual" />
                                    {enderecosUsuario.map(endereco => {
                                        return (
                                            <RadioButton.Item key={endereco?.id} label={`${endereco?.cep}, ${endereco?.cidade}, ${endereco?.estado}`} value={endereco?.id} />
                                        )
                                    })}
                                </>
                            )}
                        </RadioButton.Group>

                    </ScrollView>

                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

export { DialogEnderecos };