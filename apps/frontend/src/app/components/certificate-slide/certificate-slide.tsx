import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store.hooks';
import { deleteCertificate } from '../../store/features/user/api-actions';


export interface CertificateSlideProps {
  certificate: string;
  count: number;
}

export function CertificateSlide({ certificate, count }: CertificateSlideProps) {

  const dispatch = useAppDispatch();

  const [ isChangeOpen, setIsChangeOpen ] = useState(false);

  const certificateCardClass = classNames({
    'certificate-card': true,
    'certificate-card--edit': isChangeOpen
  });

  const handleDeleteCertificateClick = () => {
    dispatch(deleteCertificate({ certificate }));
  };

  return (
    <li className='personal-account-coach__item' style={ { transform: `translateX(${106 * count}%)` } }   >
      <div className={ certificateCardClass }>
        <div className="certificate-card__image">
          <picture>
            <img
              src={ certificate }
              width="294"
              height="360"
              alt={ certificate }
            />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          {
            !isChangeOpen ?
              <button
                className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                type="button"
                onClick={ () => setIsChangeOpen(!isChangeOpen) }
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-edit"></use>
                </svg>
                <span>Изменить</span>
              </button>
              :
              <>
                <button
                  className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                  type="button"
                  onClick={ () => setIsChangeOpen(!isChangeOpen) }
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>Сохранить</span>
                </button>
                <div className="certificate-card__controls">
                  <button
                    className="btn-icon certificate-card__control"
                    type="button"
                    aria-label="next"
                  >
                    <svg width="16" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-change"></use>
                    </svg>
                  </button>
                  <button
                    className="btn-icon certificate-card__control"
                    type="button"
                    aria-label="next"
                    onClick={ handleDeleteCertificateClick }
                  >
                    <svg width="14" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-trash"></use>
                    </svg>
                  </button>
                </div>
              </>
          }
        </div>
      </div>
    </li>);
}

export default CertificateSlide;
