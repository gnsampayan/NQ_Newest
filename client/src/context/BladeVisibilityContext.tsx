import React, { createContext, useContext, ReactNode } from "react";

interface BladeVisibilityContextProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const BladeVisibilityContext = createContext<BladeVisibilityContextProps | undefined>(undefined);

export const BladeVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <BladeVisibilityContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </BladeVisibilityContext.Provider>
  );
};

export const useBladeVisibility = () => {
  const context = useContext(BladeVisibilityContext);
  if (!context) {
    throw new Error("useBladeVisibility must be used within a BladeVisibilityProvider");
  }
  return context;
};
