import { View } from 'react-native';
import { TouchableRipple, Card, Text, Button } from 'react-native-paper';
import { styles } from './styles';
import { IServicoFull } from '@/@types/databaseTypes';
import { IconWithLabel } from '../IconLabel';

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@/theme/paper';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';

interface IServicoCardHorizontalProps {
    data: IServicoFull;
}

const ServicoCardHorizontal = ({ data }: IServicoCardHorizontalProps) => {

    const navigation = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <TouchableRipple onPress={() => navigation.navigate('DetalhesServico', { idServico: data.id })} style={{ width: '100%' }}>
            <View style={styles.container} >
                <Card.Cover style={styles.cover} source={{ uri: data.foto }} />

                <View style={styles.containerContent}>
                    <Text style={styles.titulo} numberOfLines={1} variant='titleMedium'>{data.procedimento?.nome}</Text>

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

                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Button style={{transform: [{scale: .8}]}} mode='outlined' onPress={() => navigation.navigate('DetalhesServico', { idServico: data.id })}>Detalhes</Button>
                        <Button style={{transform: [{scale: .8}]}} mode='contained'>Agendar</Button>
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );
}

export { ServicoCardHorizontal };