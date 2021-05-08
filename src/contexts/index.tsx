import React from 'react';

import { StepsProvider } from './steps';

const AppProvider: React.FC = ({ children }) => (
  <StepsProvider>{children}</StepsProvider>
);

export default AppProvider;
