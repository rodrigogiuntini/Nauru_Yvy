import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Importando as páginas
import SplashScreen from './src/pages/SplashScreen';
import WelcomeScreen from './src/pages/WelcomeScreen';
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import ForgotPasswordScreen from './src/pages/ForgotPasswordScreen';
import HomeScreen from './src/pages/HomeScreen';
import SoilScreen from './src/pages/SoilScreen';
import OccurrenceScreen from './src/pages/OccurrenceScreen';
import AlertsScreen from './src/pages/AlertsScreen';
import AlertDetailScreen from './src/pages/AlertDetailScreen';
import ProfileScreen from './src/pages/ProfileScreen';

// Importando os contextos
import { AuthProvider } from './src/context/AuthContext';
import { AlertsProvider } from './src/context/AlertsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SoilConditions') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Occurrences') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Alerts') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#1C1C1E',
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
          height: 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="SoilConditions" 
        component={SoilScreen}
        options={{ title: 'Solo' }}
      />
      <Tab.Screen 
        name="Occurrences" 
        component={OccurrenceScreen}
        options={{ title: 'Ocorrências' }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertsScreen}
        options={{ title: 'Alertas' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AlertsProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#000000' }
              }}
            >
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="Main" component={TabNavigator} />
              <Stack.Screen name="AlertDetail" component={AlertDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AlertsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
} 