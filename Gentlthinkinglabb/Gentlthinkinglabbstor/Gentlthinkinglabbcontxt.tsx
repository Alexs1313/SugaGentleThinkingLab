// CONTEXT

import React, {createContext, useContext, useState} from 'react';

export const StoreContext = createContext({});

export const useStore = () => {
  return useContext(StoreContext);
};

export const GentlthinkinSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [
    gentlthinkinglabbBackgroundMusic,
    setGentlthinkinglabbBackgroundMusic,
  ] = useState(false);
  const [gentlthinkinglabbVibration, setGentlthinkinglabbVibration] =
    useState(false);

  const contextValues = {
    gentlthinkinglabbBackgroundMusic,
    setGentlthinkinglabbBackgroundMusic,
    gentlthinkinglabbVibration,
    setGentlthinkinglabbVibration,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
