import { IProfissionalFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Card, Text, TouchableRipple } from 'react-native-paper';
import { styles } from './styles';

import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { IconWithLabel } from '../IconLabel';
import { theme } from '@/theme/paper';
import Stars from '../Stars';

interface IProfissionalCardHorizontalProps {
    data: IProfissionalFull;
}

const ProfissionalCardHorizontal = ({ data }: IProfissionalCardHorizontalProps) => {

    console.log(data)
        ;
    const navigation = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <TouchableRipple onPress={() => navigation.navigate('PerfilProfissional', { idProfissional: data.id })} style={{ width: '100%' }}>
            <View style={styles.container} >
                <Card.Cover style={styles.cover} source={{ uri: data.foto_perfil }} />

                <View style={styles.containerContent}>
                    <Text style={styles.titulo} numberOfLines={1} variant='titleMedium'>{data.nome}</Text>

                    <View style={styles.containerIcons}>

                        {/* TODO: verificar se o profissional é novo ou bem avaliado */}
                        {/* <IconWithLabel
                        label='Novo'
                        icon={<AntDesign name="star" size={20} color={theme.colors.primary} />}
                    /> */}

                        <IconWithLabel
                            // localização
                            label='Campinas, SP'
                            icon={<FontAwesome6 name="location-dot" size={20} color={theme.colors.primary} />}
                        />

                        <IconWithLabel
                            // área de atuação
                            label={data.area_atuacao.nome}
                            icon={<MaterialIcons name="work" size={24} color={theme.colors.primary} />}
                        />

                        <Stars
                            showNumber
                            stars={4.5}
                        />
                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', gap: 10, width: '100%' }}>
                        <Button style={{ transform: [{ scale: .9 }], width: '70%' }} mode='contained' onPress={() => navigation.navigate('PerfilProfissional', { idProfissional: data.id })}>Ver Perfil</Button>
                    </View>

                </View>
            </View>
        </TouchableRipple>
    );
}

export { ProfissionalCardHorizontal };