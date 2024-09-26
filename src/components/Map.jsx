import { useContext, useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { SectionContext } from "../context/SectionContext";

function Map() {
    const mapsApiKey = import.meta.env.VITE_MAPS_API_KEY; // Usa la variable de entorno correcta
    const { map, setMap } = useContext(SectionContext);
    const [mapInstance, setMapInstance] = useState(null); // Instancia del mapa
    const [marker, setMarker] = useState(null); // Instancia del marcador
    const [autocomplete, setAutocomplete] = useState(null); // Autocomplete de Google Places
    const [lat, setLat] = useState(null); // Latitud
    const [lng, setLng] = useState(null); // Longitud
    const [address, setAddress] = useState(""); // Dirección ingresada por el usuario

    // Cargar el script de Google Maps y crear el mapa
    useEffect(() => {
        if (map && !mapInstance) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`;
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                const mapOptions = {
                    center: { lat: 37.7749, lng: -122.4194 }, // Centro inicial (ejemplo: San Francisco)
                    zoom: 15, // Zoom inicial
                };
                const mapDiv = document.getElementById('google-map');
                const newMap = new window.google.maps.Map(mapDiv, mapOptions);
                setMapInstance(newMap);

                // Inicializa el Autocomplete una vez que el mapa se ha cargado
                const input = document.getElementById('autocomplete-input');
                const autocompleteInstance = new window.google.maps.places.Autocomplete(input);
                autocompleteInstance.bindTo('bounds', newMap);
                setAutocomplete(autocompleteInstance);
            };
        }
    }, [map, mapInstance, mapsApiKey]);

    // Actualiza el mapa y coloca el marcador en la dirección seleccionada
    useEffect(() => {
        if (autocomplete) {
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                    alert("No se encontró información geográfica para esa dirección.");
                    return;
                }

                // Obtener la ubicación (latitud y longitud)
                const location = place.geometry.location;
                const newLat = location.lat();
                const newLng = location.lng();

                // Actualizar el centro del mapa y el marcador
                mapInstance.setCenter(location);
                mapInstance.setZoom(15); // Zoom cercano

                // Si ya existe un marcador, eliminarlo
                if (marker) {
                    marker.setMap(null);
                }

                // Crear un nuevo marcador
                const newMarker = new window.google.maps.Marker({
                    position: location,
                    map: mapInstance,
                });

                // Guardar el marcador y las coordenadas en el estado
                setMarker(newMarker);
                setLat(newLat);
                setLng(newLng);
            });
        }
    }, [autocomplete, mapInstance, marker]);

    return (
        <section className={`w-screen h-screen bg-secondary lg:bg-black z-50 lg:bg-opacity-30 flex bottom-0 fixed items-end lg:items-center justify-center transition-all ${(map) ? "fixed" : "hidden"}`}>
            <div className="w-full h-screen fixed bg-secondary lg:w-2/3 lg:rounded-xl lg:h-3/4">
                <div className="absolute w-full lg:rounded-t-lg top-0 h-20 bg-primary z-20 flex items-center justify-between px-6">
                    <input 
                        id="autocomplete-input"
                        type="text" 
                        className="px-3 outline-none font-semibold py-2 bg-secondary rounded-lg text-lg w-3/4 lg:w-1/2" 
                        placeholder="Ingresa una dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <RiCloseCircleFill className="text-5xl flex text-secondary cursor-pointer hover:text-third transition-all z-20" onClick={() => setMap(false)} />
                </div>
                {/* Mapa */}
                <div id="google-map" className="w-full h-full bg-secondary rounded-xl"></div>
            </div>
        </section>
    );
}

export default Map;
