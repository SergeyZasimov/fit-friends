import classNames from 'classnames';
import { PropsWithChildren, useEffect } from 'react';

export interface ModalOverlayProps {
  target?: string;
  onClose: () => void;
  title: string;
  address?: string;
}

export function ModalOverlay({ children, target, onClose, title, address }: PropsWithChildren<ModalOverlayProps>) {

  const onClickEsc = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.addEventListener('keydown', onClickEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onClickEsc);
      document.body.style.overflow = '';
    };
  }, []);

  const modalClass = classNames({
    [ `popup-form popup-form--${target}` ]: !!target,
    'popup-container': !target,
    'popup-form popup-form--map': address
  });

  return (
    <div className={ modalClass }>
      <section className="popup" style={ { minHeight: `${window.outerHeight}px` } }>
        <div className={`popup__wrapper ${address && 'popup__wrapper--map'}`}>
          <div className={`popup-head ${address && 'popup-head--address'}`}>
            <h2 className="popup-head__header">{ title }</h2>
            { address &&
              <p className="popup-head__address">
                <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-location"></use>
                </svg><span>м. { address }</span>
              </p>
            }
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={ onClose }
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          { children }
        </div>
      </section>
    </div>
  );
}

export default ModalOverlay;
