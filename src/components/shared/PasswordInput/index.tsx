import { useState } from 'react';
import { TextInput } from 'react-native-paper';

import { theme } from '@/theme/paper';

interface PasswordInputProps extends React.ComponentProps<typeof TextInput> { }

const PasswordInput = ({ ...rest }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (

        <TextInput
            {...rest}
            secureTextEntry={!showPassword}
            right={
                <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    color={theme.colors.grayDark}
                    onPress={() => setShowPassword(!showPassword)}
                />
            }
        />
    )


}

export { PasswordInput }