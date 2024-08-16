import { IAgendamentoFull } from "@/@types/databaseTypes";
import { Card, Text, TouchableRipple } from "react-native-paper";
import { styles } from "./styles";
import { View } from "react-native";
import { IconWithLabel } from "../IconLabel";

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { addHours, format } from "date-fns";
import { theme } from "@/theme/paper";
import { useNavigation } from "@react-navigation/native";
import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { StatusItem } from "../StatusItem";
import { toZonedTime, format as formatZonedTime, formatInTimeZone } from 'date-fns-tz';

function formatLocalTime(utcDateStr: string, formatStr: string = 'HH:mm'): string {
    // Cria um objeto Date a partir da string UTC
    const utcDate = new Date(utcDateStr);
  
    // Obtém o fuso horário local do sistema
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    // Converte a data UTC para o fuso horário local
    const zonedDate = toZonedTime(utcDate, timeZone);
  
    // Formata a data no fuso horário local de acordo com o formato especificado
    const formattedDate = formatInTimeZone(utcDate, timeZone, formatStr);

    console.log(formattedDate)
  
    return formattedDate;
  }

interface IServicoAgendamentoProps {
    data: IAgendamentoFull;
}

const ServicoAgendamento = ({ data }: IServicoAgendamentoProps) => {

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    return (
        <TouchableRipple style={{ width: '100%' }} onPress={() => navigator.navigate('DetalhesAgendamento', { idAgendamento: data.id })}>
            <View style={styles.container} >
                <Card.Cover style={styles.cover} source={{ uri: data.servico.foto }} />

                <View style={styles.containerContent}>
                    <Text style={styles.titulo} numberOfLines={1} variant='titleMedium'>{data.servico.procedimento.nome}</Text>

                    <View style={styles.containerIcons}>

                        <IconWithLabel
                            label={`${format(data.data_hora_inicio, 'dd/MM/yyyy')} - ${format(addHours(data.data_hora_inicio, 3), 'HH:mm')}`}
                            icon={<AntDesign name="clockcircleo" size={20} color={theme.colors.primary} />}
                        />

                        <IconWithLabel
                            // nome do profissional
                            label={data.profissional?.nome}
                            icon={<AntDesign name="user" size={24} color={theme.colors.primary} />}
                        />
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row', gap: 10, width: '100%' }}>
                        <StatusItem 
                            status={data.status}
                        />
                    </View>

                </View>
            </View>
        </TouchableRipple>
    );
}

export { ServicoAgendamento };