import { SafeAreaView, View } from "react-native";
import { theme } from "@/theme/paper";
import { Searchbar, Text, SegmentedButtons } from "react-native-paper";
import { styles } from "./styles";
import { useEffect, useState } from "react";
// import { ProfissionalCardHorizontal } from "@/components/shared/ProfissionalCardHorizontal";
import { ServicoCardHorizontal } from "@/components/shared/ServicoCardHorizontal";
import { IServicoFull } from "@/@types/databaseTypes";

const Favoritos = () => {
  const [value, setValue] = useState<string>('servicos');

  const [servicos, setServicos] = useState<IServicoFull[]>([]);

  const ServicoCardHorizontal = async () => {}



  //   useEffect(() => {
      
  //   }, [])
  // }


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerHeader}>

        <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
          Meus Favoritos
        </Text>

        <View style={styles.containerBusca}>
          <Searchbar
            style={styles.inputBusca}
            placeholder="Faça sua pesquisa"
            elevation={3}
            placeholderTextColor={theme.colors.gray}
            value={""}
          />
        </View>

      </View>

      <SegmentedButtons
        value={value}
        onValueChange={setValue}
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

      <View>

        {/* <ServicoCardHorizontal data={}/> */}

      </View>

      {/* <View>

        <ProfissionalCardHorizontal />
     
      </View> */}


      


        {/* titulo da categoia */}
      {value === 'servicos' ? (
        <View>
          <Text>Serviços</Text>
        </View>
      ) : (
        <Text>Profissionais</Text>
      )}

    </View>

  );
};




export { Favoritos };
