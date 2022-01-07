import { memo, VFC } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type Props = {
  isLoading: boolean;
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  zoom: number;
  markerLocations: google.maps.LatLng[] | google.maps.LatLngLiteral[];
  onLoadMap: (map: google.maps.Map) => void;
};

export const MapView: VFC<Props> = memo((props) => {
  const { isLoading, center, zoom, markerLocations, onLoadMap } = props;

  return (
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
  );
});
