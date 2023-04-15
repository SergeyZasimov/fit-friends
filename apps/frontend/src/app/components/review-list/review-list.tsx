import { UserRole } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import CreateReviewPopup from '../../pages/workout-card/components/create-review-popup/create-review-popup';
import { browserHistory } from '../../services/browser-history.service';
import { fetchReviews } from '../../store/features/review/api-actions';
import { getReviews } from '../../store/features/review/review-slice';
import { getUser } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';

export interface ReviewListProps {
  workoutId: string;
}

export function ReviewList({ workoutId }: ReviewListProps) {

  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const user = useAppSelector(getUser);
  const [ isCreateReviewModalOpen, setIsCreateReviewModalOpen ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchReviews(workoutId));
  }, []);

  const handleCloseReviewModal = () => {
    setIsCreateReviewModalOpen(false);
  };

  if (!reviews) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      { isCreateReviewModalOpen && <CreateReviewPopup onClose={ handleCloseReviewModal } workoutId={ workoutId } /> }

      <aside className="reviews-side-bar">
        <button
          className="btn-flat btn-flat--underlined reviews-side-bar__back"
          type="button"
          onClick={ () => browserHistory.back() }
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg><span>Назад</span>
        </button>
        <h2 className="reviews-side-bar__title">Отзывы</h2>
        <ul className="reviews-side-bar__list">
          { reviews.map(item => (
            <li className="reviews-side-bar__item" key={ item.id }>
              <div className="review">
                <div className="review__user-info">
                  <div className="review__user-photo">
                    <picture>
                      <img src={ item.user?.profile?.avatar as string }
                        width="64"
                        height="64"
                        alt={ item.user?.profile?.name }
                      />
                    </picture>
                  </div><span className="review__user-name">{ item.user?.profile?.name }</span>
                  <div className="review__rating">
                    <svg width="16" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg><span>{ item.rating }</span>
                  </div>
                </div>
                <p className="review__comment">{ item.text }</p>
              </div>
            </li>

          )) }
        </ul>
        <button
          className="btn btn--medium reviews-side-bar__button"
          type="button"
          disabled={ user?.role === UserRole.Trainer }
          onClick={ () => setIsCreateReviewModalOpen(true) }
        >
          Оставить отзыв
        </button>
      </aside>
    </>

  );
}

export default ReviewList;
