import { TelasPerfilLayout } from '@/layouts/TelasPerfilLayout';
import { theme } from '@/theme/paper';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, Text } from 'react-native-paper';


const PerguntasFrequesntes = () => {
    return (
        <TelasPerfilLayout titulo='Perguntas Frequentes' descricao='Aqui você encontrará respostas para as dúvidas mais comuns sobre nosso aplicativo e serviços. Esta área foi criada para ajudar a resolver suas questões de forma rápida e eficiente.'>
            <ScrollView style={{marginBottom: 30}}>


                <List.Accordion title='Como encontrar um profissional?' style={{ backgroundColor: theme.colors.light, borderRadius: 8, marginTop: 20 }}>
                    <Text variant='bodyLarge' style={{textAlign: 'justify', marginTop: 10, paddingHorizontal: 10}}>Para encontrar um profissional de estética, siga estes passos: {'\n'}
                        - Abra o aplicativo e vá para a seção de busca. {'\n'}
                        - Insira sua localização ou permita que o aplicativo acesse sua localização atual. {'\n'}
                        - Faça sua pesquisa e explore os profissionais disponíveis {'\n'}
                    </Text>
                </List.Accordion>

                <List.Accordion title='Como faço para agendar um serviço?' style={{ backgroundColor: theme.colors.light, borderRadius: 8, marginTop: 20 }}>
                    <Text variant='bodyLarge' style={{textAlign: 'justify', marginTop: 10, paddingHorizontal: 10}}>Para encontrar um profissional de estética, siga estes passos: {'\n'}
                        Após encontrar um profissional, selecione o serviço desejado e escolha a data e o horário que melhor se adequam à sua agenda. Confirme o agendamento e siga as instruções para realizar o pagamento.
                    </Text>
                </List.Accordion>

                <List.Accordion title='Quais formas de pagamento são aceitas?' style={{ backgroundColor: theme.colors.light, borderRadius: 8, marginTop: 20 }}>
                    <Text variant='bodyLarge' style={{textAlign: 'justify', marginTop: 10, paddingHorizontal: 10}}>O pagamento pode ser feito através do aplicativo ou você pode optar por pagar diretamente ao profissional. Após o pagamento, você precisará enviar o comprovante via WhatsApp para confirmar seu agendamento.
                    </Text>
                </List.Accordion>

                <List.Accordion title='E se eu não conseguir enviar o comprovante de pagamento?' style={{ backgroundColor: theme.colors.light, borderRadius: 8, marginTop: 20 }}>
                    <Text variant='bodyLarge' style={{textAlign: 'justify', marginTop: 10, paddingHorizontal: 10}}>Caso tenha problemas para enviar o comprovante via WhatsApp, entre em contato com o suporte do aplicativo. Nossa equipe estará pronta para ajudar a resolver qualquer problema.
                    </Text>
                </List.Accordion>

                <List.Accordion title=' Como posso avaliar um serviço?' style={{ backgroundColor: theme.colors.light, borderRadius: 8, marginTop: 20 }}>
                    <Text variant='bodyLarge' style={{textAlign: 'justify', marginTop: 10, paddingHorizontal: 10}}>Após a conclusão do serviço, você poderá avaliar o profissional diretamente pelo aplicativo, deixando uma nota e um comentário sobre sua experiência.
                    </Text>
                </List.Accordion>
                
                <List.Accordion title=' Como encontrar suporte?' style={{ backgroundColor: theme.colors.light, borderRadius: 8, marginTop: 20 }}>
                    <Text variant='bodyLarge' style={{textAlign: 'justify', marginTop: 10, paddingHorizontal: 10}}>Para mais informações ou suporte, acesse Perfil {'->'} Ajuda e Suporte.
                    </Text>
                </List.Accordion>



            </ScrollView>
        </TelasPerfilLayout>
    );
}

export { PerguntasFrequesntes };