import { SafeAreaView, View } from "react-native";
import { theme } from "@/theme/paper";
import { Searchbar, Text, SegmentedButtons } from "react-native-paper";
import { styles } from "./styles";
import React from "react";

const Favoritos = () => {
  return (
    


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
    
  );
};

const ServicosEProfissionais = () => {
    const [value, setValue] = React.useState('boolean');

    return (
        <SafeAreaView style={styles.containerSegmentos}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'Serviços',
                label: 'Serviços',
              },
              {
                value: 'Profissionais',
                label: 'Profissionais',
              }
            ]}
          />
        </SafeAreaView>
      );
    };



export { Favoritos, ServicosEProfissionais };
