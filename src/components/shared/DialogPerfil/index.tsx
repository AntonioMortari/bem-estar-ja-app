import { Pressable, View } from 'react-native';
import { Image } from 'react-native';
import { Avatar, Dialog, Portal } from 'react-native-paper';
import { styles } from './styles';
import { theme } from '@/theme/paper';
import { AntDesign } from '@expo/vector-icons';

interface IDialogPerfilProps {
    isVisible: boolean;
    onDimiss: () => void;
    foto: string;
}

const DialogPerfil = ({ foto, isVisible, onDimiss }: IDialogPerfilProps) => {
    return (
        <Portal>
            <Dialog visible={isVisible} onDismiss={onDimiss}>


                <Dialog.Content style={{ padding: 0 }}>

                    <Pressable onPress={onDimiss} style={{ alignSelf: 'flex-end', marginBottom: 5 }}>
                        <AntDesign name='close' size={24} color={theme.colors.dark} />
                    </Pressable>

                    <View style={styles.containerImage}>
                        <Avatar.Image size={230} source={{ uri: foto }} />
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

export { DialogPerfil };