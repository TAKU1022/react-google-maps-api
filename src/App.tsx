import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';
import largeAreaData from './data/largeArea.json';
import middleAreaData from './data/middleArea.json';
import axios from 'axios';
import { MapView } from './components/MapView';
import { LocationForm } from './components/LoactionForm';
const axiosJsonAdapter = require('axios-jsonp');

export const App: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 35.6809591, lng: 139.7673068 });
  const [zoom, setZoom] = useState<number>(16);
  const [markerLocations, setMarkerLocations] = useState<
    google.maps.LatLng[] | google.maps.LatLngLiteral[]
  >([]);

  const [largeArea, setLargeArea] = useState<string>('');
  const [middleArea, setMiddleArea] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [hitCount, setHitCount] = useState<number>();

  const onLoadMap = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onChangeLargeArea = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setLargeArea(event.target.value);
    },
    []
  );

  const onChangeMiddleArea = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setMiddleArea(event.target.value);
    },
    []
  );

  const onChangeKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    []
  );

  const onSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setMarkerLocations([]);

      const bounds = new google.maps.LatLngBounds();
      const res = await axios.get(
        'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/',
        {
          adapter: axiosJsonAdapter,
          params: {
            key: process.env.REACT_APP_HOTPEPPER_API_KEY,
            large_area: largeArea,
            middle_area: middleArea,
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
          };
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
    },
    [keyword, largeArea, map, middleArea]
  );

  useEffect(() => {
    setIsLoading(true);
    setLargeArea(largeAreaData.results.large_area[0].code);
    setMiddleArea(middleAreaData.results.middle_area[0].code);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <MapView
        isLoading={isLoading}
        center={center}
        zoom={zoom}
        markerLocations={markerLocations}
        onLoadMap={onLoadMap}
      />
      <div className="mt-8">
        <LocationForm
          largeAreaData={largeAreaData}
          middleAreaData={middleAreaData}
          largeArea={largeArea}
          hitCount={hitCount}
          onChangeLargeArea={onChangeLargeArea}
          onChangeMiddleArea={onChangeMiddleArea}
          onChangeKeyword={onChangeKeyword}
          onSubmitForm={onSubmitForm}
        />
      </div>
    </div>
  );
};
