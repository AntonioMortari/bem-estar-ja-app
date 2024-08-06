import { IEndereco } from "@/@types/databaseTypes";
import { TAuthClienteNavigationRoutes } from "@/@types/routes/AuthRoutes";
import { useAuth } from "@/hooks/useAuth";
import { TelasPerfilLayout } from "@/layouts/TelasPerfilLayout";
import { enderecoService } from "@/services/supabase/enderecoService";
import { theme } from "@/theme/paper";
import { utils } from "@/utils";
import { novoEnderecoSchema } from "@/validations/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { notify } from "react-native-notificated";
import { ActivityIndicator, Button, HelperText, TextInput } from "react-native-paper";
import { z } from "zod";

type TNovoEnderecoFormData = z.infer<typeof novoEnderecoSchema>;


const NovoEndereco = () => {
    const { clienteData, setClienteData } = useAuth();
    const [isLoadingEndereco, setIsLoadingEndereco] = useState<boolean>(false); // indica se a tela está carregando enquanto busca pelo endereço via cep

    const { formState: { errors }, control, handleSubmit, setValue } = useForm<TNovoEnderecoFormData>({
        resolver: zodResolver(novoEnderecoSchema)
    });

    const navigator = useNavigation<TAuthClienteNavigationRoutes>();

    const onSubmit = async(data: TNovoEnderecoFormData) => {
        if (clienteData) {
            const result = await enderecoService.create({
                ...data,
                usuario_id: clienteData.id
            });

            if (typeof result === 'string') {
                notify('error', {
                    params: {
                        title: 'Erro ao criar endereço',
                        description: 'Tente novamente mais tarde'
                    }
                })

                return;
            }


            setClienteData({
                ...clienteData,
                enderecos: [...clienteData.enderecos, result]
            });

            notify('success', {
                params: {
                    title: 'Endereço cadastrado com sucesso'
                }
            });
            
            navigator.goBack();
        }

    };

    const getEnderecoByCEP = async (cep: string) => {
        setIsLoadingEndereco(true);
        const endereco = await utils.getEnderecoByCEP(cep);

        if (typeof endereco === 'string') {
            notify('error', {
                params: {
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
        <TelasPerfilLayout titulo='Novo Endereço'>
            <View style={{ gap: 15 }}>
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

                <Button mode="contained" onPress={handleSubmit(onSubmit)}>Cadastrar</Button>
            </View>
        </TelasPerfilLayout>
    );
}

export { NovoEndereco };