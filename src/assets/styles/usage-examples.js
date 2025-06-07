/**
 * 📚 EXEMPLOS DE USO - Estilos Separados
 * 
 * Este arquivo demonstra como usar a nova estrutura de estilos
 * separados no projeto Naurú Yvy MVP.
 */

// ========================================
// 1. IMPORTAÇÃO DE ESTILOS INDIVIDUAIS
// ========================================

// Componente com estilos próprios
import React from 'react';
import { View, Text } from 'react-native';
import { headerStyles as styles } from '../ui/components/Header.styles';

const ExampleHeader = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Título</Text>
  </View>
);

// ========================================
// 2. IMPORTAÇÃO CENTRALIZADA
// ========================================

import { 
  globalStyles, 
  headerStyles, 
  cardStyles 
} from '../assets/styles';

const ExampleWithCentralized = () => (
  <View style={[globalStyles.container, globalStyles.center]}>
    <View style={cardStyles.container}>
      <Text style={[globalStyles.textLg, globalStyles.fontBold]}>
        Card com estilos centralizados
      </Text>
    </View>
  </View>
);

// ========================================
// 3. COMBINAÇÃO DE ESTILOS GLOBAIS
// ========================================

import { globalStyles } from '../assets/styles';

const ExampleGlobalStyles = () => (
  <View style={[
    globalStyles.container,
    globalStyles.paddingMd,
    globalStyles.bgSurface
  ]}>
    {/* Header */}
    <View style={[globalStyles.row, globalStyles.spaceBetween]}>
      <Text style={[
        globalStyles.textLg,
        globalStyles.fontSemibold,
        globalStyles.textPrimary
      ]}>
        Título da Página
      </Text>
      <Text style={[
        globalStyles.textSm,
        globalStyles.textSecondary
      ]}>
        Subtítulo
      </Text>
    </View>

    {/* Content */}
    <View style={[
      globalStyles.card,
      globalStyles.marginMd,
      globalStyles.shadow
    ]}>
      <Text style={[
        globalStyles.textBase,
        globalStyles.textCenter
      ]}>
        Conteúdo do card
      </Text>
    </View>

    {/* Buttons */}
    <View style={[globalStyles.row, globalStyles.spaceAround]}>
      <View style={[
        globalStyles.button,
        globalStyles.buttonPrimary,
        globalStyles.flex1,
        globalStyles.marginSm
      ]}>
        <Text style={[
          globalStyles.textBase,
          globalStyles.fontMedium,
          globalStyles.textPrimary
        ]}>
          Botão Primário
        </Text>
      </View>
      
      <View style={[
        globalStyles.button,
        globalStyles.buttonOutline,
        globalStyles.flex1,
        globalStyles.marginSm
      ]}>
        <Text style={[
          globalStyles.textBase,
          globalStyles.fontMedium,
          globalStyles.textSecondary
        ]}>
          Botão Outline
        </Text>
      </View>
    </View>
  </View>
);

// ========================================
// 4. FORMULÁRIO COM ESTILOS GLOBAIS
// ========================================

import { globalStyles } from '../assets/styles';
import { TextInput, TouchableOpacity } from 'react-native';

const ExampleForm = () => (
  <View style={[
    globalStyles.container,
    globalStyles.paddingXl
  ]}>
    {/* Form Header */}
    <Text style={[
      globalStyles.text2xl,
      globalStyles.fontBold,
      globalStyles.textCenter,
      globalStyles.marginLg
    ]}>
      Formulário de Exemplo
    </Text>

    {/* Input Fields */}
    <TextInput
      style={[
        globalStyles.input,
        globalStyles.marginMd
      ]}
      placeholder="Nome completo"
      placeholderTextColor="#666"
    />

    <TextInput
      style={[
        globalStyles.input,
        globalStyles.marginMd
      ]}
      placeholder="Email"
      placeholderTextColor="#666"
    />

    {/* Submit Button */}
    <TouchableOpacity style={[
      globalStyles.button,
      globalStyles.buttonPrimary,
      globalStyles.marginLg,
      globalStyles.shadow
    ]}>
      <Text style={[
        globalStyles.textBase,
        globalStyles.fontSemibold,
        globalStyles.textPrimary
      ]}>
        Enviar
      </Text>
    </TouchableOpacity>
  </View>
);

// ========================================
// 5. LISTA COM STATUS COLORS
// ========================================

import { globalStyles } from '../assets/styles';

const ExampleStatusList = () => {
  const items = [
    { id: 1, title: 'Sucesso', status: 'success' },
    { id: 2, title: 'Aviso', status: 'warning' },
    { id: 3, title: 'Erro', status: 'error' },
    { id: 4, title: 'Info', status: 'info' },
  ];

  return (
    <View style={[globalStyles.container, globalStyles.paddingMd]}>
      {items.map(item => (
        <View key={item.id} style={[
          globalStyles.card,
          globalStyles.row,
          globalStyles.spaceBetween,
          globalStyles.marginSm
        ]}>
          <Text style={[
            globalStyles.textBase,
            globalStyles.fontMedium
          ]}>
            {item.title}
          </Text>
          
          <View style={[
            globalStyles.paddingSm,
            globalStyles.borderRadiusSm,
            globalStyles[`bg${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`]
          ]}>
            <Text style={[
              globalStyles.textSm,
              globalStyles.fontMedium,
              globalStyles[`status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`]
            ]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// ========================================
// 6. GRID LAYOUT RESPONSIVO
// ========================================

import { globalStyles } from '../assets/styles';

const ExampleGrid = () => (
  <View style={[globalStyles.container, globalStyles.paddingMd]}>
    <View style={[globalStyles.row, globalStyles.spaceBetween]}>
      <View style={[
        globalStyles.card,
        globalStyles.center,
        { width: '48%', aspectRatio: 1 }
      ]}>
        <Text style={[globalStyles.textLg, globalStyles.fontBold]}>1</Text>
      </View>
      
      <View style={[
        globalStyles.card,
        globalStyles.center,
        { width: '48%', aspectRatio: 1 }
      ]}>
        <Text style={[globalStyles.textLg, globalStyles.fontBold]}>2</Text>
      </View>
    </View>
    
    <View style={[globalStyles.row, globalStyles.spaceBetween, globalStyles.marginMd]}>
      <View style={[
        globalStyles.card,
        globalStyles.center,
        { width: '48%', aspectRatio: 1 }
      ]}>
        <Text style={[globalStyles.textLg, globalStyles.fontBold]}>3</Text>
      </View>
      
      <View style={[
        globalStyles.card,
        globalStyles.center,
        { width: '48%', aspectRatio: 1 }
      ]}>
        <Text style={[globalStyles.textLg, globalStyles.fontBold]}>4</Text>
      </View>
    </View>
  </View>
);

export {
  ExampleHeader,
  ExampleWithCentralized,
  ExampleGlobalStyles,
  ExampleForm,
  ExampleStatusList,
  ExampleGrid
}; 