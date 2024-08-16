import { SafeAreaView, ScrollView, View } from "react-native";
import { theme } from "@/theme/paper";
import { Searchbar, Text, SegmentedButtons, ActivityIndicator } from "react-native-paper";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { ServicoCardHorizontal } from "@/components/shared/ServicoCardHorizontal";
import { IFavorito, IFavoritoFull, IServicoFull } from "@/@types/databaseTypes";
import { favoritoService } from "@/services/supabase/favoritoService";
import { useAuth } from "@/hooks/useAuth";
import { ProfissionalCardHorizontal } from "@/components/shared/ProfissionalCardHorizontal";

const Favoritos = () => {
  const [value, setValue] = useState<string>('servicos');
  const { clienteData } = useAuth()
  const [servicos, setServicos] = useState<IFavoritoFull[]>([]);
  const [profissionais, setProfissionais] = useState<IFavoritoFull[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);


  /* puxa os serviços */
  const getServicoData = async () => {
    try {
      if (clienteData) {
        const result = await favoritoService.getServicosFavoritos(clienteData.id);
        if (result) {
          setServicos(result);
        }
      }
    } catch (error) {
      console.error('Error fetching favorite services:', error);
    }

  };

  /* puxa o profisional */
  const getProfissionalData = async () => {
    try {
      if (clienteData) {
        const result = await favoritoService.getProfissionaisFavoritos(clienteData.id);
        if (result) {
          setProfissionais(result);
        }
      }
    } catch (error) {
      console.error('Error fetching favorite services:', error);
    }

  };


  useEffect(() => {
    setIsLoading(true);
    getServicoData();
    getProfissionalData();

    setIsLoading(false);
  }, [clienteData]);




  return (

    <>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator animating color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.containerHeader}>

            <Text variant="headlineMedium" style={[styles.titulo, { color: theme.colors.light }]}>
              Meus Favoritos
            </Text>

          </View>

          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            style={styles.containerSegmentos}
            buttons={[
              {
                value: 'servicos',
                label: 'Serviços',
              },
              {
                value: 'profissionais',
                label: 'Profissionais',
              }
            ]}
          />
          <View style={styles.containerConteudo}>
            {value === 'servicos' ? (
              <>
                {servicos.length > 0 ? (
                  <>
                    {servicos.map(({ servico }) => {
                      if (servico) {
                        return (
                          <ServicoCardHorizontal data={servico} key={servico.id} />
                        )
                      }
                    })}
                  </>
                ) : (
                  <Text style={{ textAlign: 'center' }}>Você ainda não favoritou nenhum serviço</Text>

              )}

              </>
            ) : (
              <>
                {profissionais.length > 0 ? (
                  <>
                    {profissionais.map(({ profissional }) => {
                      if (profissional) {
                        return (
                          <ProfissionalCardHorizontal data={profissional} key={profissional.id + 11} />
                        )
                      }
                    })}
                  </>
                ) : (
                  <Text style={{ textAlign: 'center' }}>Você ainda não favoritou nenhum profissional</Text>
                )}

              </>
            )}
          </View>

        </ScrollView>
      )}
    </>

  );
};




export { Favoritos };
