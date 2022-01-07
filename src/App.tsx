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
import genreData from './data/genre.json';
import axios from 'axios';
import { MapView } from './components/MapView';
import { LocationForm } from './components/LoactionForm';
import { Gourmet, Shop } from './type/HotPepper';
const axiosJsonAdapter = require('axios-jsonp');

export const App: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 35.6809591, lng: 139.7673068 });
  const [zoom, setZoom] = useState<number>(16);
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [infoWindowOptions, setInfoWindowOptions] = useState<Shop[]>([]);

  const [largeArea, setLargeArea] = useState<string>('');
  const [middleArea, setMiddleArea] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [hitCount, setHitCount] = useState<number>();

  const onLoadMap = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onClickMarker = (shopData: Shop) => {
    console.log(shopData.id);
    setInfoWindowOptions((prevState) => [...prevState, shopData]);
  };

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

  const onChangeGenre = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
  }, []);

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

      const bounds = new google.maps.LatLngBounds();
      const res = await axios.get<Gourmet>(
        'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/',
        {
          adapter: axiosJsonAdapter,
          params: {
            key: process.env.REACT_APP_HOTPEPPER_API_KEY,
            large_area: largeArea,
            middle_area: middleArea,
            genre,
            keyword,
            count: 100,
            format: 'jsonp',
          },
        }
      );
      const gourmetData = res.data;

      if (gourmetData.results.shop) {
        setHitCount(parseInt(gourmetData.results.results_returned));
        gourmetData.results.shop.forEach((shopData) => {
          bounds.extend({ lat: shopData.lat, lng: shopData.lng });
          map?.fitBounds(bounds);
          setShopList((prevState) => [...prevState, shopData]);
        });
      } else {
        alert('エラー発生');
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    },
    [keyword, largeArea, map, middleArea, genre]
  );

  useEffect(() => {
    setIsLoading(true);
    setLargeArea(largeAreaData.results.large_area[0].code);
    setGenre(genreData.results.genre[0].code);

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

  useEffect(() => {
    const filteredMiddleArea = middleAreaData.results.middle_area.filter(
      (area) => area.large_area.code === largeArea
    );
    setMiddleArea(filteredMiddleArea[0]?.code);
  }, [largeArea]);

  return (
    <div className="max-w-4xl mx-auto">
      <MapView
        isLoading={isLoading}
        center={center}
        zoom={zoom}
        shopList={shopList}
        infoWindowOptions={infoWindowOptions}
        onLoadMap={onLoadMap}
        onClickMarker={onClickMarker}
      />
      <div className="mt-8">
        <LocationForm
          largeAreaData={largeAreaData}
          middleAreaData={middleAreaData}
          genreData={genreData}
          largeArea={largeArea}
          hitCount={hitCount}
          onChangeLargeArea={onChangeLargeArea}
          onChangeMiddleArea={onChangeMiddleArea}
          onChangeGenre={onChangeGenre}
          onChangeKeyword={onChangeKeyword}
          onSubmitForm={onSubmitForm}
        />
      </div>
    </div>
  );
};
