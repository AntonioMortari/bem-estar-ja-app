import { View } from 'react-native';

import { CadastroLayout } from '@/layouts/CadastroLayout';
import { cadastro2Schema } from '@/validations/zod';
import { utils } from '@/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { HelperText, TextInput } from 'react-native-paper';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import { TAuthClienteNavigationRoutes } from '@/@types/routes/AuthRoutes';

type TCadastro2Form = z.infer<typeof cadastro2Schema>

const Cadastro2 = () => {
    const { formState: { errors }, control, handleSubmit, setValue } = useForm<TCadastro2Form>({
        resolver: zodResolver(cadastro2Schema)
    });
    const navigator = useNavigation<TAuthClienteNavigationRoutes>();

    const onSubmit = (data: TCadastro2Form) => {
        console.log(data);
        navigator.navigate('Cadastro3');
    }

    const getEnderecoByCEP = async(cep: string) => {
        const endereco = await utils.getEnderecoByCEP(cep);

        if(typeof endereco === 'string'){
            // tratar erro caso não encontre o endereço
            console.log('CEP inválido!')
        }else{
            setValue('logradouro', endereco.logradouro);
            setValue('cidade', endereco.localidade);
            setValue('estado', endereco.uf);
            setValue('bairro', endereco.bairro);
        }
    }

    return (
        <CadastroLayout
            title='Endereço'
            progress={0.6}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name='cep'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='CEP'
                            keyboardType='numeric'
                            onBlur={onBlur}
                            onChangeText={(text: string) => {
                                onChange(text);
                                if (text.length === 8) {
                                    getEnderecoByCEP(text);
                                }
                            }}
                            value={value}
                        />

                        {errors.cep?.message && (
                            <HelperText type='error'>
                                {errors.cep?.message}
                            </HelperText>
                        )}
                    </View>
                )}
            />

            <Controller
                name='logradouro'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='Logradouro'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />

                        {errors.logradouro?.message && (
                            <HelperText type='error'>
                                {errors.logradouro?.message}
                            </HelperText>
                        )}
                    </View>
                )}
            />

            <Controller
                name='bairro'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='Bairro'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />

                        {errors.bairro?.message && (
                            <HelperText type='error'>
                                {errors.bairro?.message}
                            </HelperText>
                        )}
                    </View>
                )}
            />

            <View style={{ width: '100%', gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Controller
                    name='cidade'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{ flex: .9 }}>
                            <TextInput
                                mode='flat'
                                style={{ backgroundColor: 'transparent' }}
                                label='Cidade'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                editable={false}
                            />

                            {errors.cidade?.message && (
                                <HelperText type='error'>
                                    {errors.cidade?.message}
                                </HelperText>
                            )}
                        </View>
                    )}
                />
                <Controller
                    name='estado'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={{ flex: .9 }}>
                            <TextInput
                                mode='flat'
                                style={{ backgroundColor: 'transparent' }}
                                label='Estado'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                editable={false}
                            />

                            {errors.estado?.message && (
                                <HelperText type='error'>
                                    {errors.estado?.message}
                                </HelperText>
                            )}
                        </View>
                    )}
                />
            </View>

            <Controller
                name='numero'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='Número'
                            keyboardType='numeric'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />

                        {errors.numero?.message && (
                            <HelperText type='error'>
                                {errors.numero?.message}
                            </HelperText>
                        )}
                    </View>
                )}
            />

            <Controller
                name='complemento'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='Complemento'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />

                        {errors.complemento?.message && (
                            <HelperText type='error'>
                                {errors.complemento?.message}
                            </HelperText>
                        )}
                    </View>
                )}
            />
        </CadastroLayout>
    )
}

export { Cadastro2 };