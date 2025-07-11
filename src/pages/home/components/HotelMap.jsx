import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function HotelMap() {
  const position = [-37.814, 144.9631];

  return (
    <section className="py-12 lg:py-16">
      <div className="container px-4 md:px-6 text-center mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Find Us Here
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mb-12">
          Our prime location offers easy access to local attractions and
          stunning views.
        </p>

        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[400px] rounded overflow-hidden shadow">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>📍 Our Hotel Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
