import { IAgendamentoFull } from "@/@types/databaseTypes";
import { Card, Text, TouchableRipple } from "react-native-paper";
import { styles } from "./styles";
import { View } from "react-native";
import { IconWithLabel } from "../IconLabel";

import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { format } from "date-fns";
import { theme } from "@/theme/paper";
import { useNavigation } from "@react-navigation/native";
import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";
import { StatusItem } from "../StatusItem";

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
                            label={`${format(data.data_hora_inicio, 'dd/MM/yyyy')} - ${format(data.data_hora_inicio, 'HH:mm')}`}
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