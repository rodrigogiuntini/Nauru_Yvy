import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import Card from '../ui/components/Card';
import Badge from '../ui/components/Badge';
import { useAlerts } from '../context/AlertsContext';
import { alertsStyles as styles } from './AlertsScreen.styles';

const AlertsScreen = ({ navigation }) => {
  const { alerts } = useAlerts();

  const getSeverityVariant = (severity) => {
    switch (severity.toLowerCase()) {
      case 'alta':
        return 'error';
      case 'média':
        return 'warning';
      case 'baixa':
        return 'success';
      default:
        return 'default';
    }
  };

  const groupedAlerts = alerts.reduce((groups, alert) => {
    const group = alert.time;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(alert);
    return groups;
  }, {});

  const handleAlertPress = (alert) => {
    console.log('Alert pressed:', alert);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Alertas"
        showBackButton
        navigation={navigation}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedAlerts).map(([timeGroup, groupAlerts]) => (
          <View key={timeGroup} style={styles.timeGroup}>
            <Text style={styles.timeGroupTitle}>{timeGroup}</Text>
            
            {groupAlerts.map((alert) => (
              <Card
                key={alert.id}
                style={styles.alertCard}
                onPress={() => handleAlertPress(alert)}
              >
                <View style={styles.alertContent}>
                  <View style={styles.alertLeft}>
                    <View style={styles.alertIconContainer}>
                      <Text style={styles.alertIcon}>{alert.icon}</Text>
                    </View>
                    
                    <View style={styles.alertInfo}>
                      <View style={styles.alertHeader}>
                        <Badge
                          variant={getSeverityVariant(alert.severity)}
                          size="small"
                        >
                          {alert.severity}
                        </Badge>
                      </View>
                      
                      <Text style={styles.alertTitle}>{alert.type}</Text>
                      <Text style={styles.alertDetails}>{alert.description}</Text>
                      {alert.location && (
                        <Text style={styles.alertLocation}>📍 {alert.location}</Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.alertRight}>
                    <View style={styles.alertImageContainer}>
                      <Text style={styles.alertImage}>{alert.icon}</Text>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        ))}
        
        {/* Espaço extra no final para evitar que o último item fique muito próximo do tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertsScreen; 