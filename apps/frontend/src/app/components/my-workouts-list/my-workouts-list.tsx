import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts } from '../../store/features/workout/workout-slice';
import { useAppSelector } from '../../store/store.hooks';

export const DEFAULT_OFFSET = 6;

export function MyWorkoutsList() {

  const workouts = useAppSelector(getWorkouts);

  const [ offset, setOffset ] = useState(DEFAULT_OFFSET);

  useEffect(() => {
    setOffset(DEFAULT_OFFSET);
  }, [ workouts ]);

  const handleAddOffset = () => {
    setOffset(prevState => {
      return prevState + DEFAULT_OFFSET;
    });
  };

  const handleUpClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!workouts) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <ul className="my-trainings__list">
        {
          workouts.slice(0, offset).map((workout) => (
            <li className="my-trainings__item" key={ workout.id }>
              <div className="thumbnail-training">
                <div className="thumbnail-training__inner">
                  <div className="thumbnail-training__image">
                    <picture>
                      <img
                        src={ workout.backgroundImage }
                        width="330"
                        height="190"
                        alt={ workout.backgroundImage }
                      />
                    </picture>
                  </div>
                  {
                    workout.price > 0 ?
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">{ workout.price }</span><span>₽</span>
                      </p>
                      :
                      <p className="thumbnail-training__price">Бесплатно</p>
                  }
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
                    <p className="thumbnail-training__text">
                      { workout.description }
                    </p>
                  </div>
                  <div className="thumbnail-training__button-wrapper">
                    <Link to={ `${workout?.id}` } className="btn btn--small thumbnail-training__button-catalog" >Подробнее</Link>
                    <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul >
      <div className="show-more my-trainings__show-more">
        {
          workouts.length !== workouts.slice(0, offset).length
            ?
            <button
              className="btn show-more__button show-more__button--more"
              type="button"
              onClick={ handleAddOffset }
            >
              Показать еще
            </button>
            :
            <button
              className="btn show-more__button"
              type="button"
              onClick={ handleUpClick }
            >Вернуться в начало</button>
        }

      </div >
    </>
  );
}

export default MyWorkoutsList;
