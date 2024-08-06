import React, { useState } from 'react';
import { View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, HelperText, TextInput } from 'react-native-paper';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';

import { CadastroLayout } from '@/layouts/CadastroLayout';
import { cadastro2Schema } from '@/validations/zod';
import { utils } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCadastro } from '@/hooks/useCadastro';
import { theme } from '@/theme/paper';
import { TAuthClienteNavigationRoutes } from '@/@types/routes/AuthRoutes';
import { notify } from 'react-native-notificated';

type TCadastro2Form = z.infer<typeof cadastro2Schema>;

const Cadastro2 = () => {
    const { handleDadosEndereco } = useCadastro(); // atualiza os dados do endereço
    const [isLoadingEndereco, setIsLoadingEndereco] = useState<boolean>(false); // indica se a tela está carregando enquanto busca pelo endereço via cep

    const { formState: { errors }, control, handleSubmit, setValue } = useForm<TCadastro2Form>({
        resolver: zodResolver(cadastro2Schema)
    });

    const navigator = useNavigation<TAuthClienteNavigationRoutes>();

    const onSubmit = (data: TCadastro2Form) => {
        //atualiza os dados do endereço e navega para a tela de cadastro 3
        handleDadosEndereco(data);
        navigator.navigate('Cadastro3');
    };

    const getEnderecoByCEP = async (cep: string) => {
        setIsLoadingEndereco(true);
        const endereco = await utils.getEnderecoByCEP(cep);

        if (typeof endereco === 'string') {
            notify('error', {
                params:{
                    title: 'Erro',
                    description: 'Digite um CEP válido!'
                }
            });
        } else {
            setValue('logradouro', endereco.logradouro);
            setValue('cidade', endereco.localidade);
            setValue('estado', endereco.uf);
            setValue('bairro', endereco.bairro);
        }

        setIsLoadingEndereco(false);
    };

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

            {isLoadingEndereco ? (
                <ActivityIndicator color={theme.colors.primary} animating />
            ) : (
                <>
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

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Controller
                            name='cidade'
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={{ flex: 1 }}>
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
                                <View style={{ flex: 1 }}>
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
                </>
            )}
        </CadastroLayout>
    );
};

export { Cadastro2 };
