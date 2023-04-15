import { WorkoutQuery } from '@fit-friends/shared';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { createQueryString } from '../../../../utils/helpers';
import { useFetchWorkouts } from '../../hooks/use-fetch-workouts';

const DOT_BUTTON_LABELS = [ "первый слайд", "второй слайд", "третий слайд" ];

export function CustomerPromoWorkoutsSlider() {
  const slideRef = useRef<HTMLLIElement>(null);
  const offset = (slideRef.current && (slideRef.current as HTMLLIElement).getBoundingClientRect().width);

  const query: WorkoutQuery = {
    limit: 3,
    isSpecial: true
  };
  const promoWorkouts = useFetchWorkouts(createQueryString(query));

  const getDiscountPrice = (price: number): number => {
    return Math.floor(price - price * 0.10);
  };

  const [ slideNumber, setSlideNumber ] = useState(0);

  const handleDotButtonClick = (index: number) => {
    setSlideNumber(index);
  };

  const getDotButtonClass = (isActive: boolean) => classNames({
    'promo-slider__slider-dot': true,
    'promo-slider__slider-dot--active': isActive
  });

  return (
    <ul className="special-offers__list slider-overflow-hidden">
      {
        promoWorkouts.map(workout => (
          <li
            className="special-offers__item is-active"
            key={ workout.id }
            ref={ slideRef }
            style={ {
              transform: `translateX(-${offset as number * slideNumber}px)`,
              transition: 'all 0.25s ease',
            } }
          >
            <aside className="promo-slider">
              <div className="promo-slider__overlay"></div>
              <div className="promo-slider__image">
                <img
                  src={ workout.backgroundImage }
                  width="1040"
                  height="469"
                  alt="promo"
                />
              </div>
              <div className="promo-slider__header">
                <h3 className="promo-slider__title">{ workout.trainingType }</h3>
                <div className="promo-slider__logo">
                  <svg width="74" height="74" aria-hidden="true">
                    <use xlinkHref="#logotype"></use>
                  </svg>
                </div>
              </div><span className="promo-slider__text">Горячие предложения на тренировки { workout.trainingType }</span>
              <div className="promo-slider__bottom-container">
                <div className="promo-slider__slider-dots">
                  {
                    DOT_BUTTON_LABELS.map((label, index) => (
                      <button
                        key={ index }
                        className={ getDotButtonClass(index === slideNumber) }
                        aria-label={ label }
                        onClick={ () => handleDotButtonClick(index) }
                      ></button>
                    ))
                  }
                </div>
                <div className="promo-slider__price-container">
                  <p className="promo-slider__price">{ getDiscountPrice(workout.price) } ₽</p>
                  <p className="promo-slider__sup">за занятие</p>
                  <p className="promo-slider__old-price">{ workout.price } ₽</p>
                </div>
              </div>
            </aside>
          </li>
        ))
      }
    </ul>
  );
}

export default CustomerPromoWorkoutsSlider;
