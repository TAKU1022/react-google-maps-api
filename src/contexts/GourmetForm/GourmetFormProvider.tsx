import { createContext, Dispatch, ReactNode, useReducer, VFC } from 'react';

type GourmetForm = {
  largeArea: string;
  middleArea: string;
  genre: string;
  keyword: string;
  wifi: number;
  freeDrink: number;
  freeFood: number;
};

type Actions =
  | { type: 'UPDATE_LARGE_AREA'; payload: { largeArea: string } }
  | { type: 'UPDATE_MIDDLE_AREA'; payload: { middleArea: string } }
  | { type: 'UPDATE_GENRE'; payload: { genre: string } }
  | { type: 'UPDATE_KEYWORD'; payload: { keyword: string } }
  | { type: 'UPDATE_WIFI'; payload: { wifi: number } }
  | { type: 'UPDATE_FREE_DRINK'; payload: { freeDrink: number } }
  | { type: 'UPDATE_FREE_FOOD'; payload: { freeFood: number } };

type Context = {
  gourmetForm: GourmetForm;
  dispatch: Dispatch<Actions>;
};

type Props = {
  children: ReactNode;
};

export const GourmetFormContext = createContext<Context | undefined>(undefined);

const reducer = (state: GourmetForm, action: Actions) => {
  switch (action.type) {
    case 'UPDATE_LARGE_AREA':
      const { largeArea } = action.payload;
      return { ...state, largeArea };

    case 'UPDATE_MIDDLE_AREA':
      const { middleArea } = action.payload;
      return { ...state, middleArea };

    case 'UPDATE_GENRE':
      const { genre } = action.payload;
      return { ...state, genre };

    case 'UPDATE_KEYWORD':
      const { keyword } = action.payload;
      return { ...state, keyword };

    case 'UPDATE_WIFI':
      const { wifi } = action.payload;
      return { ...state, wifi };

    case 'UPDATE_FREE_DRINK':
      const { freeDrink } = action.payload;
      return { ...state, freeDrink };

    case 'UPDATE_FREE_FOOD':
      const { freeFood } = action.payload;
      return { ...state, freeFood };

    default:
      return state;
  }
};

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
  const [gourmetForm, dispatch] = useReducer(reducer, initialState);

  return (
    <GourmetFormContext.Provider value={{ gourmetForm, dispatch }}>
      {children}
    </GourmetFormContext.Provider>
  );
};
