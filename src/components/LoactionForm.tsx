import { ChangeEvent, FormEvent, memo, VFC } from 'react';
import largeAreaData from '../data/largeArea.json';
import middleAreaData from '../data/middleArea.json';
import genreData from '../data/genre.json';

type Props = {
  isLoading: boolean;
  largeArea: string;
  hitCount?: number;
  onChangeLargeArea: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeMiddleArea: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeGenre: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeWifi: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeFreeDrink: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeFreeFood: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const LocationForm: VFC<Props> = memo((props) => {
  const {
    isLoading,
    largeArea,
    hitCount,
    onChangeLargeArea,
    onChangeMiddleArea,
    onChangeGenre,
    onChangeKeyword,
    onChangeWifi,
    onChangeFreeDrink,
    onChangeFreeFood,
    onSubmitForm,
  } = props;

  return (
    <>
      <p className="mt-6">※検索上限は最大100件です。</p>

      <form className="mt-2" onSubmit={onSubmitForm}>
        <select
          className="border-2 rounded px-4 py-2 mr-4"
          onChange={onChangeLargeArea}
        >
          {largeAreaData.results.large_area.map((area) => (
            <option key={area.code} value={area.code}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          className="border-2 rounded px-4 py-2 mr-4"
          onChange={onChangeMiddleArea}
        >
          {middleAreaData.results.middle_area
            .filter((areaData) => areaData.large_area.code === largeArea)
            .map((area) => (
              <option key={area.code} value={area.code}>
                {area.name}
              </option>
            ))}
        </select>
        <select
          className="border-2 rounded px-4 py-2 mr-4"
          onChange={onChangeGenre}
        >
          {genreData.results.genre.map((genre) => (
            <option key={genre.code} value={genre.code}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          className="border-2 rounded p-2 mr-4"
          type="text"
          placeholder="キーワード"
          onChange={onChangeKeyword}
        />
        <label
          className="inline-flex justify-center cursor-pointer items-center mt-4 mr-6"
          htmlFor="wifi"
        >
          <input
            id="wifi"
            className="mr-1"
            type="checkbox"
            value={1}
            onChange={onChangeWifi}
          />
          <span>WiFi利用可能</span>
        </label>
        <label
          className="inline-flex justify-center cursor-pointer items-center mt-4 mr-6"
          htmlFor="free-drink"
        >
          <input
            id="free-drink"
            className="mr-1"
            type="checkbox"
            value={1}
            onChange={onChangeFreeDrink}
          />
          <span>飲み放題</span>
        </label>
        <label
          className="inline-flex justify-center cursor-pointer items-center mt-4 mr-6"
          htmlFor="free-food"
        >
          <input
            id="free-food"
            className="mr-1"
            type="checkbox"
            value={1}
            onChange={onChangeFreeFood}
          />
          <span>食べ放題</span>
        </label>
        <button
          className="bg-blue-500 text-gray-50 rounded block px-3 py-1 mx-auto mt-4 disabled:bg-gray-400"
          type="submit"
          disabled={isLoading}
        >
          検索する
        </button>
      </form>

      {hitCount === undefined || (
        <p className="text-center mt-4">{hitCount}件ヒットしました。</p>
      )}
    </>
  );
});
