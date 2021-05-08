import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StepsContextData {
  isFirstUse: string | null;
  completeSteps(): void;
}

const StepsContext = createContext<StepsContextData>({} as StepsContextData);

export const StepsProvider: React.FC = ({ children }) => {
  const [isFirstUse, setIsFirstUse] = useState<string | null>(null);

  useEffect(() => {
    async function firstUse() {
      const response = await AsyncStorage.getItem('@JobFinder:firstUse');
      setIsFirstUse(response);
    }
    firstUse();
  }, []);

  const completeSteps = useCallback(async () => {
    await AsyncStorage.setItem('@JobFinder:firstUse', 'complete');
    setIsFirstUse('complete');
  }, []);

  return (
    <StepsContext.Provider value={{ isFirstUse, completeSteps }}>
      {children}
    </StepsContext.Provider>
  );
};

export function useFirstSteps(): StepsContextData {
  const context = useContext(StepsContext);
  return context;
}
