import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { useMap } from '../../hooks/use-map';
import ModalOverlay from '../modal-overlay/modal-overlay';


const DEFAULT_ICON = new Icon({
  iconUrl: 'assets/img/sprite/icon-pin-user.svg',
  iconSize: [ 40, 40 ],
  iconAnchor: [ 20, 40 ]
});

const DEFAULT_ZOOM = 17;

const COORDINATES = {
  'Пионерская': [ 60.002503, 30.296509 ],
  'Петроградская': [ 59.966444, 30.311421 ],
  'Удельная': [ 60.016685, 30.315697 ],
  'Звёздная': [ 59.833249, 30.349447 ],
  'Спортивная': [ 59.949798, 30.299195 ]
};

export interface MapPopupProps {
  onClose: () => void;
  title: string;
  address: string;
}

export function MapPopup({ onClose, title, address }: MapPopupProps) {

  const location = COORDINATES[ address as keyof typeof COORDINATES ];

  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView({ lat: location[ 0 ], lng: location[ 1 ] }, DEFAULT_ZOOM, { animate: true });

      const marker = new Marker({
        lat: location[ 0 ],
        lng: location[ 1 ]
      });
      marker.setIcon(DEFAULT_ICON).addTo(map);
    }
  }, [ map ]);

  return (
    <ModalOverlay title={ title } onClose={ onClose } address={ address }>
      <div className="popup__content-map">
        <div className="popup__map" ref={ mapRef } style={ { minHeight: '505px' } }>
        </div>
      </div>

    </ModalOverlay>
  );
}

export default MapPopup;
