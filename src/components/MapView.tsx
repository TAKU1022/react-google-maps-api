import { memo, VFC } from 'react';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import { Shop } from '../type/HotPepper';
import { useMapLoading } from '../hooks/useMapLoading';

type Props = {
  size?: google.maps.Size;
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  shopList: Shop[];
  infoWindowOption?: Shop;
  onGoogleMapsScript: () => void;
  onLoadMap: (map: google.maps.Map) => void;
  onClickMarker: (shopData: Shop) => void;
  onCloseInfoWindow: () => void;
};

export const MapView: VFC<Props> = memo((props) => {
  const {
    size,
    center,
    shopList,
    infoWindowOption,
    onGoogleMapsScript,
    onLoadMap,
    onClickMarker,
    onCloseInfoWindow,
  } = props;
  const { isLoading } = useMapLoading();

  return (
    <div className="relative">
      <LoadScript
        googleMapsApiKey="AIzaSyB5KlhSNJ37deePhGn1Can7L1uK0MaFT_M"
        onLoad={onGoogleMapsScript}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={center}
          zoom={16}
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
          {infoWindowOption && (
            <InfoWindow
              position={{
                lat: infoWindowOption.lat,
                lng: infoWindowOption.lng,
              }}
              options={{ pixelOffset: size }}
              onCloseClick={onCloseInfoWindow}
            >
              <div>
                <p className="flex justify-center font-bold text-base">
                  {infoWindowOption.name}
                </p>
                <img
                  className="max-w-full mt-2 mx-auto"
                  src={infoWindowOption.photo.pc.l}
                  alt={infoWindowOption.name}
                />
                <p className="text-sm text-blue-600 mt-2">
                  <a
                    className="break-words hover:underline"
                    href={infoWindowOption.urls.pc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {infoWindowOption.urls.pc}
                  </a>
                </p>
                <p className="text-sm mt-1">{infoWindowOption.address}</p>
                <p className="text-sm mt-1">{infoWindowOption.open}</p>
              </div>
            </InfoWindow>
          )}
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
