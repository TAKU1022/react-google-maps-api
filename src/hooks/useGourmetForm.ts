import { ChangeEvent, useCallback, useContext } from 'react';
import { GourmetFormContext } from '../contexts/GourmetFormProvider';

export const useGourmetForm = () => {
  const context = useContext(GourmetFormContext);

  if (context === undefined) {
    throw new Error('useGourmetForm must be used within a GourmetFormProvider');
  }

  const { gourmetForm, setGourmetForm } = context;

  const changeLargeArea = useCallback(
    (value: string) => {
      setGourmetForm((prevState) => {
        return { ...prevState, largeArea: value };
      });
    },
    [setGourmetForm]
  );

  const changeMiddleArea = useCallback(
    (value: string) => {
      setGourmetForm((prevState) => {
        return { ...prevState, middleArea: value };
      });
    },
    [setGourmetForm]
  );

  const changeGenre = useCallback(
    (value: string) => {
      setGourmetForm((prevState) => {
        return { ...prevState, genre: value };
      });
    },
    [setGourmetForm]
  );

  const onChangeLargeArea = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setGourmetForm((prevState) => {
        return { ...prevState, largeArea: event.target.value };
      });
    },
    [setGourmetForm]
  );

  const onChangeMiddleArea = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setGourmetForm((prevState) => {
        return { ...prevState, middleArea: event.target.value };
      });
    },
    [setGourmetForm]
  );

  const onChangeGenre = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setGourmetForm((prevState) => {
        return { ...prevState, genre: event.target.value };
      });
    },
    [setGourmetForm]
  );

  const onChangeKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGourmetForm((prevState) => {
        return { ...prevState, keyword: event.target.value };
      });
    },
    [setGourmetForm]
  );

  const onChangeWifi = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? parseInt(event.target.value) : 0;
      setGourmetForm((prevState) => {
        return { ...prevState, wifi: value };
      });
    },
    [setGourmetForm]
  );

  const onChangeFreeDrink = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? parseInt(event.target.value) : 0;
      setGourmetForm((prevState) => {
        return { ...prevState, wifi: value };
      });
    },
    [setGourmetForm]
  );
  const onChangeFreeFood = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? parseInt(event.target.value) : 0;
      setGourmetForm((prevState) => {
        return { ...prevState, wifi: value };
      });
    },
    [setGourmetForm]
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
