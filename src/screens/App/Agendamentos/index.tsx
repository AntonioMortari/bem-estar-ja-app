import { Text } from "react-native-paper"


const Agendamentos = () => {
    return (
        <Text variant='titleLarge'>Agendamentos</Text>

        // ao agendar, o agendamento ficará com status: Aguardando pagamento
        // Na tela de agendamentos, será listado todos os que o cliente fez
        // cada um terá um botão: enviar comprovante, que, ao ser clicado, redireciona para o whatsapp e troca o status do pedido para: Agendado
    );
}

export { Agendamentos };