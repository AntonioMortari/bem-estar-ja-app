
import { View } from 'react-native';
import { Button, Card, Text, TouchableRipple } from 'react-native-paper';

import { IServicoFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { styles } from './styles';
import { IconWithLabel } from '../IconLabel';
import { theme } from '@/theme/paper';

// icons
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


interface IServicoCardProps {
    data: IServicoFull;
    onPress?: () => void;
}

const ServicoCard = ({ data, onPress }: IServicoCardProps) => {
    const navigation = useNavigation<TAppClienteNavigationRoutes>();

    const goToDetalhesServico = () => {
        navigation.navigate('DetalhesServico', { idServico: data.id })
    }

    const goToAgendarServico = () => {
        navigation.navigate('AgendarServico', { idServico: data.id })
    }

    return (
        <TouchableRipple onPress={() => onPress ? onPress() : goToDetalhesServico()}>
            <Card
                elevation={3}
                style={styles.container}
            >
                <Card.Cover style={styles.cover} src={data.foto} />

                <Card.Title title={data.procedimento?.nome} titleVariant='titleMedium' />
                <Card.Content>

                    <View style={styles.containerIcons}>

                        <IconWithLabel
                            // duração
                            label={`${data.procedimento?.duracao} minutos`}
                            icon={<AntDesign name="clockcircleo" size={20} color={theme.colors.primary} />}
                        />

                        <IconWithLabel
                            // localização
                            label={`${data.endereco?.cidade}, ${data.endereco?.estado}`}
                            icon={<FontAwesome6 name="location-dot" size={20} color={theme.colors.primary} />}
                        />

                        <IconWithLabel
                            // nome do profissional
                            label={data.profissional?.nome}
                            icon={<AntDesign name="user" size={24} color={theme.colors.primary} />}
                        />
                    </View>

                    {/* Preço */}
                    <Text variant='titleLarge' style={{ marginTop: 10 }}>R${data.procedimento?.preco}</Text>

                    {/* container botões */}
                    <View style={{ marginTop: 15, flexDirection: 'row', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Button mode='outlined' onPress={() => onPress ? onPress() : goToDetalhesServico()}>Detalhes</Button>
                        <Button mode='contained' onPress={goToAgendarServico}>Agendar</Button>
                    </View>


                </Card.Content>

            </Card>
        </TouchableRipple>
    );
}

export { ServicoCard };