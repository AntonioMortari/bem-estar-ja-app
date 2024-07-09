import { View } from 'react-native';
import { CadastroLayout } from '@/layouts/CadastroLayout';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { cadastro3Schema } from '@/validations/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HelperText, TextInput } from 'react-native-paper';
import { PasswordInput } from '@/components/shared/PasswordInput';

type TCadastro3FormData = z.infer<typeof cadastro3Schema>

const Cadastro3 = () => {
    const { handleSubmit, formState: { errors }, control } = useForm<TCadastro3FormData>({
        resolver: zodResolver(cadastro3Schema)
    });

    const onSubmit = (data: TCadastro3FormData) => {
        console.log(data);
    }

    return (
        <CadastroLayout
            title='Dados de Acesso'
            progress={0.8}
            onSubmit={handleSubmit(onSubmit)}
        >

            <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value } }) => (
                    <View>
                        <TextInput
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='Email'
                            keyboardType='email-address'
                            value={value}
                            onChangeText={onChange}
                        />

                        {errors.email?.message && (
                            <HelperText type='error'>
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
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='Senha'
                            value={value}
                            onChangeText={onChange}
                        />

                        {errors.senha?.message && (
                            <HelperText type='error'>
                                {errors.senha?.message}
                            </HelperText>
                        )}
                    </View>
                )}
            />

        </CadastroLayout>
    );
}

export { Cadastro3 };