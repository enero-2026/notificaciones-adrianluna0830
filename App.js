import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { PaperProvider, Button, Text, Card, Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    cargarContador();
  }, []);

  useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const cargarContador = async () => {
    try {
      const datos = await AsyncStorage.getItem('contador');
      if (datos !== null) {
        setContador(JSON.parse(datos));
      }
    } catch (e) {
      console.log('Error al cargar');
    }
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem('contador', JSON.stringify(valor));
    } catch (e) {
      console.log('Error al guardar');
    }
  };

  const incrementar = () => {
    setContador(contador + 1);
  };

  const pedirPermiso = async () => {
    const { status: estadoExistente } = await Notifications.getPermissionsAsync();
    let estadoFinal = estadoExistente;
    if (estadoExistente !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      estadoFinal = status;
    }
    if (estadoFinal !== 'granted') {
      Alert.alert('Permisos', 'No se activaron las notificaciones.');
      return;
    }
    Alert.alert('Completado', 'Permisos concedidos con éxito.');
  };

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Estado del Contador",
        body: `El valor actual es: ${contador}`,
      },
      trigger: null,
    });
  };

  return (
    <PaperProvider>
      <View style={styles.pantalla}>
        <StatusBar style="dark" />
        <View style={styles.cabecera}>
          <Text variant="headlineMedium" style={styles.titulo}>Mi Panel</Text>
        </View>

        <Card style={styles.tarjeta}>
          <Card.Content style={styles.contenidoTarjeta}>
            <Avatar.Text 
              size={120} 
              label={contador.toString()} 
              style={styles.avatar}
              labelStyle={styles.textoAvatar}
            />
            <Text variant="titleMedium" style={styles.etiqueta}>Valor Acumulado</Text>
          </Card.Content>
        </Card>

        <View style={styles.seccionAcciones}>
          <Button 
            mode="contained" 
            onPress={incrementar} 
            style={styles.botonPrincipal}
            contentStyle={styles.alturaBoton}
          >
            Aumentar Valor
          </Button>

          <View style={styles.filaBotones}>
            <Button 
              mode="outlined" 
              onPress={pedirPermiso} 
              style={styles.botonSecundario}
            >
              Permisos
            </Button>
            <Button 
              mode="outlined" 
              onPress={enviarNotificacion} 
              style={styles.botonSecundario}
            >
              Notificar
            </Button>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 24,
  },
  cabecera: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  titulo: {
    color: '#1a1c1e',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 40,
  },
  contenidoTarjeta: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    backgroundColor: '#6200ee',
    marginBottom: 16,
  },
  textoAvatar: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  etiqueta: {
    color: '#656d76',
  },
  seccionAcciones: {
    gap: 16,
  },
  botonPrincipal: {
    borderRadius: 12,
    backgroundColor: '#6200ee',
  },
  alturaBoton: {
    height: 56,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 12,
  },
  botonSecundario: {
    flex: 1,
    borderRadius: 12,
    borderColor: '#6200ee',
  },
});
