import { PropsWithChildren, useEffect } from 'react';

export interface ModalOverlayProps {
  target: string;
  onClose: () => void;
}

export function ModalOverlay({ children, target, onClose }: PropsWithChildren<ModalOverlayProps>) {

  const onClickEsc = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.addEventListener('keydown', onClickEsc);

    return () => {
      document.removeEventListener('keydown', onClickEsc);
    };
  }, []);

  return (
    <div className={ `popup-form popup-form--${target}` }>
      <section className="popup" style={ { minHeight: `${window.outerHeight}px` } }>
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оставить отзыв</h2>
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
