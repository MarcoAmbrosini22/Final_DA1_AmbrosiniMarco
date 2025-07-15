// src/services/api.js

const API_BASE_URL = 'http://localhost:3000';

export async function getExpenses() {
  const res = await fetch(`${API_BASE_URL}/expenses`);
  if (!res.ok) throw new Error('Error al obtener gastos');
  return await res.json();
}

export async function addExpense(expense) {
  const res = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error('Error al agregar gasto');
  return await res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar gasto');
  return true;
} 