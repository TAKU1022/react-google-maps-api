import { GoogleMap, LoadScript } from '@react-google-maps/api';

function App() {
  return (
    <div className="max-w-4xl mx-auto">
      <LoadScript googleMapsApiKey="AIzaSyB5KlhSNJ37deePhGn1Can7L1uK0MaFT_M">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: 38, lng: 137.5936 }}
          zoom={5}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
