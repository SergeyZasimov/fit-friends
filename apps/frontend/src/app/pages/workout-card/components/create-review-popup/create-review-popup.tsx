import { CreateReview } from '@fit-friends/shared';
import { useEffect, useRef, useState } from 'react';
import ModalOverlay from '../../../../components/modal-overlay/modal-overlay';
import { createReview } from '../../../../store/features/review/api-actions';
import { getReviewRequestStatus, resetReviewStatus } from '../../../../store/features/review/review-slice';
import { fetchWorkout } from '../../../../store/features/workout/api-actions';
import { useAppDispatch, useAppSelector } from '../../../../store/store.hooks';
import { RequestStatus } from '../../../../utils/constants';

export interface CreateReviewPopupProps {
  workoutId: string;
  onClose: () => void;
  title: string;
}

export function CreateReviewPopup({ workoutId, onClose, title }: CreateReviewPopupProps) {

  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(getReviewRequestStatus);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const [ newRating, setNewRating ] = useState<number>(0);

  const handleSubmit = () => {
    const newReview: CreateReview = {
      rating: newRating,
      text: (textRef.current as HTMLTextAreaElement).value,
      workoutId: parseInt(workoutId)
    };

    dispatch(createReview(newReview)).then(() => dispatch(fetchWorkout(workoutId)));
  };

  useEffect(() => {
    if (requestStatus === RequestStatus.Success) {
      onClose();
      dispatch(resetReviewStatus());
    }

  }, [ requestStatus ]);

  return (
    <ModalOverlay onClose={ onClose } target='feedback' title={ title }>
      <div className="popup__content popup__content--feedback">
        <h3 className="popup__feedback-title">Оцените тренировку</h3>
        <ul className="popup__rate-list">
          {
            Array.from({ length: 5 }, (_, index) => {
              const rating = index + 1;
              return <li className="popup__rate-item" key={ rating }>
                <div className="popup__rate-item-wrap">
                  <label>
                    <input type="radio" name="оценка тренировки"
                      aria-label={ `оценка${rating}` } value={ rating }
                      onChange={ () => setNewRating(rating) }
                    />
                    <span className="popup__rate-number">{ rating }</span>
                  </label>
                </div>
              </li>;
            })
          }
        </ul>
        <div className="popup__feedback">
          <h3 className="popup__feedback-title popup__feedback-title--text">
            Поделитесь своими впечатлениями о тренировке
          </h3>
          <div className="popup__feedback-textarea">
            <div className="custom-textarea">
              <label>
                <textarea
                  name="description"
                  ref={ textRef }
                ></textarea>
              </label>
            </div>
          </div>
        </div>
        <div className="popup__button">
          <button className="btn" type="button"
            onClick={ handleSubmit }
          >Продолжить</button>
        </div>
      </div>
    </ModalOverlay>
  );
}

export default CreateReviewPopup;
