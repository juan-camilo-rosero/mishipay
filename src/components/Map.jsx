import { useContext, useEffect, useState } from "react";
import { RiCloseCircleFill, RiMapPin2Fill } from "react-icons/ri";
import { SectionContext } from "../context/SectionContext";

// Lista de sucursales (nombre y coordenadas)
const ubicacionesBancosBogota = {
    "Banco de Bogotá - Carrera 7 #32-33": [4.6172, -74.0645],
    "Banco de Bogotá - Calle 72 #10-35": [4.6612, -74.0541],
    "Banco de Bogotá - Carrera 11 #100-65": [4.6778, -74.0487],
    "Banco de Bogotá - Calle 13 #65-10": [4.6192, -74.0990],
    "Banco de Bogotá - Carrera 5 #16-50": [4.6067, -74.0693],
    "Banco de Bogotá - Calle 26 #33-64": [4.6285, -74.0861],
    "Banco de Bogotá - Calle 93A #12-30": [4.6765, -74.0439],
    "Banco de Bogotá - Carrera 15 #100-43": [4.6771, -74.0480],
    "Davivienda - Carrera 8 #14-24": [4.6044, -74.0703],
    "Davivienda - Calle 108 #45-30": [4.6976, -74.0557],
    "Davivienda - Calle 140 #91-19": [4.7320, -74.0728],
    "Davivienda - Calle 147 #7-84": [4.7363, -74.0312],
    "Davivienda - Calle 170 #69-15": [4.7543, -74.0486],
    "Davivienda - Calle 134 #13-83": [4.7243, -74.0548],
    "Davivienda - Carrera 71D 5S-1": [4.6287, -74.1403],
    "Davivienda - Calle 116 #45-94": [4.7023, -74.0545],
    "Bancolombia Avenida 19 101-91": [4.6825, -74.0508],
    "Bancolombia Avenida 68 39-92": [4.6404, -74.0931],
    "Bancolombia Calle 100 8A-17": [4.6834, -74.0487],
    "Bancolombia Calle 13 37-51": [4.6123, -74.0930],
    "Bancolombia Calle 122 #21-70": [4.7095, -74.0482],
    "Bancolombia Calle 67 25-09": [4.6514, -74.0643],
    "Bancolombia Calle 97 23-60": [4.6852, -74.0605],
    "Bancolombia Carrera 10A 21-70": [4.6096, -74.0751],
    "Bancolombia Carrera 16A 84-93": [4.6747, -74.0491]
};

// Función para convertir grados a radianes
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Función para calcular la distancia entre dos coordenadas (fórmula de Haversine)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
}

// Implementación de una cola de prioridad usando un MinHeap
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(element) {
        this.heap.push(element);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min;
    }

    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild[0] < element[0]) swap = leftChildIndex;
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild[0] < element[0]) ||
                    (swap !== null && rightChild[0] < leftChild[0])
                )
                    swap = rightChildIndex;
            }
            if (swap === null) break;
            [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
            index = swap;
        }
    }

    size() {
        return this.heap.length;
    }
}

// Función principal para ordenar las sucursales por distancia
function ordenarSucursales(latUsuario, lonUsuario) {
    const minHeap = new MinHeap();

    // Calcular distancias y agregarlas a la cola de prioridad
    for (const [nombre, [latSucursal, lonSucursal]] of Object.entries(ubicacionesBancosBogota)) {
        const distancia = calcularDistancia(latUsuario, lonUsuario, latSucursal, lonSucursal);
        minHeap.insert([distancia, nombre, latSucursal, lonSucursal]);
    }

    // Extraer las sucursales ordenadas por distancia
    const sucursalesOrdenadas = [];
    while (minHeap.size() > 0) {
        const [distancia, nombre, latSucursal, lonSucursal] = minHeap.extractMin();
        sucursalesOrdenadas.push({ nombre, distancia, latSucursal, lonSucursal });
    }

    return sucursalesOrdenadas;
}

function Map() {
    const mapsApiKey = import.meta.env.VITE_MAPS_API_KEY; // Usa la variable de entorno correcta
    const { map, setMap } = useContext(SectionContext);
    const [mapInstance, setMapInstance] = useState(null); // Instancia del mapa
    const [atm, setAtm] = useState(false);
    const [marker, setMarker] = useState(null); // Instancia del marcador
    const [autocomplete, setAutocomplete] = useState(null); // Autocomplete de Google Places
    const [lat, setLat] = useState(4.6097); // Latitud inicial (Bogotá)
    const [lng, setLng] = useState(-74.0817); // Longitud inicial (Bogotá)
    const [address, setAddress] = useState(""); // Dirección ingresada por el usuario
    const [cajerosCercanos, setCajerosCercanos] = useState([]);

    // Cargar el script de Google Maps y crear el mapa
    useEffect(() => {
        if (map && !mapInstance) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`;
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                const mapOptions = {
                    center: { lat: 4.6097, lng: -74.0817 }, // Centro inicial en Bogotá
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

    // Calcular los cajeros cercanos cada vez que cambien las coordenadas del usuario
    useEffect(() => {
        if (lat && lng) {
            const cajeros = ordenarSucursales(lat, lng);
            setCajerosCercanos(cajeros);
        }
    }, [lat, lng]);

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
                <div id="google-map" className="w-full h-full bg-secondary rounded-xl"></div>
                <div className="fixed bottom-24 h-20 w-full lg:w-2/3 lg:rounded-b-xl lg:bottom-[12.5vh] bg-primary z-30 flex items-center justify-center">
                    <button className="py-2 px-10 rounded-lg bg-secondary text-primary text-xl font-semibold" onClick={() => setAtm(true)}>Ver cajeros cercanos</button>
                </div>
            </div>
            <div className={`w-screen h-screen top-20 bg-secondary z-50 lg:w-2/3 lg:h-3/4 lg:top-[12.5vh] lg:rounded-xl flex flex-col fixed overflow-y-auto justify-start items-center px-6 pt-8 pb-32 lg:pb-8 lg:items-center transition-all ${(atm) ? "fixed" : "hidden"}`}>
                <h2 className="text-center text-primary text-3xl font-semibold">Cajeros cercanos:</h2>
                <ol className="font-medium text-xl text-black mt-6 flex flex-col gap-6 pb-24 lg:pb-0">
                    {cajerosCercanos.map((cajero, index) => (
                        <details key={index} className="px-2 transition-all bg-third py-3 rounded-lg">
                            <summary>{index + 1}. {cajero.nombre}</summary>
                            <p className="mt-6"><span className="font-semibold text-primary">distancia:</span> {cajero.distancia.toFixed(2)} km</p>
                            <button className="mt-8 py-2 px-8 rounded-lg bg-primary flex items-center justify-center" onClick={e => {
                                console.log(cajero);
                                
                                const customPosition = new google.maps.LatLng(cajero.latSucursal, cajero.lonSucursal);
                                const newMarker = new window.google.maps.Marker({
                                    position: customPosition,
                                    map: mapInstance,
                                });
                                setMarker(newMarker)
                                mapInstance.setCenter(customPosition)
                                setAtm(false)
                            }}>
                                <RiMapPin2Fill className="text-secondary text-2xl"/>
                                <p className="ml-3 text-secondary font-semibold">Ver en el mapa</p>
                            </button>
                        </details>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default Map;
