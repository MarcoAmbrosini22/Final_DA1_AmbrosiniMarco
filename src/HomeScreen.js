import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getExpenses, deleteExpense } from './services/api';

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error('Error al obtener gastos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(e => e.id !== id));
    } catch (err) {
      console.error('Error al eliminar gasto:', err);
    }
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemConcept}>{item.concept}</Text>
      <Text style={styles.itemAmount}>${item.amount}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
        <AntDesign name="delete" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total: ${total}</Text>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={fetchExpenses}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense', { onGoBack: fetchExpenses })}
      >
        <AntDesign name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d2d2d',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemConcept: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  itemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#007bff',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    padding: 6,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
}); 