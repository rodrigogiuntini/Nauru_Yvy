# 📁 Assets - SoloSano MVP

## 🎯 Visão Geral

A pasta `assets` centraliza todos os recursos estáticos e estilos do projeto SoloSano MVP, seguindo as diretrizes de qualidade para plataformas Web3/FinTech.

## 📂 Estrutura

```
src/assets/
├── styles/                    # Estilos separados e organizados
│   ├── index.js              # Exportações centralizadas
│   ├── global.styles.js      # Estilos globais reutilizáveis
│   ├── usage-examples.js     # Exemplos de uso
│   └── README.md             # Documentação dos estilos
└── README.md                 # Esta documentação
```

## 🎨 Sistema de Estilos

### ✅ Implementado

1. **Separação Completa**: Todos os estilos foram movidos para arquivos dedicados
2. **Estilos Globais**: Classes utilitárias para elementos comuns
3. **Importação Centralizada**: Sistema de exports organizados
4. **Documentação**: Guias e exemplos de uso
5. **Convenções**: Padrões de nomenclatura e estrutura

### 📁 Arquivos de Estilos Criados

**Componentes:**
- `Button.styles.js`
- `Card.styles.js` 
- `Header.styles.js`
- `Modal.styles.js`
- `LoadingSpinner.styles.js`

**Páginas:**
- `SplashScreen.styles.js`
- `WelcomeScreen.styles.js`
- `LoginScreen.styles.js`
- `RegisterScreen.styles.js`
- `HomeScreen.styles.js`
- `OccurrenceScreen.styles.js`
- `AlertsScreen.styles.js`
- `ProfileScreen.styles.js`

## 🚀 Como Usar

### Importação Individual
```javascript
import { headerStyles as styles } from './Header.styles';
```

### Importação Centralizada
```javascript
import { globalStyles, headerStyles } from '../../assets/styles';
```

### Estilos Globais
```javascript
import { globalStyles } from '../../assets/styles';

<View style={[globalStyles.container, globalStyles.center]}>
  <Text style={[globalStyles.textLg, globalStyles.fontBold]}>
    Texto com estilos globais
  </Text>
</View>
```

## 🎯 Benefícios

### 1. **Organização**
- ✅ Cada componente/página tem estilos dedicados
- ✅ Facilita localização e manutenção
- ✅ Reduz tamanho dos arquivos principais

### 2. **Reutilização**
- ✅ Classes utilitárias globais
- ✅ Consistência visual
- ✅ Redução de código duplicado

### 3. **Manutenibilidade**
- ✅ Mudanças isoladas por componente
- ✅ Facilita refatoração
- ✅ Melhor colaboração em equipe

### 4. **Performance**
- ✅ Carregamento otimizado
- ✅ Possibilidade de lazy loading
- ✅ Redução de bundle size

## 📚 Recursos Disponíveis

### Estilos Globais (170+ classes)
- **Layout**: containers, flexbox, positioning
- **Spacing**: margins, paddings (sistema 8px)
- **Typography**: tamanhos, pesos, cores
- **Colors**: backgrounds, status colors
- **Components**: buttons, cards, inputs
- **Utilities**: borders, shadows, opacity

### Exemplos Práticos
- Formulários completos
- Layouts responsivos
- Listas com status
- Grids organizados
- Combinações de estilos

## 🔧 Convenções

### Nomenclatura
- Arquivos: `ComponentName.styles.js`
- Exports: `componentNameStyles`
- Classes: camelCase descritivo

### Estrutura Padrão
```javascript
import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const componentStyles = StyleSheet.create({
  container: {
    // estilos
  },
});
```

## 🎨 Design System

Baseado no branding da **Cainvest** (https://cainvest.com):
- ✅ Cores primárias e secundárias
- ✅ Tipografia financeira
- ✅ Espaçamentos precisos (8px system)
- ✅ Modo escuro completo
- ✅ Padrão bancário/institucional

## 📈 Próximos Passos

1. **Temas Dinâmicos**: Múltiplos temas
2. **Responsive Design**: Breakpoints
3. **Animações**: Biblioteca de animações
4. **Otimização**: Tree-shaking de estilos

## 🔗 Referências

- [Design System Tokens](../ui/design-system/tokens.js)
- [Documentação de Estilos](./styles/README.md)
- [Exemplos de Uso](./styles/usage-examples.js)
- [Diretrizes de Qualidade](../../README.md) 