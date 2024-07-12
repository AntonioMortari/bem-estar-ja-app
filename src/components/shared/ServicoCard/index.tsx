
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { IServicoFull, IServicos } from '@/@types/databaseTypes';
import { styles } from './styles';
import { IconWithLabel } from '../IconLabel';
import { theme } from '@/theme/paper';

// icons
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


interface IServicoCardProps {
    data: IServicoFull;
}

const ServicoCard = ({ data }: IServicoCardProps) => {
    return (
        <Card
            elevation={3}
            style={styles.container}
        >
            <Card.Cover style={styles.cover} src={data.foto} />

            <Card.Title title={data.procedimento.nome} titleVariant='titleMedium' />
            <Card.Content>

                <View style={styles.containerIcons}>

                    <IconWithLabel
                    // duração
                        label={`${data.procedimento.duracao} minutos`}
                        icon={<AntDesign name="clockcircleo" size={20} color={theme.colors.primary} />}
                    />

                    <IconWithLabel
                    // localização
                        label='Campinas, SP'
                        icon={<FontAwesome6 name="location-dot" size={20} color={theme.colors.primary} />}
                    />

                    <IconWithLabel
                    // nome do profissional
                        label={data.profissional.nome}
                        icon={<AntDesign name="user" size={24} color={theme.colors.primary} />}
                    />
                </View>

                {/* Preço */}
                <Text variant='titleLarge' style={{ marginTop: 10 }}>R${data.procedimento.preco}</Text>

                {/* container botões */}
                <View style={{ marginTop: 15, flexDirection: 'row', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Button mode='outlined'>Detalhes</Button>
                        <Button mode='contained'>Agendar</Button>
                </View>


            </Card.Content>

        </Card>
    );
}

export { ServicoCard };