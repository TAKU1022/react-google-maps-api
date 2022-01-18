import { ChangeEvent, useCallback, useContext } from 'react';
import { GourmetFormContext } from '../contexts/GourmetForm/GourmetFormProvider';

export const useGourmetForm = () => {
  const context = useContext(GourmetFormContext);

  if (context === undefined) {
    throw new Error('useGourmetForm must be used within a GourmetFormProvider');
  }

  const { gourmetForm, dispatch } = context;

  const changeLargeArea = useCallback(
    (value: string) => {
      dispatch({ type: 'UPDATE_LARGE_AREA', payload: { largeArea: value } });
    },
    [dispatch]
  );

  const changeMiddleArea = useCallback(
    (value: string) => {
      dispatch({ type: 'UPDATE_MIDDLE_AREA', payload: { middleArea: value } });
    },
    [dispatch]
  );

  const changeGenre = useCallback(
    (value: string) => {
      dispatch({ type: 'UPDATE_GENRE', payload: { genre: value } });
    },
    [dispatch]
  );

  const onChangeLargeArea = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: 'UPDATE_LARGE_AREA',
        payload: { largeArea: event.target.value },
      });
    },
    [dispatch]
  );

  const onChangeMiddleArea = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: 'UPDATE_MIDDLE_AREA',
        payload: { middleArea: event.target.value },
      });
    },
    [dispatch]
  );

  const onChangeGenre = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: 'UPDATE_GENRE',
        payload: { genre: event.target.value },
      });
    },
    [dispatch]
  );

  const onChangeKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'UPDATE_KEYWORD',
        payload: { keyword: event.target.value },
      });
    },
    [dispatch]
  );

  const onChangeWifi = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? parseInt(event.target.value) : 0;
      dispatch({ type: 'UPDATE_WIFI', payload: { wifi: value } });
    },
    [dispatch]
  );

  const onChangeFreeDrink = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? parseInt(event.target.value) : 0;
      dispatch({ type: 'UPDATE_FREE_DRINK', payload: { freeDrink: value } });
    },
    [dispatch]
  );

  const onChangeFreeFood = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? parseInt(event.target.value) : 0;
      dispatch({ type: 'UPDATE_FREE_FOOD', payload: { freeFood: value } });
    },
    [dispatch]
  );

  return {
    gourmetForm,
    changeLargeArea,
    changeMiddleArea,
    changeGenre,
    onChangeLargeArea,
    onChangeMiddleArea,
    onChangeGenre,
    onChangeKeyword,
    onChangeWifi,
    onChangeFreeDrink,
    onChangeFreeFood,
  };
};
