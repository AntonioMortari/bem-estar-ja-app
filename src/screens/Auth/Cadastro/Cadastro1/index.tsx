import { Pressable, View } from 'react-native';

import { CadastroLayout } from '@/layouts/CadastroLayout';
import { cadastro1Schema } from '@/validations/zod';
import { utils } from '@/utils';
import { TAuthClienteNavigationRoutes } from '@/@types/routes/AuthRoutes';

import { HelperText, RadioButton, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

type TCadastro1FormData = z.infer<typeof cadastro1Schema>

const Cadastro1 = () => {
    const [dataNascimento, setDataNascimento] = useState<Date>(new Date());
    const [genero, setGenero] = useState<'F' | 'M' | 'O'>('F');

    const [showPicker, setShowPicker] = useState<boolean>(false);

    const { formState: { errors }, handleSubmit, control } = useForm<TCadastro1FormData>({
        resolver: zodResolver(cadastro1Schema)
    });
    const navigator = useNavigation<TAuthClienteNavigationRoutes>();

    const handleDate = (e: DateTimePickerEvent, newDate: Date | undefined) => {
        if (e.type == 'set' && newDate) {
            setDataNascimento(newDate);
        }
        setShowPicker(false);
    };

    const onSubmit = (data: TCadastro1FormData) => {
        console.log(data);
        navigator.navigate('Cadastro2');
    }

    return (
        <CadastroLayout
            title='Dados Pessoais'
            onSubmit={handleSubmit(onSubmit)}
            progress={0.3}
        >

            <Controller
            // campo de cpf
                control={control}
                name='cpf'
                render={({ field: { onChange, value } }) => (
                    <View>
                        <TextInput
                            mode='flat'
                            style={{ backgroundColor: 'transparent' }}
                            label='CPF'
                            keyboardType='numeric'
                            value={value}
                            onChangeText={(text) => onChange(utils.formatCPF(text))}
                        />

                        {errors.cpf && (
                            <HelperText type='error' visible={true} padding='none'>
                                {errors.cpf?.message}
                            </HelperText>
                        )}
                    </View>
                )}
            />

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

            <Pressable onPress={() => setShowPicker(true)}>
                {/* pressable para datepicker */}

                <TextInput
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

            <View>
                <Text variant='bodyLarge'>Gênero</Text>
                {/* Radio buttons pra selecionar gênero */}

                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="F"
                            status={genero === 'F' ? 'checked' : 'unchecked'}
                            onPress={() => setGenero('F')}
                        />
                        <Text variant='bodyMedium'>Feminino</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="M"
                            status={genero === 'M' ? 'checked' : 'unchecked'}
                            onPress={() => setGenero('M')}
                        />
                        <Text variant='bodyMedium'>Masculino</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value="O"
                            status={genero === 'O' ? 'checked' : 'unchecked'}
                            onPress={() => setGenero('O')}
                        />
                        <Text variant='bodyMedium'>Outro</Text>
                    </View>
                </View>

            </View>

        </CadastroLayout>
    );
}

export { Cadastro1 };