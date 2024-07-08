import 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';

import { PaperProvider, Text } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as SplashScreen from 'expo-splash-screen';

import { theme } from './src/theme/paper';
import { AuthContextProvider } from './src/contexts/Auth';

import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts
} from '@expo-google-fonts/montserrat';


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
      <PaperProvider theme={theme}>
        <View style={styles.statusBarHeight}>
          <Text variant='titleLarge'>Olá, Mundo!</Text>
        </View>
      </PaperProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  statusBarHeight: {
    marginTop: getStatusBarHeight() + 5,
    flex: 1,
  }
});
