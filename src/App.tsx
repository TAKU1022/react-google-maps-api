import { ChangeEvent, FormEvent, useEffect, useState, VFC } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
const axiosJsonAdapter = require('axios-jsonp');

const App: VFC = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >();
  const [zoom, setZoom] = useState<number>(16);
  const [markerLocations, setMarkerLocations] = useState<google.maps.LatLng[]>(
    []
  );
  const [keyword, setKeyword] = useState<string>('');

  const onLoadMap = (map: google.maps.Map) => {
    setMap(map);
  };

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMarkerLocations([]);
    const geocoder = new google.maps.Geocoder();
    const bounds = new google.maps.LatLngBounds();
    const res = await axios.get(
      'https://webservice.recruit.co.jp/hotpepper/shop/v1/',
      {
        adapter: axiosJsonAdapter,
        params: {
          key: process.env.REACT_APP_HOTPEPPER_API_KEY,
          keyword: encodeURIComponent(keyword),
          format: 'jsonp',
        },
      }
    );

    if (res.data.results.shop) {
      res.data.results.shop.forEach((shopData: any) => {
        geocoder.geocode({ address: shopData.address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results![0].geometry) {
              const latlng = results![0].geometry.location;
              bounds.extend(latlng);
              map?.fitBounds(bounds);
              setMarkerLocations((prevState) => [...prevState, latlng]);
            }
          } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
            alert('見つかりません');
          } else {
            alert('文字を入力してください');
          }
        });
      });
    } else {
      alert('条件を絞り込んでください');
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
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
