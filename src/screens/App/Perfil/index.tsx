import { useAuth } from '@/hooks/useAuth';
import { Avatar, Button, Text } from 'react-native-paper';
import { Linking, View } from 'react-native';
import { styles } from './styles';
import { format } from 'date-fns';
import { theme } from '@/theme/paper';
import { PerfilLinkItem } from '@/components/shared/PerfilLinkItem';

// icones
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { TAppClienteNavigationRoutes } from '@/@types/routes/AppRoutes';


const Perfil = () => {
    const { handleLogout, clienteData, userData } = useAuth();

    const navigator = useNavigation<TAppClienteNavigationRoutes>();



    return (
        <View>

            <View style={styles.header}>

                <View style={styles.containerTitulo}>
                    {clienteData?.foto_perfil ? (
                        <Avatar.Image source={{ uri: clienteData.foto_perfil }} />
                    ) : (
                        <Avatar.Text style={{ backgroundColor: '#D9D9D9' }} color={theme.colors.grayDark} label={`${clienteData?.nome[0]}${clienteData?.nome.split(' ')[1][0]}`} />
                    )}

                    <View>
                        <Text style={styles.nome} variant='headlineSmall'>{clienteData?.nome}</Text>

                        {/* <Text variant='bodyMedium'>{format(userData?.created_at, '')}</Text> */}
                    </View>
                </View>
            </View>

            <View style={styles.containerOpcoes}>
                <PerfilLinkItem
                    label='Informações Pessoais'
                    icon={<Ionicons name="person" size={24} color={theme.colors.primary} />}
                    onPress={() => navigator.navigate('InformacoesPessoais')}
                />

                {/* <PerfilLinkItem
                    label='Dados de Acesso'
                    icon={<MaterialCommunityIcons name="key" size={24} color={theme.colors.primary} />}
                    onPress={() => navigator.navigate('DadosAcesso')}
                /> */}

                <PerfilLinkItem
                    label='Endereços'
                    icon={<Octicons name="home" size={24} color={theme.colors.primary} />}
                    onPress={() => navigator.navigate('Enderecos')}
                />

                <PerfilLinkItem
                    label='Perguntas Frequentes'
                    icon={<AntDesign name="questioncircleo" size={24} color={theme.colors.primary} />}
                    onPress={() => navigator.navigate('PerguntasFrequentes')}
                />

                <PerfilLinkItem
                    label='Ajuda e Suporte'
                    icon={<MaterialIcons name="support-agent" size={24} color={theme.colors.primary} />}
                    onPress={async() => {
                        await Linking.openURL('https://wa.me/5519992276384?text=Olá,%20preciso%20de%20ajuda.')
                    }}
                    
                />
            </View>

            <Button mode='outlined' style={{ width: '90%', margin: 'auto', marginTop: 30 }} onPress={handleLogout}>Sair</Button>

            <Text variant='bodySmall' style={styles.legenda}>Desenvolvido por @Antonio Mortari
                Idealizado por Camila Anjo e Karina Teles
                © 2024 Bem-Estar Já</Text>

        </View>
    );
}

export { Perfil };