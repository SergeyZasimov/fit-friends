import { useState } from 'react';

export interface CustomerGymCardSliderProps {
  photos: string[] | undefined;
}

export function CustomerGymCardSlider({ photos }: CustomerGymCardSliderProps) {

  const [ count, setCount ] = useState<number>(0);

  const handlePrevClick = () => {
    if (count < 0) {
      setCount(count + 1);
    }
  };

  const handleNextClick = () => {
    if (photos && Math.abs(count - 1) < photos.length) {
      setCount(count - 1);
    }
  };

  if (!photos) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <section className="slider-gyms" style={ { justifyContent: 'end' } }>
      <h2 className="visually-hidden">Слайдер с фотографиями спортивных залов.</h2>
      <ul className="slider-gyms__list">
        <li>
          <button
            className="btn-icon slider-gyms__btn slider-gyms__btn--prev"
            type="button"
            aria-label="prev"
            onClick={ handlePrevClick }
            style={ { zIndex: '1' } }
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon slider-gyms__btn slider-gyms__btn--next"
            type="button"
            aria-label="next"
            onClick={ handleNextClick }
            style={ { zIndex: '1' } }
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </li>
        {
          photos.map((photo, index) => (
            <li
              className={ `slider-gyms__slide slider-gyms__slide ${Math.abs(count) === index ? 'slider-gyms__slide--current' : ''} ` }
              key={ photo }
            >
              <div className="slider-gyms__img">
                <img src={ photo }
                  width="826"
                  height="773"
                  alt="Фото спортивного снаряжения." />
              </div>
            </li>
          ))
        }
      </ul>
    </section >
  );
}

export default CustomerGymCardSlider;
