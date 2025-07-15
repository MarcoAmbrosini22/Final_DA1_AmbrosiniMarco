import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import AddExpenseScreen from './src/AddExpenseScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Gastos' }} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Agregar Gasto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 