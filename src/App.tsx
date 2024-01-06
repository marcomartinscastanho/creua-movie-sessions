import React, { FC } from 'react';
import './app.scss';
import { AppRouter } from './appRouter';

export const App: FC = () => {
  return (
    <AppRouter />
  );
}

App.displayName = 'App';
