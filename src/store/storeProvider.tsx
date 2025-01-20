"use client"

import { createContext, useContext, useRef, ReactNode } from 'react';
import { StoreApi, useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { createStoreLocal, IStoreState } from '@/store/store';
import { devtools } from 'zustand/middleware';

const StoreContext = createContext<StoreApi<IStoreState> | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<StoreApi<IStoreState> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore(devtools(createStoreLocal));
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreInContext = <T, >(selector: (state: IStoreState) => T): T => {
  const storeContext = useContext(StoreContext);
  if (!storeContext) {
    throw new Error('Missing StoreProvider');
  }
  return useStore(storeContext, selector);
};