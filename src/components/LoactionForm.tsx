import { ChangeEvent, FormEvent, VFC } from 'react';
import { LargeArea, MiddleArea } from '../type/HotPepper';

type Props = {
  largeAreaData: LargeArea;
  middleAreaData: MiddleArea;
  largeArea: string;
  hitCount?: number;
  onChangeLargeArea: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeMiddleArea: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const LocationForm: VFC<Props> = (props) => {
  const {
    largeAreaData,
    middleAreaData,
    largeArea,
    hitCount,
    onChangeLargeArea,
    onChangeMiddleArea,
    onChangeKeyword,
    onSubmitForm,
  } = props;

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <select
          className="border-2 rounded p-2 mr-4"
          onChange={onChangeLargeArea}
        >
          {largeAreaData.results.large_area.map((area: any) => (
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
            .filter((areaData: any) => largeArea === areaData.large_area.code)
            .map((area: any) => (
              <option key={area.code} value={area.code}>
                {area.name}
              </option>
            ))}
        </select>
        <input
          className="border-2 rounded p-2 mr-4"
          type="text"
          placeholder="キーワード"
          onChange={onChangeKeyword}
        />
        <button className="bg-gray-300 rounded px-3 py-1" type="submit">
          検索する
        </button>
      </form>
      {hitCount && <p className="mt-4">{hitCount}件ヒットしました。</p>}
      <p className="mt-6">※検索上限は最大100件です。</p>
    </>
  );
};
