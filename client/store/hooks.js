import React from 'react';
import { StoresContext } from './context';

export const useStores = () => React.useContext(StoresContext);
