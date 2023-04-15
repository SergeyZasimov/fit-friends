import { useRef } from 'react';
import { useSlider } from '../../hooks/use-slider';
import { updateUser } from '../../store/features/user/api-actions';
import { useAppDispatch } from '../../store/store.hooks';
import CertificateSlide from '../certificate-slide/certificate-slide';

const CERTIFICATE_QUANTITY = 3;

export interface CertificateSliderProps {
  certificates: string[];
}

export function CertificateSlider({ certificates }: CertificateSliderProps) {
  const dispatch = useAppDispatch();
  const slideRef = useRef<HTMLLIElement>(null);
  const offset = (slideRef.current && (slideRef.current as HTMLLIElement).getBoundingClientRect().width);

  const { handleNextClick, handlePrevClick, style } = useSlider(offset as number, CERTIFICATE_QUANTITY, certificates.length);


  const handleAddCertificate = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg, .png';
    input.click();
    input.onchange = () => {
      if (input.files) {
        dispatch(updateUser({ certificate: input.files[ 0 ] }));
      }
    };
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button
          className="btn-flat btn-flat--underlined personal-account-coach__button"
          type="button"
          onClick={ handleAddCertificate }
        >
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg><span>Загрузить</span>
        </button>
        <div className="personal-account-coach__controls">
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="previous"
            onClick={ handlePrevClick }
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="next"
            onClick={ handleNextClick }
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className="personal-account-coach__list slider">
        {
          certificates.map((item) => (
            <CertificateSlide
              certificate={ item }
              key={ item }
              slideRef={ slideRef }
              style={ style }
            />
          )
          )
        }
      </ul>
    </div >
  );
}

export default CertificateSlider;
