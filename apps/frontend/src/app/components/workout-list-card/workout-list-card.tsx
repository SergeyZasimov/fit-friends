import { Workout } from '@fit-friends/shared';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';

export interface WorkoutListCardProps {
  workout: Workout;
}

export function WorkoutListCard({ workout }: WorkoutListCardProps) {
  return (
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
          <Link
            to={ `/${AppRoute.WorkoutCard}/${workout?.id}` }
            className="btn btn--small thumbnail-training__button-catalog"
          >
            Подробнее</Link>
          <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
        </div>
      </div>
    </div>
  );
}

export default WorkoutListCard;
