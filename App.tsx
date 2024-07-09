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
import { createNotifications, useNotifications } from 'react-native-notificated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const { NotificationsProvider } = createNotifications({
    defaultStylesSettings: {
      errorConfig: {
        titleColor: theme.colors.dark,
        titleFamily: 'Montserrat_600SemiBold',
        descriptionFamily: 'Montserrat_400Regular',
        accentColor: theme.colors.danger,
        leftIconSource: <AntDesign name="exclamationcircleo" size={24} color={theme.colors.danger} />,
      },
      warningConfig: {
        titleColor: theme.colors.dark,
        titleFamily: 'Montserrat_600SemiBold',
        descriptionFamily: 'Montserrat_400Regular',
        accentColor: theme.colors.warning,
        leftIconSource: <AntDesign name="warning" size={24} color={theme.colors.warning} />,
      }
    }
  });

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
    <GestureHandlerRootView style={{flex: 1}}>
      <NotificationsProvider>
        <AuthContextProvider>
          <CadastroContextProvider>
            <PaperProvider theme={theme}>
              <View style={styles.statusBarHeight}>
                <Router />
              </View>
            </PaperProvider>
          </CadastroContextProvider>
        </AuthContextProvider>
      </NotificationsProvider>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  statusBarHeight: {
    marginTop: getStatusBarHeight() + 5,
    flex: 1,
  }
});
