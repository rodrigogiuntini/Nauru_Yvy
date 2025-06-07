import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { soilStyles as styles } from './SoilScreen.styles';

const SoilScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Análise de Solo" />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mapa do Brasil */}
        <View style={styles.mapContainer}>
          <View style={styles.brazilMap}>
            <Text style={styles.mapIcon}>🇧🇷</Text>
          </View>
        </View>

        {/* Territórios Monitorados */}
        <View style={styles.territorySection}>
          <Text style={styles.territoryTitle}>Territórios monitorados:</Text>
          
          <View style={styles.territoryCard}>
            <View style={styles.territoryInfo}>
              <Text style={styles.territoryDetail}>Tipo: Argiloso</Text>
              <Text style={styles.territoryDetail}>Umidade: 25%</Text>
              <Text style={styles.territoryDetail}>Textura: Fina</Text>
              <Text style={styles.territoryDetail}>Retenção de água: Alta</Text>
              <Text style={styles.territoryDetail}>Fertilidade: Moderada</Text>
              <Text style={styles.territoryDetail}>Drenagem: Boa</Text>
            </View>
            <View style={styles.soilImageContainer}>
              <View style={styles.soilImage}>
                <Text style={styles.soilImagePlaceholder}>🌍</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Métricas - Primeira linha */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, styles.metricBlue]}>
            <Text style={styles.metricIcon}>💧</Text>
            <Text style={styles.metricLabel}>Umidade</Text>
            <Text style={styles.metricValue}>25%</Text>
          </View>
          
          <View style={[styles.metricCard, styles.metricYellow]}>
            <Text style={styles.metricIcon}>🌡️</Text>
            <Text style={styles.metricLabel}>Temperatura</Text>
            <Text style={styles.metricValue}>23°C</Text>
          </View>
        </View>

        {/* Métricas - Segunda linha */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, styles.metricGreen]}>
            <Text style={styles.metricIcon}>🧪</Text>
            <Text style={styles.metricLabel}>pH</Text>
            <Text style={styles.metricValue}>6.8</Text>
          </View>
          
          <View style={[styles.metricCard, styles.metricRed]}>
            <Text style={styles.metricIcon}>🌿</Text>
            <Text style={styles.metricLabel}>Nutrientes</Text>
            <Text style={styles.metricValue}>Baixo</Text>
          </View>
        </View>

        {/* Análise Recente */}
        <View style={styles.analysisSection}>
          <Text style={styles.analysisTitle}>Análise Recente:</Text>
          
          {/* Linha do Tempo de Alertas */}
          <View style={styles.analysisCard}>
            <Text style={styles.analysisCardTitle}>Linha do Tempo de Alertas</Text>
            <Text style={styles.analysisNumber}>12</Text>
            <Text style={styles.analysisSubtitle}>Últimos 7 dias</Text>
            <View style={styles.chartPlaceholder}>
              {/* Simulação de gráfico com barras */}
              <View style={styles.chartBars}>
                <View style={[styles.chartBar, { height: 30 }]} />
                <View style={[styles.chartBar, { height: 45 }]} />
                <View style={[styles.chartBar, { height: 25 }]} />
                <View style={[styles.chartBar, { height: 55 }]} />
                <View style={[styles.chartBar, { height: 35 }]} />
                <View style={[styles.chartBar, { height: 40 }]} />
                <View style={[styles.chartBar, { height: 50 }]} />
              </View>
            </View>
          </View>

          {/* Solo por Tipo */}
          <View style={styles.analysisCard}>
            <Text style={styles.analysisCardTitle}>Solo por Tipo</Text>
            <Text style={styles.analysisPercentage}>85%</Text>
            <Text style={styles.analysisSubtitle}>Últimos 30 dias</Text>
            <View style={styles.barChartContainer}>
              <View style={[styles.barChart, { width: '60%' }]} />
              <View style={[styles.barChart, { width: '85%' }]} />
              <View style={[styles.barChart, { width: '45%' }]} />
            </View>
          </View>

          {/* Risco Ambiental */}
          <View style={styles.analysisCard}>
            <Text style={styles.analysisCardTitle}>Risco Ambiental</Text>
            <Text style={styles.riskStatus}>Estável</Text>
            <Text style={styles.analysisSubtitle}>Próximos 7 dias</Text>
            <View style={styles.riskBars}>
              <View style={styles.riskBar}>
                <Text style={styles.riskLabel}>Baixo</Text>
                <View style={styles.riskProgress}>
                  <View style={[styles.riskFill, { width: '80%' }]} />
                </View>
              </View>
              <View style={styles.riskBar}>
                <Text style={styles.riskLabel}>Médio</Text>
                <View style={styles.riskProgress}>
                  <View style={[styles.riskFill, { width: '60%' }]} />
                </View>
              </View>
              <View style={styles.riskBar}>
                <Text style={styles.riskLabel}>Alto</Text>
                <View style={styles.riskProgress}>
                  <View style={[styles.riskFill, { width: '30%' }]} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SoilScreen; 