import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => navigation.replace('Login')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Home</Text>
      
      <View style={styles.logoutContainer}>
        <Button 
          title="Cerrar Sesión" 
          onPress={handleLogout}
          color="#FF3B30"
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {data && (
        <View style={styles.card}>
          <Text>ID: {data.id}</Text>
          <Text>Título: {data.title}</Text>
          <Text>Completado: {data.completed ? 'Sí' : 'No'}</Text>
        </View>
      )}
      <Button title="Ir a Detalle" onPress={() => navigation.navigate('Detail')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  logoutContainer: { 
    position: 'absolute', 
    top: 50, 
    right: 20, 
    zIndex: 1 
  },
  card: { backgroundColor: '#f2f2f2', padding: 16, borderRadius: 8, marginBottom: 20 },
  error: { color: 'red', marginBottom: 10 },
}); 