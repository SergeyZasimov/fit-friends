import { SortOption, Workout, WorkoutQuery } from '@fit-friends/shared';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSlider } from '../../../../hooks/use-slider';
import { AppRoute } from '../../../../utils/constants';
import { createQueryString } from '../../../../utils/helpers';
import { useFetchWorkouts } from '../../hooks/use-fetch-workouts';

const SLIDE_QUANTITY = 4;

export function CustomerPopularWorkoutsList() {
  const navigate = useNavigate();
  const slideRef = useRef<HTMLLIElement>(null);
  const offset = (slideRef.current && (slideRef.current as HTMLLIElement).getBoundingClientRect().width);

  const query: WorkoutQuery = {
    limit: 8,
    sortOption: SortOption.Rating
  };
  const popularWorkouts = useFetchWorkouts(createQueryString(query));

  const { handleNextClick, handlePrevClick, style } = useSlider(offset as number, SLIDE_QUANTITY, popularWorkouts.length);

  const handleWorkoutsButtonClick = () => {
    navigate(`/${AppRoute.CustomerWorkoutCatalog}`);
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper slider-overflow-hidden">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
              onClick={ handleWorkoutsButtonClick }
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
                onClick={ handlePrevClick }
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control"
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
          <ul className="popular-trainings__list">
            {
              popularWorkouts.map((workout: Workout) => (
                <li className="popular-trainings__item"
                  key={ workout.id }
                  style={ { ...style } }
                  ref={ slideRef }
                >
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <img
                            src={ workout.backgroundImage }
                            width="330"
                            height="190"
                            alt={ workout.title }
                          />
                        </picture>
                      </div>
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">{ workout.price }</span><span>₽</span>
                      </p>
                      <h3 className="thumbnail-training__title">{ workout.title }</h3>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag"><span>#{ workout.trainingType }</span></div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag"><span>#{ workout.caloriesAmountToLose }ккал</span></div>
                          </li>
                        </ul>
                        <div className="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg><span className="thumbnail-training__rate-value">{ workout.rating }</span>
                        </div>
                      </div>
                      <div className="thumbnail-training__text-wrapper">
                        <p className="thumbnail-training__text">{ workout.description }</p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                        <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CustomerPopularWorkoutsList;
