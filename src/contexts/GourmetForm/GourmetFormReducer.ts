import { Actions, GourmetForm } from './GourmetForm';

export const gourmetFormReducer = (state: GourmetForm, action: Actions) => {
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
