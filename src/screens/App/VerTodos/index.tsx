import { IProfissionalFull, IServicoFull } from '@/@types/databaseTypes';
import { TAppClienteNavigationRoutes, TCategoriaNomeVerTodos } from '@/@types/routes/AppRoutes';
import { ProfissionalCardHorizontal } from '@/components/shared/ProfissionalCardHorizontal';
import { ServicoCardHorizontal } from '@/components/shared/ServicoCardHorizontal';
import { profissionalService } from '@/services/supabase/profissionalService';
import { servicoService } from '@/services/supabase/servicoService';
import { theme } from '@/theme/paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { styles } from './styles';
import { AntDesign } from '@expo/vector-icons';


interface RouteParams {
    categoriaNome: TCategoriaNomeVerTodos;
    cidade: string;
    estado: string;
}

interface VerTodosProps {
    route: {
        params: RouteParams;
    };
}

const VerTodos = ({ route }: any) => {

    const { categoriaNome, cidade, estado } = route.params;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    const [todosProfissionais, setTodosProfissionais] = useState<IProfissionalFull[]>([]);
    const [todosServicos, setTodosServicos] = useState<IServicoFull[]>([]);

    const getTodos = async () => {
        console.log('Passou')
        if (categoriaNome === 'Profissionais perto de você') {
            const result = await profissionalService.getAll();
            setTodosProfissionais(result);
            return;
        }

        const result = await servicoService.getByCategoriaNome(categoriaNome, cidade, estado);

        setTodosServicos(result);
    }

    useEffect(() => {
        setIsLoading(true);

        getTodos();

        setIsLoading(false)

    }, [categoriaNome]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableRipple onPress={() => navigator.goBack()} style={styles.buttonVoltar}>
                    <AntDesign name="arrowleft" size={30} color={theme.colors.dark} />
                </TouchableRipple>

                <Text variant='titleLarge'>{categoriaNome}{categoriaNome === 'Novidades' && ` em ${cidade}`}</Text>
            </View>

            <ScrollView contentContainerStyle={{ gap: 20 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={getTodos}
                    />
                }
            >
                {isLoading ? (
                    <View style={{flex: 1, alignItems :'center', justifyContent: 'center'}}>
                        <ActivityIndicator animating color={theme.colors.primary} />
                    </View>
                ) : (
                    <>
                        {todosServicos.length > 0 && (
                            todosServicos.map(servico => (
                                <ServicoCardHorizontal data={servico} key={servico.id} />
                            ))
                        )}

                        {todosProfissionais.length > 0 && (
                            todosProfissionais.map(profissional => (
                                <ProfissionalCardHorizontal data={profissional} key={profissional.id} />
                            ))
                        )}
                    </>
                )}
            </ScrollView>
        </View >
    );
}

export { VerTodos };