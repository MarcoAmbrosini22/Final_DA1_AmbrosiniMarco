import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  // Login
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      const { token, user } = response.data;
      
      // Guardar token en AsyncStorage
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      return { success: true, data: { token, user } };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión',
      };
    }
  }

  // Logout
  async logout() {
    try {
      // Opcional: llamar endpoint de logout en el backend
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error al hacer logout en backend:', error);
    } finally {
      // Limpiar almacenamiento local
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
    }
  }

  // Verificar si hay token válido
  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return false;

      // Verificar token con el backend
      const response = await api.get('/auth/verify');
      return response.status === 200;
    } catch (error) {
      console.error('Error verificando token:', error);
      return false;
    }
  }

  // Obtener datos del usuario
  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      return null;
    }
  }

  // Registro de usuario
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al registrar usuario',
      };
    }
  }

  // Cambiar contraseña
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al cambiar contraseña',
      };
    }
  }
}

export default new AuthService(); 