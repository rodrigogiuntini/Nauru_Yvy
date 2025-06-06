// Design System Tokens - SoloSano App
// Baseado no branding da Cainvest (https://cainvest.com)

export const Colors = {
  // Cores primárias
  primary: '#4CAF50',      // Verde principal
  primaryDark: '#388E3C',  // Verde escuro
  primaryLight: '#81C784', // Verde claro
  
  // Cores de background
  background: '#000000',   // Preto principal
  surface: '#1C1C1E',      // Cinza escuro
  surfaceLight: '#2C2C2E', // Cinza médio
  
  // Cores de texto
  textPrimary: '#FFFFFF',  // Branco
  textSecondary: '#8E8E93', // Cinza claro
  textTertiary: '#636366', // Cinza
  
  // Cores de status
  success: '#34C759',      // Verde sucesso
  warning: '#FF9500',      // Laranja warning
  error: '#FF3B30',        // Vermelho erro
  info: '#007AFF',         // Azul info
  
  // Cores específicas do app
  soilBrown: '#8B4513',    // Marrom solo
  waterBlue: '#007AFF',    // Azul água
  plantGreen: '#32CD32',   // Verde planta
  
  // Gradientes
  gradient: {
    primary: ['#4CAF50', '#388E3C'],
    background: ['#000000', '#1C1C1E'],
  }
};

export const Typography = {
  // Família de fontes
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  // Tamanhos de fonte
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Pesos de fonte
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Altura de linha
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  }
};

export const Spacing = {
  // Sistema de 8px
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 16,  // 16px
  lg: 24,  // 24px
  xl: 32,  // 32px
  '2xl': 48, // 48px
  '3xl': 64, // 64px
  '4xl': 80, // 80px
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  }
};

export const Layout = {
  // Dimensões padrão
  containerPadding: Spacing.md,
  headerHeight: 60,
  tabBarHeight: 80,
  
  // Breakpoints (para responsividade futura)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  }
}; 