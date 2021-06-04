import React from 'react';

import { StepsProvider } from './steps';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <StepsProvider>
    <AuthProvider>{children}</AuthProvider>
  </StepsProvider>
);
export default AppProvider;
