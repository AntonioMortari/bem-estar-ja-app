import { DefaultTheme, configureFonts } from 'react-native-paper';

const baseFont = {
    fontFamily: 'Montserrat_400Regular',
} as const;

const baseVariants = configureFonts({ config: baseFont });

const customVariants = {
    displayMedium: {
        ...baseVariants.displayMedium,
        fontFamily: 'Montserrat_400Regular',
    },

    bold: {
        ...baseVariants.bodyMedium,
        fontFamily: 'Montserrat_700Bold',
    },
    semibold: {
        ...baseVariants.bodyMedium,
        fontFamily: 'Montserrat_600SemiBold',
    },
    regular: {
        ...baseVariants.bodyMedium,
        fontFamily: 'Montserrat_400Regular'
    },
} as const;


const fonts = configureFonts({
    config: {
        ...baseVariants,
        ...customVariants,
    },
});

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#00928C',
        primaryLight: '#1CB8B1',
        primaryDark: '#007873',
        secondary: '#F5ED60',
        secondaryLight: '#FFF99B',
        secondaryDark: '#CFC632',
        light: '#FFF',
        lightDark: '#F7F4F3',
        dark: '#2C2C34',
        darkLight: '#555559',
        danger: '#CC1C0C',
        success: '#05F140',
        gray: '#9ca3af',
        grayLight: '#d1d5db',
        grayDark: '#6b7280',
        star: '#FFA41C',
        outline: '#00928C',
        warning: '#FFD700',
        heart: '#FF003D'
    },
    fonts:{
        ...fonts,
        semibold: 'Montserrat_600SemiBold',
        bold: 'Montserrat_700Bold'
    }
}

export { theme };