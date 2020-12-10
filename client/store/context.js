import AppStateClass from './app-state';
import { createContext } from 'react';
import { CounterStore } from './count';
import { ThemeStore } from './theme';

export const AppState = AppStateClass;

export default {
  AppState,
};

export const createStoreMap = () => ({
  appState: new AppState(),
});

export const StoresContext = createContext({
  counterStore: new CounterStore(),
  themeStore: new ThemeStore()
})
