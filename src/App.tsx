import { FormEvent, useCallback, useEffect, useState, VFC } from 'react';
import largeAreaData from './data/largeArea.json';
import middleAreaData from './data/middleArea.json';
import genreData from './data/genre.json';
import axios from 'axios';
import { MapView } from './components/MapView';
import { LocationForm } from './components/LoactionForm';
import { Gourmet, Shop } from './type/HotPepper';
import { useGourmetForm } from './hooks/useGourmetForm';
const axiosJsonAdapter = require('axios-jsonp');

export const App: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [size, setSize] = useState<google.maps.Size>();
  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 35.6809591, lng: 139.7673068 });
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [infoWindowOption, setInfoWindowOption] = useState<Shop>();

  const { gourmetForm, changeLargeArea, changeMiddleArea, changeGenre } =
    useGourmetForm();
  const [hitCount, setHitCount] = useState<number>();

  const onLoadGoogleMapsScript = useCallback(() => {
    setSize(new google.maps.Size(0, -45));
  }, []);

  const onLoadMap = useCallback((mapData: google.maps.Map) => {
    setMap(mapData);
  }, []);

  const onClickMarker = useCallback(
    (shopData: Shop) => {
      setInfoWindowOption(shopData);
      map?.setCenter({ lat: shopData.lat, lng: shopData.lng });
      map?.setZoom(18);
    },
    [map]
  );

  const onCloseInfoWindow = useCallback(() => {
    setInfoWindowOption(undefined);
  }, []);

  const toggleIsLoading = (bool: boolean, time: number = 0) =>
    new Promise(() => setTimeout(() => setIsLoading(bool), time));

  const onSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      toggleIsLoading(true);
      setShopList([]);
      setInfoWindowOption(undefined);

      const bounds = new google.maps.LatLngBounds();
      const res = await axios.get<Gourmet>(
        'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/',
        {
          adapter: axiosJsonAdapter,
          params: {
            key: process.env.REACT_APP_HOTPEPPER_API_KEY,
            large_area: gourmetForm.largeArea,
            middle_area: gourmetForm.middleArea,
            genre: gourmetForm.genre,
            keyword: gourmetForm.keyword,
            wifi: gourmetForm.wifi,
            free_drink: gourmetForm.freeDrink,
            free_food: gourmetForm.freeFood,
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

      toggleIsLoading(false, 1500);
    },
    [
      gourmetForm.freeDrink,
      gourmetForm.freeFood,
      gourmetForm.genre,
      gourmetForm.keyword,
      gourmetForm.largeArea,
      gourmetForm.middleArea,
      gourmetForm.wifi,
      map,
    ]
  );

  useEffect(() => {
    toggleIsLoading(true);
    changeLargeArea(largeAreaData.results.large_area[0].code);
    changeGenre(genreData.results.genre[0].code);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    toggleIsLoading(false, 3000);
  }, [changeGenre, changeLargeArea]);

  useEffect(() => {
    const filteredMiddleArea = middleAreaData.results.middle_area.filter(
      (area) => area.large_area.code === gourmetForm.largeArea
    );
    changeMiddleArea(filteredMiddleArea[0]?.code);
  }, [changeMiddleArea, gourmetForm.largeArea]);

  return (
    <div className="max-w-5xl pt-4 px-4 pb-10 mx-auto">
      <MapView
        isLoading={isLoading}
        size={size}
        center={center}
        shopList={shopList}
        infoWindowOption={infoWindowOption}
        onGoogleMapsScript={onLoadGoogleMapsScript}
        onLoadMap={onLoadMap}
        onClickMarker={onClickMarker}
        onCloseInfoWindow={onCloseInfoWindow}
      />
      <div>
        <LocationForm
          isLoading={isLoading}
          hitCount={hitCount}
          onSubmitForm={onSubmitForm}
        />
      </div>
    </div>
  );
};
