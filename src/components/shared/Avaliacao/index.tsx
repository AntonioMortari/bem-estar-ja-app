
import { View } from 'react-native';
import { styles } from './styles';
import { Avatar, Text } from 'react-native-paper';
import { theme } from '@/theme/paper';
import { format } from 'date-fns';
import { ScrollView } from 'react-native-gesture-handler';
import Stars from '../Stars';

interface IAvaliacaoProps {
    clienteData: {
        foto?: string;
        nome: string;
        nota: number;
        avaliacao: string;
        data: Date;
    }
}

const Avaliacao = ({ clienteData }: IAvaliacaoProps) => {
    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>

                {clienteData.foto ? (
                    <Avatar.Image source={{ uri: clienteData.foto }} size={32} />
                ): (
                    <Avatar.Text label={clienteData.nome[0]} size={32}/>
                )}

                <View style={styles.containerNome}>
                    <Text style={{fontFamily: theme.fonts.semibold}}>{clienteData.nome}</Text>

                    <Stars stars={Number(clienteData.nota)} showNumber={false} />
                </View>
            </View>

            <View style={styles.conteudo}>
                <Text style={styles.data}>{format(clienteData.data, "dd 'de' MMMM 'de' yyyy")}</Text>

                <Text variant='bodyMedium' style={styles.avaliacao}>{clienteData.avaliacao}</Text>
            </View>

        </ScrollView>
    );
}

export { Avaliacao };