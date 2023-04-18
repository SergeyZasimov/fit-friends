import { UrlDomain, UrlRoute, Workout } from '@fit-friends/shared';
import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSlider } from '../../../../hooks/use-slider';
import { createApi } from '../../../../services/api.service';
import { AppRoute } from '../../../../utils/constants';


const TRAINER_WORKOUT_QUANTITY = 4;

export interface TrainerWorkoutsSliderProps {
  trainerId: string;
}

export function TrainerWorkoutsSlider({ trainerId }: TrainerWorkoutsSliderProps) {
  const api = createApi();
  const [ workouts, setWorkouts ] = useState<Workout[]>([]);
  const slideRef = useRef<HTMLLIElement>(null);
  const offset = slideRef.current && (slideRef.current as HTMLLIElement).getBoundingClientRect().width;
  const { handleNextClick, handlePrevClick, style } = useSlider(offset as number, TRAINER_WORKOUT_QUANTITY, workouts.length);

  const fetchTrainerWorkouts = async () => {
    const { data } = await api.get(`/${UrlDomain.Workout}/${UrlRoute.Trainer}/${trainerId}`);
    setWorkouts(data);
  };

  useEffect(() => {
    fetchTrainerWorkouts();
  }, [ trainerId ]);

  return (
    <>
      <div className="user-card-coach__training-head">
        <h2 className="user-card-coach__training-title">Тренировки</h2>
        <div className="user-card-coach__training-bts">
          <button
            className="btn-icon user-card-coach__training-btn"
            type="button"
            aria-label="back"
            onClick={ handlePrevClick }
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon user-card-coach__training-btn"
            type="button"
            aria-label="next"
            onClick={ handleNextClick }
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className="user-card-coach__training-list slider-overflow-hidden">
        { workouts.map(workout => (
          <li
            className="user-card-coach__training-item"
            key={ workout.id }
            ref={ slideRef }
            style={ { ...style } }
          >
            <div className="thumbnail-training">
              <div className="thumbnail-training__inner">
                <div className="thumbnail-training__image">
                  <picture>
                    <img
                      src={ workout.backgroundImage }
                      width="330" height="190" alt="" />
                  </picture>
                </div>
                <p className="thumbnail-training__price">
                  <span className="thumbnail-training__price-value">{ workout.price }</span><span>₽</span>
                </p>
                <h3 className="thumbnail-training__title">Power</h3>
                <div className="thumbnail-training__info">
                  <ul className="thumbnail-training__hashtags-list">
                    <li className="thumbnail-training__hashtags-item">
                      <div className="hashtag thumbnail-training__hashtag">
                        <span>#{ workout.trainingType }</span>
                      </div>
                    </li>
                    <li className="thumbnail-training__hashtags-item">
                      <div className="hashtag thumbnail-training__hashtag">
                        <span>#{ workout.caloriesAmountToLose }ккал</span>
                      </div>
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
                  <Link
                    className="btn btn--small thumbnail-training__button-catalog"
                    to={ `/${AppRoute.WorkoutCard}/${workout.id}` }
                  >
                    Подробнее
                  </Link>
                  <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                </div>
              </div>
            </div>
          </li>
        )) }
      </ul>
    </>
  );
}

export default memo(TrainerWorkoutsSlider);
