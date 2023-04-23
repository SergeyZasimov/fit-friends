import { Workout, WorkoutQuery } from '@fit-friends/shared';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSlider } from '../../../../hooks/use-slider';
import { getUser } from '../../../../store/features/user/user-slice';
import { useAppSelector } from '../../../../store/store.hooks';
import { AppRoute } from '../../../../utils/constants';
import { createQueryString } from '../../../../utils/helpers';
import { useFetchWorkouts } from '../../hooks/use-fetch-workouts';

const SLIDE_QUANTITY = 3;


export function CustomerSpecialWorkoutsSlider() {
  const user = useAppSelector(getUser);
  const slideRef = useRef<HTMLLIElement>(null);

  const query: WorkoutQuery = {
    limit: 9,
    trainingType: user?.profile?.trainingType
  };
  const specialWorkouts = useFetchWorkouts(createQueryString(query));

  const offset = (slideRef.current && (slideRef.current as HTMLLIElement).getBoundingClientRect().width);

  const { handleNextClick, handlePrevClick, style } = useSlider(offset as number, SLIDE_QUANTITY, specialWorkouts.length);

  return (
    <section className="special-for-you">
      <div className="container slider-overflow-hidden">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="previous"
                onClick={ handlePrevClick }
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control"
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
          <ul className="special-for-you__list">
            { specialWorkouts.map((workout: Workout) => (
              <li className="special-for-you__item"
                key={ workout.id }
                style={ { ...style } }
                ref={ slideRef }
              >
                <div className="thumbnail-preview">
                  <div className="thumbnail-preview__image">
                    <picture>
                      <img src={ workout.backgroundImage }
                        width="452"
                        height="191"
                        alt="" />
                    </picture>
                  </div>
                  <div className="thumbnail-preview__inner">
                    <h3 className="thumbnail-preview__title">{ workout.trainingType }</h3>
                    <div className="thumbnail-preview__button-wrapper">
                      <Link
                        className="btn btn--small thumbnail-preview__button"
                        to={ `/${AppRoute.WorkoutCard}/${workout.id}` }
                      >Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )) }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CustomerSpecialWorkoutsSlider;
