import { ChangeEvent, FormEvent, useEffect, useState, VFC } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import largeAreaData from './data/largeArea.json';
import axios from 'axios';
const axiosJsonAdapter = require('axios-jsonp');

const App: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >();
  const [zoom, setZoom] = useState<number>(16);
  const [markerLocations, setMarkerLocations] = useState<google.maps.LatLng[]>(
    []
  );
  const [largeArea, setLargeArea] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [hitCount, setHitCount] = useState<number>();

  const onLoadMap = (map: google.maps.Map) => {
    setMap(map);
  };

  const onChangeLargeArea = (event: ChangeEvent<HTMLSelectElement>) => {
    setLargeArea(event.target.value);
  };

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMarkerLocations([]);

    const bounds = new google.maps.LatLngBounds();
    const res = await axios.get(
      'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/',
      {
        adapter: axiosJsonAdapter,
        params: {
          key: process.env.REACT_APP_HOTPEPPER_API_KEY,
          service_area: largeArea,
          keyword,
          count: 100,
          format: 'jsonp',
        },
      }
    );

    if (res.data.results.shop) {
      setHitCount(res.data.results.shop.length);
      res.data.results.shop.forEach((shopData: any) => {
        const latlng = {
          lat: shopData.lat,
          lng: shopData.lng,
        } as google.maps.LatLng;
        bounds.extend(latlng);
        map?.fitBounds(bounds);
        setMarkerLocations((prevState) => [...prevState, latlng]);
      });
    } else {
      alert('エラー発生');
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    setIsLoading(true);
    setLargeArea(largeAreaData.results.large_area[0].service_area.code);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setCenter({ lat: 38, lng: 137.5936 });
          setZoom(5);
        }
      );
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <LoadScript googleMapsApiKey="AIzaSyB5KlhSNJ37deePhGn1Can7L1uK0MaFT_M">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={zoom}
            onLoad={onLoadMap}
          >
            {markerLocations.map((markerLocation, index) => (
              <Marker key={index} position={markerLocation} />
            ))}
          </GoogleMap>
        </LoadScript>
        {isLoading && (
          <div className="absolute flex justify-center items-center bg-gray-300 w-full h-full top-0 right-0 bottom-0 left-0">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <form onSubmit={onSubmitForm}>
          <select
            className="border-2 rounded p-2 mr-4"
            onChange={onChangeLargeArea}
          >
            {largeAreaData.results.large_area.map((area) => (
              <option key={area.code} value={area.service_area.code}>
                {area.service_area.name}
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
      </div>
    </div>
  );
};

export default App;
