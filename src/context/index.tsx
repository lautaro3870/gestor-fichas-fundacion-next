'use client';
import { CustomSelectInterface } from '@/lib/interfaces';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext<{
  areasMapped: CustomSelectInterface[];
  setAreasMapped: React.Dispatch<React.SetStateAction<CustomSelectInterface[]>>;
  personalesMapped: CustomSelectInterface[];
  setPersonaleMapped: React.Dispatch<
    React.SetStateAction<CustomSelectInterface[]>
  >;
}>({
  areasMapped: [],
  setAreasMapped: () => {},
  personalesMapped: [],
  setPersonaleMapped: () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [areasMapped, setAreasMapped] = useState<CustomSelectInterface[]>([]);
  const [personalesMapped, setPersonaleMapped] = useState<
    CustomSelectInterface[]
  >([]);

  return (
    <AppContext.Provider
      value={{
        areasMapped,
        setAreasMapped,
        personalesMapped,
        setPersonaleMapped,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
