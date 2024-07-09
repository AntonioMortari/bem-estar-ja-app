import { View } from 'react-native';
import { useEffect, useState } from 'react';

import { loginSchema } from '@/validations/zod';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme/paper';
import { PasswordInput } from '@/components/shared/PasswordInput';
import { styles } from './styles';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TAuthClienteNavigationRoutes } from '@/@types/routes/AuthRoutes';

type TLoginFormData = z.infer<typeof loginSchema> // tipagem dos dados com base no schema de login

const Login = () => {
    const { handleLogin } = useAuth();
    const navigation = useNavigation<TAuthClienteNavigationRoutes>();

    const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false);

    const { formState: { errors }, handleSubmit, control } = useForm<TLoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = ({ email, senha}: TLoginFormData) => {
        handleLogin(email, senha);
    }

    const goCadastro = () => {
        // função que navega para a tela de cadastro
        navigation.navigate('Cadastro1');
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerImage}>
                <Image
                    source={require('@/images/logo.png')}
                    style={styles.image}
                />
            </View>

            <View style={styles.containerForm}>

                <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <TextInput
                                mode='outlined'
                                placeholder='Digite seu email'
                                label='Email'
                                left={<TextInput.Icon color={theme.colors.grayDark} icon='email' />}
                                onChangeText={onChange}
                                value={value}
                                style={{ backgroundColor: 'transparent' }}
                            />
                            {errors.email?.message && (
                                <HelperText type='error' visible={true} padding='none'>
                                    {errors.email?.message}
                                </HelperText>
                            )}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name='senha'
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <PasswordInput
                                mode='outlined'
                                placeholder='Digite sua senha'
                                left={<TextInput.Icon icon='key' color={theme.colors.grayDark} />}
                                label='Senha'
                                onChangeText={onChange}
                                value={value}
                                style={{ backgroundColor: 'transparent' }}
                            />

                            {errors.senha?.message && (
                                <HelperText type='error' visible={true} padding='none'>
                                    {errors.senha?.message}
                                </HelperText>
                            )}
                        </View>
                    )}
                />

                <Button
                    mode='contained'
                    onPress={handleSubmit(onSubmit)}
                    loading={buttonIsLoading}
                    style={{ marginTop: 30 }}
                >
                    Acessar
                </Button>

                <Button
                    mode='text'
                    onPress={goCadastro}
                >
                    <Text style={{ color: theme.colors.dark }}>Não tem uma conta?</Text>  Cadastre-se!
                </Button>
            </View>

        </View>
    );
}

export { Login }; 