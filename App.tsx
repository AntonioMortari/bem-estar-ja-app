import 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';

import { PaperProvider, Text } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as SplashScreen from 'expo-splash-screen';

import { theme } from '@/theme/paper';
import { AuthContextProvider } from '@/contexts/Auth';
import { Router } from '@/routes';

import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts
} from '@expo-google-fonts/montserrat';
import { CadastroContextProvider } from '@/contexts/Cadastro';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return;
  }

  SplashScreen.hideAsync();

  return (
    <AuthContextProvider>
      <CadastroContextProvider>
        <PaperProvider theme={theme}>
          <View style={styles.statusBarHeight}>
            <Router />
          </View>
        </PaperProvider>
      </CadastroContextProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  statusBarHeight: {
    marginTop: getStatusBarHeight() + 5,
    flex: 1,
  }
});
