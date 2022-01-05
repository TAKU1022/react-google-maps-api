import { ChangeEvent, FormEvent, useEffect, useState, VFC } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

const App: VFC = () => {
  const [results, setResults] = useState<any>(null);
  const [keyword, setKeyword] = useState<string>('');

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(results);
  };

  useEffect(() => {
    axios
      .get(
        `https://peaceful-bayou-19080.herokuapp.com/api/v1/place?value=${encodeURIComponent(
          keyword
        )}`
      )
      .then((res) => {
        setResults((prevState: any) => {
          return { ...prevState, ...res.data.results };
        });
      });
  }, [keyword]);

  return (
    <div className="max-w-4xl mx-auto">
      <LoadScript googleMapsApiKey="AIzaSyB5KlhSNJ37deePhGn1Can7L1uK0MaFT_M">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: 38, lng: 137.5936 }}
          zoom={5}
        ></GoogleMap>
      </LoadScript>

      <div className="mt-8">
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="place"
            className="border-2 rounded p-2 mr-4"
            onChange={onChangeKeyword}
          />
          <button type="submit" className="bg-gray-300 rounded px-3 py-1">
            検索する
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
