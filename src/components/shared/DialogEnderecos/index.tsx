import { IEndereco } from '@/@types/databaseTypes'
import { } from 'react-native'
import { Dialog, Divider, Portal, RadioButton } from 'react-native-paper';

interface IDialogEnderecosProps {
    enderecos?: IEndereco[];
    isVisible: boolean;
    onDimiss: () => void;
    onValueChange: (value: string) => Promise<void>;
    value: string;
}

const DialogEnderecos = ({ enderecos, isVisible, onDimiss, onValueChange, value }: IDialogEnderecosProps) => {
    return (
        <Portal>
            <Dialog visible={isVisible} onDismiss={onDimiss}>
                <Dialog.Title>Escolha seu endereço</Dialog.Title>
                <Divider />

                <Dialog.Content>
                    <RadioButton.Group onValueChange={value => onValueChange(value)} value={value}>
                        {enderecos && (
                            <>
                                <RadioButton.Item label="Localização Atual" value="localizacaoAtual" />
                                {enderecos.map(endereco => {
                                    return (
                                        <RadioButton.Item key={endereco.id} label={`${endereco.cep}, ${endereco.cidade}, ${endereco.estado}`} value={endereco.id} />
                                    )
                                })}
                            </>
                        )}
                    </RadioButton.Group>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

export { DialogEnderecos };