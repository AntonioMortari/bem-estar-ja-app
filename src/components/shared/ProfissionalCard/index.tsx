import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import {IProfissionalFull } from '@/@types/databaseTypes';
import { styles } from './styles';
import { IconWithLabel } from '../IconLabel';
import { theme } from '@/theme/paper';

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Stars from '../Stars';


interface IProfissionalCardProps {
    data: IProfissionalFull;
    onPress: () => void;
}

const ProfissionalCard = ({ data, onPress }: IProfissionalCardProps) => {
    return (
        <Card
            elevation={3}
            style={styles.container}
        >
            <Card.Cover style={styles.cover} src={data.foto_perfil} />

            <Card.Title title={data.nome} titleVariant='titleMedium' />
            <Card.Content>

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

                <View style={{ marginTop: 15 }}>
                    <Button mode='contained' onPress={onPress}>Ver Perfil</Button>
                </View>


            </Card.Content>

        </Card>
    );
}

export { ProfissionalCard };