import React from 'react';

import AppNavigation from './app.navigation';
import StepsNavigation from './steps.navigation';

import { useFirstSteps } from '../contexts/steps';

function Navigation() {
  const { isFirstUse } = useFirstSteps();

  return isFirstUse ? <AppNavigation /> : <StepsNavigation />;
}

export default Navigation;
