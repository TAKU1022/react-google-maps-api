import { ChangeEvent, FormEvent, memo, VFC } from 'react';
import { Genre, LargeArea, MiddleArea } from '../type/HotPepper';

type Props = {
  isLoading: boolean;
  largeAreaData: LargeArea;
  middleAreaData: MiddleArea;
  genreData: Genre;
  largeArea: string;
  hitCount?: number;
  onChangeLargeArea: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeMiddleArea: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeGenre: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const LocationForm: VFC<Props> = memo((props) => {
  const {
    isLoading,
    largeAreaData,
    middleAreaData,
    genreData,
    largeArea,
    hitCount,
    onChangeLargeArea,
    onChangeMiddleArea,
    onChangeGenre,
    onChangeKeyword,
    onSubmitForm,
  } = props;

  return (
    <>
      <p className="mt-6">※検索上限は最大100件です。</p>
      <form className="mt-2" onSubmit={onSubmitForm}>
        <select
          className="border-2 rounded p-2 mr-4"
          onChange={onChangeLargeArea}
        >
          {largeAreaData.results.large_area.map((area) => (
            <option key={area.code} value={area.code}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          className="border-2 rounded p-2 mr-4"
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
        <select className="border-2 rounded p-2 mr-4" onChange={onChangeGenre}>
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
