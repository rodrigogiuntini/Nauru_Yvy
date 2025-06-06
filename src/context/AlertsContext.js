import React, { createContext, useContext, useState } from 'react';

const AlertsContext = createContext();

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts deve ser usado dentro de AlertsProvider');
  }
  return context;
};

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'Corte Ilegal de Árvores',
      location: 'Floresta Amazônica - Setor Norte',
      severity: 'Alta',
      time: 'Hoje',
      description: 'Detecção de atividade de corte não autorizada',
      status: 'active',
      icon: '🌳',
      color: '#FF4444'
    },
    {
      id: '2',
      type: 'Poluição da Água',
      location: 'Rio Principal - km 45',
      severity: 'Média',
      time: 'Ontem',
      description: 'Níveis anormais de poluentes detectados',
      status: 'investigating',
      icon: '💧',
      color: '#FF8800'
    },
    {
      id: '3',
      type: 'Mineração Irregular',
      location: 'Área Protegida Sul',
      severity: 'Alta',
      time: 'Hoje',
      description: 'Atividade de mineração não autorizada',
      status: 'active',
      icon: '⛏️',
      color: '#FF4444'
    },
    {
      id: '4',
      type: 'Incêndio Florestal',
      location: 'Mata Atlântica - Reserva Central',
      severity: 'Baixa',
      time: 'Ontem',
      description: 'Foco de incêndio controlado',
      status: 'resolved',
      icon: '🔥',
      color: '#44AA44'
    }
  ]);

  const addAlert = (newAlert) => {
    const alert = {
      id: Date.now().toString(),
      time: 'Agora',
      status: 'active',
      ...newAlert,
    };
    
    setAlerts(prevAlerts => [alert, ...prevAlerts]);
    return alert;
  };

  const updateAlert = (id, updates) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, ...updates } : alert
      )
    );
  };

  const removeAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const getAlertsBySeverity = (severity) => {
    return alerts.filter(alert => alert.severity === severity);
  };

  const getAlertsByStatus = (status) => {
    return alerts.filter(alert => alert.status === status);
  };

  const createAlertFromOccurrence = (occurrence) => {
    const typeMapping = {
      'deforestation': {
        type: 'Desmatamento Detectado',
        icon: '🌳',
        color: '#FF4444'
      },
      'illegal_mining': {
        type: 'Mineração Ilegal',
        icon: '⛏️',
        color: '#FF8800'
      },
      'poaching': {
        type: 'Caça Ilegal',
        icon: '🦌',
        color: '#FF6600'
      },
      'pollution': {
        type: 'Poluição Detectada',
        icon: '🏭',
        color: '#AA4444'
      },
      'fire': {
        type: 'Incêndio Florestal',
        icon: '🔥',
        color: '#FF2222'
      }
    };

    const alertConfig = typeMapping[occurrence.type] || {
      type: 'Ocorrência Ambiental',
      icon: '⚠️',
      color: '#FFAA00'
    };

    const severityColors = {
      'Baixa': '#44AA44',
      'Média': '#FFAA00',
      'Alta': '#FF4444'
    };

    const newAlert = {
      type: alertConfig.type,
      location: occurrence.location,
      severity: occurrence.severity,
      description: occurrence.description,
      icon: alertConfig.icon,
      color: severityColors[occurrence.severity] || alertConfig.color,
      source: 'occurrence'
    };

    return addAlert(newAlert);
  };

  const value = {
    alerts,
    addAlert,
    updateAlert,
    removeAlert,
    getAlertsBySeverity,
    getAlertsByStatus,
    createAlertFromOccurrence,
  };

  return (
    <AlertsContext.Provider value={value}>
      {children}
    </AlertsContext.Provider>
  );
}; 