import { createContext, useState, useContext, FC, ReactNode } from "react";

const StringContext = createContext<{
  value: string;
  setValue: (val: string) => void;
} | null>(null);

export const StringProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState("");

  return (
    <StringContext.Provider value={{ value, setValue }}>
      {children}
    </StringContext.Provider>
  );
};

export const useStringContext = () => {
  const ctx = useContext(StringContext);
  if (!ctx)
    throw new Error("useStringContext must be used within StringProvider");
  return ctx;
};
