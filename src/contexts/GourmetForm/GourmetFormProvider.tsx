import { createContext, ReactNode, useReducer, VFC } from 'react';
import { Context } from './GourmetForm';
import { gourmetFormReducer } from './GourmetFormReducer';

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
  const [gourmetForm, dispatch] = useReducer(gourmetFormReducer, initialState);

  return (
    <GourmetFormContext.Provider value={{ gourmetForm, dispatch }}>
      {children}
    </GourmetFormContext.Provider>
  );
};
