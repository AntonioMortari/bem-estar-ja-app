import { TelasPerfilLayout } from "@/layouts/TelasPerfilLayout";
import { Pressable, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import DatePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from "react";
import { format } from "date-fns";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { z } from "zod";
import { informacoesPessoaisSchema } from "@/validations/zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { clienteService } from "@/services/supabase/clienteService";
import { notify } from "react-native-notificated";
import { useNavigation } from "@react-navigation/native";
import { TAppClienteNavigationRoutes } from "@/@types/routes/AppRoutes";

type TInformacoesPesoaisForm = z.infer<typeof informacoesPessoaisSchema>;


const InformacoesPessoais = () => {
    const { clienteData, userData, setClienteData } = useAuth();

    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const navigator = useNavigation<TAppClienteNavigationRoutes>();

    const [dataNascimento, setDataNascimento] = useState<Date | undefined>(clienteData?.data_nascimento);

    const { control, formState: { errors }, handleSubmit } = useForm<TInformacoesPesoaisForm>({
        resolver: zodResolver(informacoesPessoaisSchema),
        defaultValues: {
            nome: clienteData?.nome,
        }
    })



    const handleDate = (e: DateTimePickerEvent, newDate: Date | undefined) => {
        if (e.type == 'set' && newDate) {
            setDataNascimento(newDate);
        }
        setShowPicker(false);
    };

    const onSubmit = async (data: TInformacoesPesoaisForm) => {
        console.log('PASSOW')
        if (userData && clienteData) {
            const result = await clienteService.update(userData.id, data);

            if (typeof result === 'string') {
                notify('error', {
                    params: {
                        title: 'Erro ao atualizar os dados',
                        description: 'Tente novamente mais tarde'
                    }
                })
                return;
            }

            setIsEditing(false);
            setClienteData({
                ...clienteData,
                nome: data.nome,
                data_nascimento: dataNascimento || clienteData.data_nascimento
            });
            navigator.goBack();

            notify('success', {
                params: {
                    title: 'Dados Atualizados com sucesso!'
                }
            })

        }
    }

    return (
        <TelasPerfilLayout titulo='Informações Pessoais' descricao='Altere seu nome, data de nascimento e outras informações relacionadas ao seu perfil.'>
            <>
                <View>
                    <Controller
                        // campo de nome
                        control={control}
                        name='nome'
                        render={({ field: { onChange, value } }) => (
                            <View>

                                <TextInput
                                    mode='flat'
                                    style={{ backgroundColor: 'transparent' }}
                                    label='Nome Completo'
                                    value={value}
                                    disabled={isEditing ? false : true}
                                    onChangeText={(text) => onChange(
                                        text
                                            .toLowerCase()
                                            .split(' ')
                                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                            .join(' ')
                                    )}
                                />

                                {errors.nome?.message && (
                                    <HelperText type='error' visible={true} padding='none'>
                                        {errors.nome?.message}
                                    </HelperText>
                                )}

                            </View>
                        )}
                    />

                    <TextInput
                        mode='flat'
                        style={{ backgroundColor: 'transparent' }}
                        label='CPF'
                        value={clienteData?.cpf}
                        disabled
                    />

                    {dataNascimento && (
                        <Pressable onPress={() => setShowPicker(true)}>
                            {/* pressable para datepicker */}

                            <TextInput
                                disabled={isEditing ? false : true}
                                mode='flat'
                                style={{ backgroundColor: 'transparent' }}
                                label='Data de Nascimento'
                                value={format(dataNascimento, 'dd/MM/yyyy')}
                                editable={false}
                            />

                            {showPicker && (
                                <DatePicker
                                    mode='date'
                                    value={dataNascimento}
                                    onChange={handleDate}
                                    maximumDate={new Date()}
                                    display='spinner'
                                />
                            )}
                        </Pressable>
                    )}

                </View>

                <View style={{ gap: 10 }}>
                    <Text variant='titleMedium' style={{ marginTop: 30 }}>Dados de Acesso</Text>

                    <TextInput
                        disabled
                        mode='flat'
                        style={{ backgroundColor: 'transparent' }}
                        label='Email'
                        keyboardType='email-address'
                        value={userData?.email || ''}
                    // onChangeText={onChange}
                    />

                </View>

                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                    {isEditing ? (
                        <>
                            <Button style={{ width: '45%' }} onPress={() => setIsEditing(false)} mode="outlined">Cancelar</Button>
                            <Button style={{ width: '45%' }} onPress={handleSubmit(onSubmit)} mode="contained">Salvar</Button>
                        </>
                    ) : (
                        <Button onPress={() => setIsEditing(true)} style={{ width: '100%' }} mode='contained'>Editar</Button>

                    )}
                </View>


            </>
        </TelasPerfilLayout >
    );
}

export { InformacoesPessoais };