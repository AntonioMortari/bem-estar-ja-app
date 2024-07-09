import { ReactNode } from 'react';
import { View } from 'react-native';

import { theme } from '@/theme/paper';
import { styles } from './styles';

import { Button, ProgressBar, Text } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


interface ICadastroLayoutProps {
    children: ReactNode
    title: string;
    onSubmit: (data: any) => void;
    progress: number;
}

const CadastroLayout = ({ children, title, onSubmit, progress }: ICadastroLayoutProps) => {
    const navigator = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <ProgressBar progress={progress} style={{ backgroundColor: `${theme.colors.primary}23`, borderRadius: 5 }} />

            <View style={styles.header}>

                <AntDesign onPress={() => navigator.goBack()} name="arrowleft" size={36} color={theme.colors.dark} />

                <Text variant='headlineLarge' style={{ color: theme.colors.primary, marginTop: 20 }}>Bem-Vindo (a)</Text>

                <Text variant='bodyLarge'>Faça seu cadastro e aproveite tudo o que o nosso aplicativo tem a oferecer!</Text>

            </View>

            <Text variant='titleLarge'>{title}</Text>

            <View style={styles.containerForm}>

                {children}

            </View>

            <View style={styles.containerButtons}>
                <Button mode='outlined' style={{ borderColor: theme.colors.primary, width: '40%' }} onPress={() => navigator.goBack()}>
                    Voltar
                </Button>

                <Button mode='contained' style={{ width: progress < 0.9 ? '40%': 'auto' }} onPress={onSubmit}>
                    {progress < 0.9 ? 'Avançar': 'Concluir cadastro'}
                </Button>
            </View>
        </ScrollView>
    );
}

export { CadastroLayout };