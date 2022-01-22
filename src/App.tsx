import { useCallback, useEffect, useState, VFC } from 'react';
import middleAreaData from './data/middleArea.json';
import axios from 'axios';
import { MapView } from './components/MapView';
import { LocationForm } from './components/LoactionForm';
import { Gourmet, Shop } from './types/HotPepper';
import { useMapLoading } from './hooks/useMapLoading';
import { useForm } from 'react-hook-form';
import { GourmetForm } from './types/GourmetForm';
const axiosJsonAdapter = require('axios-jsonp');

export const App: VFC = () => {
  const { toggleIsLoading } = useMapLoading();

  const [size, setSize] = useState<google.maps.Size>();
  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({ lat: 35.6809591, lng: 139.7673068 });
  const [shopList, setShopList] = useState<Shop[]>([]);
  const [infoWindowOption, setInfoWindowOption] = useState<Shop>();
  const [hitCount, setHitCount] = useState<number>();

  const { register, watch, setValue, handleSubmit } = useForm<GourmetForm>();
  const largeAreaValue = watch('largeArea');
  const filteredMiddleArea = middleAreaData.results.middle_area.filter(
    (areaData) => areaData.large_area.code === largeAreaValue
  );

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

  const onSubmitForm = handleSubmit(async (formValue: GourmetForm) => {
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
          large_area: formValue.largeArea,
          middle_area: formValue.middleArea,
          genre: formValue.genre,
          keyword: formValue.keyword,
          wifi: formValue.wifi ? 1 : 0,
          free_drink: formValue.freeDrink ? 1 : 0,
          free_food: formValue.freeFood ? 1 : 0,
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
  });

  useEffect(() => {
    setValue('middleArea', filteredMiddleArea[0]?.code);
  }, [largeAreaValue, filteredMiddleArea, setValue]);

  useEffect(() => {
    toggleIsLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    toggleIsLoading(false, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-5xl pt-4 px-4 pb-10 mx-auto">
      <MapView
        size={size}
        center={center}
        shopList={shopList}
        infoWindowOption={infoWindowOption}
        onGoogleMapsScript={onLoadGoogleMapsScript}
        onLoadMap={onLoadMap}
        onClickMarker={onClickMarker}
        onCloseInfoWindow={onCloseInfoWindow}
      />
      <div className="mt-6">
        <p>※検索上限は最大100件です。</p>
        <LocationForm
          register={register}
          largeAreaValue={largeAreaValue}
          hitCount={hitCount}
          onSubmitForm={onSubmitForm}
        />
      </div>
    </div>
  );
};
