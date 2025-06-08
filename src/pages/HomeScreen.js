import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import DroneAnimation from '../ui/components/DroneAnimation';
import { homeStyles as styles } from './HomeScreen.styles';

const HomeScreen = () => {
  const territories = [
    {
      name: 'Aldeia Jaraguá',
      location: 'São Paulo',
      image: require('../assets/img/image 2.png')
    },
    {
      name: 'Aldeia Guarani Nhandeva',
      location: 'São Paulo',
      image: require('../assets/img/image 3.png')
    },
    {
      name: 'Aldeia Parelheiros',
      location: 'São Paulo',
      image: require('../assets/img/image 5.png')
    },
    {
      name: 'Aldeia Guarani Mbya',
      location: 'São Paulo',
      image: require('../assets/img/image 6.png')
    },
    {
      name: 'Aldeia Yanomami',
      location: 'São Paulo',
      image: require('../assets/img/image 7.png')
    },
    {
      name: 'Aldeia Manga',
      location: 'São Paulo',
      image: require('../assets/img/image 8.png')
    },
    {
      name: 'Aldeia Guarani de Parnapuã',
      location: 'São Paulo',
      image: require('../assets/img/image 2.png')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Naurú Yvy" />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Animação do Drone */}
        <View style={styles.mapContainer}>
          <DroneAnimation 
            width={350}
            height={250}
            style={styles.droneAnimation}
          />
        </View>

        {/* Título Principal */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            Scanner de Solo via Drone para{'\n'}
            Monitoramento Ambiental em Territórios{'\n'}
            Indígenas.
          </Text>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Coleta em tempo real de informações topográficas e ambientais, contribuindo para a prevenção de desastres naturais como deslizamentos, erosão e degradação do solo.
          </Text>
          
          <Text style={styles.description}>
            Monitora as principais características do solo, oferecendo dados precisos sobre sua composição, umidade, declividade e estabilidade.
          </Text>
          
          <Text style={styles.description}>
            Através da integração de dados processados nos servidores, são obtidos relatórios interativo pelo aplicativo.
          </Text>
        </View>

        {/* Funcionalidades */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Principais funcionalidades:</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>
                Acesso em tempo real aos dados coletados pelo drone;
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>
                Registro manual de observações locais sobre solo, clima e impactos ambientais;
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>
                Visualização de mapas de risco gerados a partir da fusão dos dados automatizados e dos registros locais;
              </Text>
          </View>
          
            <View style={styles.featureItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>
                Análise automatizada por algoritmos, que classificam o nível de criticidade do solo e emitem alertas preventivos;
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>
                Sugestões de ações ou medidas de mitigação, baseadas em protocolos técnicos adaptados ao contexto local.
              </Text>
            </View>
          </View>
        </View>

        {/* Territórios Monitorados */}
        <View style={styles.territoriesSection}>
          <Text style={styles.territoriesTitle}>Territórios monitorados:</Text>
          
          {territories.map((territory, index) => (
            <View key={index} style={styles.territoryCard}>
              <View style={styles.territoryInfo}>
                <Text style={styles.territoryName}>{territory.name}</Text>
                <Text style={styles.territoryLocation}>{territory.location}</Text>
              </View>
              <View style={styles.territoryImageContainer}>
                <Image 
                  source={territory.image} 
                  style={styles.territoryImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen; 