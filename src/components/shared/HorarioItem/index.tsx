import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { styles } from './styles';
import { theme } from '@/theme/paper';

interface IHorarioItemProps {
    horario: string;
    isSelected?: boolean;
    onPress?: () => void;
    disabled?: boolean;
}

const HorarioItem = ({ horario, isSelected = false, onPress, disabled = false }: IHorarioItemProps) => {
    return (
        <TouchableRipple
            style={[styles.container, isSelected && styles.isSelected, disabled && styles.disabled]} 
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={isSelected && { color: theme.colors.light}}>{horario}</Text>
        </TouchableRipple>
    );
}

export { HorarioItem };