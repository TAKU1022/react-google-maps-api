import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  VFC,
} from 'react';

type Context = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};

export const MapLoadingContext = createContext<Context | undefined>(undefined);

export const MapLoadingProvider: VFC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MapLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </MapLoadingContext.Provider>
  );
};
