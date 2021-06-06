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
  data: UserProps | null;
  signIn(
    email: string,
    password: string,
  ): Promise<{ error: boolean; message?: string }>;
  signOut(): void;
}

interface UserProps {
  user_id: string;
  avatar: string | null;
  curriculum: string | null;
  favorites_jobs: [];
  is_active: boolean;
  is_recolocation: boolean;
  jobs: [];
  description: string;
  email: string;
  name: string;
  phone_number: string;
  category: CategoryProps;
  city: CityProps;
}

interface CategoryProps {
  id: string;
  name: string;
}

interface CityProps {
  id: string;
  name: string;
  state: StateProps;
}

interface StateProps {
  id: string;
  name: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UserProps | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@JobFinder:token',
        '@JobFinder:user',
      ]);

      setData(null);

      if (token[1] && user[1]) {
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;
        setData(JSON.parse(user[1]));
      }
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { user, token } = response.data;

      await AsyncStorage.multiSet([
        ['@JobFinder:user', JSON.stringify(user)],
        ['@JobFinder:token', token],
      ]);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setData(user);

      return { error: false };
    } catch (err) {
      return {
        error: true,
        message:
          'Houve um erro ao efetuar login, verifique seus dados e sua conexão com a internet.',
      };
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
