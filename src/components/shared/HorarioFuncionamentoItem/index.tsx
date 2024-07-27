import { View } from 'react-native';

import { styles } from './styles';
import { IAgenda } from '@/@types/databaseTypes';
import { Text } from 'react-native-paper';
import { utils } from '@/utils';
import { useState } from 'react';
import { theme } from '@/theme/paper';

interface IHorarioFuncionamentItemProps {
    data: IAgenda
}

const HorarioFuncionamentoItem = ({ data }: IHorarioFuncionamentItemProps) => {
    const [diaSemanaAtual] = useState<number>(new Date().getDay());

    return (
        <View style={styles.container}>
            <Text style={[styles.diaSemana, diaSemanaAtual === data.dia_semana && { fontFamily: theme.fonts.semibold}]} variant='bodyMedium'>{utils.getDiaSemanaByNumero(data.dia_semana)}</Text>
            {!data.hora_fim && !data.hora_inicio ? (
                <Text  variant='bodyLarge'>Fechado</Text>
            ) : (
                <Text variant='bodyLarge'>{data.hora_inicio} - {data.hora_fim}</Text>
            )}
        </View>
    );
}

export { HorarioFuncionamentoItem };