import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  location: number[]
): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const mapInstance = new Map(mapRef.current, {
        center: {
          lat: location[0],
          lng: location[1],
        },
        zoom: 5,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      mapInstance.addLayer(layer);
      setMap(mapInstance);
      isRenderedRef.current = true;
    }
  }, [mapRef]);

  return map;
};
