/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  data: DataProps | null;
  signIn(
    username: string,
    password: string,
  ): Promise<{ error: boolean; message?: string }>;
  signOut(): void;
}

interface DataProps {
  user: UserProps;
  token: string;
}

interface UserProps {
  username: string;
  description: string;
  email: string;
  name: string;
  phone_number: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const [token, userData] = await AsyncStorage.multiGet([
        '@JobFinder:token',
        '@JobFinder:user',
      ]);

      setData(null);

      if (token[1] && userData[1]) {
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;
        setData(JSON.parse(userData[1]));
      }
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async (username, password) => {
    try {
      const response = await api.post('sessions', {
        username,
        password,
      });

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ['@JobFinder:user', JSON.stringify(user)],
        ['@JobFinder:token', token],
      ]);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setData(response.data);

      return { error: false };
    } catch (err) {
      return { error: true, message: 'Houve um erro ao efetuar login' };
    }
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('@JobFinder:user');
    await AsyncStorage.removeItem('@JobFinder:token');
    setData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!data,
        data,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
