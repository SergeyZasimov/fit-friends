import { useRef } from 'react';
import { useSlider } from '../../hooks/use-slider';
import ModalOverlay from '../modal-overlay/modal-overlay';

const CERTIFICATES_QUANTITY = 1;

export interface CertificatesPopupProps {
  onClose: () => void;
  certificates: string[];
  title: string;
}

export function CertificatesPopup({ onClose, certificates, title }: CertificatesPopupProps) {

  const slideRef = useRef<HTMLLIElement>(null);
  const offset = slideRef.current && (slideRef.current as HTMLLIElement).getBoundingClientRect().width;
  const { handleNextClick, handlePrevClick, style } = useSlider(offset as number, CERTIFICATES_QUANTITY, certificates.length);

  return (
    <ModalOverlay title={ title } onClose={ onClose } >
      <div className="popup__content popup__content--certificates" style={ { height: '505px' } }>
        <div className="popup__slider-buttons">
          <button
            className="btn-icon popup__slider-btn popup__slider-btn--prev"
            type="button"
            aria-label="prev"
            onClick={ handlePrevClick }
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon popup__slider-btn popup__slider-btn--next"
            type="button"
            aria-label="next"
            onClick={ handleNextClick }
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
        <ul className="popup__slider-list certificates-slider">
          { certificates.map(image => (
            <li
              key={ image }
              className="popup__slide popup__slide--current certificates-slide"
              ref={ slideRef }
              style={ { ...style } }
            >
              <div className="popup__slide-img">
                <picture>
                  <img
                    src={ image }
                    width="294"
                    height="360"
                    alt="" />
                </picture>
              </div>
            </li>
          )) }
        </ul>
      </div>
    </ModalOverlay>
  );
}

export default CertificatesPopup;
