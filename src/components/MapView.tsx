import { memo, VFC } from 'react';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import { Shop } from '../type/HotPepper';

type Props = {
  isLoading: boolean;
  mapSize?: google.maps.Size;
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  zoom: number;
  shopList: Shop[];
  infoWindowOptions: Shop[];
  onGoogleMapsScript: () => void;
  onLoadMap: (map: google.maps.Map) => void;
  onClickMarker: (shopData: Shop) => void;
  onCloseInfoWindow: (shopData: Shop) => void;
};

export const MapView: VFC<Props> = memo((props) => {
  const {
    isLoading,
    mapSize,
    center,
    zoom,
    shopList,
    infoWindowOptions,
    onGoogleMapsScript,
    onLoadMap,
    onClickMarker,
    onCloseInfoWindow,
  } = props;

  return (
    <div className="relative">
      <LoadScript
        googleMapsApiKey="AIzaSyB5KlhSNJ37deePhGn1Can7L1uK0MaFT_M"
        onLoad={onGoogleMapsScript}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={center}
          zoom={zoom}
          onLoad={onLoadMap}
        >
          {shopList.length === 0 ||
            shopList.map((shopData) => (
              <Marker
                key={shopData.id}
                position={{ lat: shopData.lat, lng: shopData.lng }}
                onClick={() => onClickMarker(shopData)}
              />
            ))}
          {infoWindowOptions.length === 0 ||
            infoWindowOptions.map((shopData) => (
              <InfoWindow
                key={shopData.id}
                position={{ lat: shopData.lat, lng: shopData.lng }}
                options={{ pixelOffset: mapSize }}
                onCloseClick={() => onCloseInfoWindow(shopData)}
              >
                <div>
                  <p className="text-center font-bold text-base">
                    {shopData.name}
                  </p>
                  <p className="text-sm mt-1">{shopData.address}</p>
                  <p className="text-sm mt-1">{shopData.open}</p>
                </div>
              </InfoWindow>
            ))}
        </GoogleMap>
      </LoadScript>
      {isLoading && (
        <div className="absolute flex justify-center items-center bg-gray-300 w-full h-full top-0 right-0 bottom-0 left-0">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
});
