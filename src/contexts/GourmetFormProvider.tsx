import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  VFC,
} from 'react';

type GourmetForm = {
  largeArea: string;
  middleArea: string;
  genre: string;
  keyword: string;
  wifi: number;
  freeDrink: number;
  freeFood: number;
};

type Context = {
  gourmetForm: GourmetForm;
  setGourmetForm: Dispatch<SetStateAction<GourmetForm>>;
};

type Props = {
  children: ReactNode;
};

export const GourmetFormContext = createContext<Context | undefined>(undefined);

const initialState = {
  largeArea: '',
  middleArea: '',
  genre: '',
  keyword: '',
  wifi: 0,
  freeDrink: 0,
  freeFood: 0,
};

export const GourmetFormProvider: VFC<Props> = ({ children }) => {
  const [gourmetForm, setGourmetForm] = useState<GourmetForm>(initialState);

  return (
    <GourmetFormContext.Provider value={{ gourmetForm, setGourmetForm }}>
      {children}
    </GourmetFormContext.Provider>
  );
};
