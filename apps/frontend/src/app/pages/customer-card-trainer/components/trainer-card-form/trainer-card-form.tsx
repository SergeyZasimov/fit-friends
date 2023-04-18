import { CreatePersonalTraining, UrlDomain, UrlRoute } from '@fit-friends/shared';
import { AxiosError, HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { createApi } from '../../../../services/api.service';

export interface TrainerCardFormProps {
  isFriend: boolean;
  isReadyToPersonalTraining: boolean;
  trainerId: string;
}

export function TrainerCardForm({ isReadyToPersonalTraining, trainerId, isFriend }: TrainerCardFormProps) {
  const api = createApi();
  const [ isSubscription, setIsSubscription ] = useState<boolean>(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const addSubscribe = async () => {
    await api.post(`/${UrlDomain.Subscription}/${trainerId}`);
    setIsSubscription(true);
  };

  const removeSubscription = async () => {
    await api.delete(`/${UrlDomain.Subscription}/${trainerId}`);
    setIsSubscription(false);
  };

  const checkSubscription = async () => {
    try {
      await api.get(`/${UrlDomain.Subscription}/${UrlRoute.CheckSubscription}/${trainerId}`);
      setIsSubscription(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === HttpStatusCode.NotFound) {
          setIsSubscription(false);
        }
      }
    }

  };

  const createPersonalTrainingRequest = async () => {
    const dto: CreatePersonalTraining = {
      conductorId: parseInt(trainerId)
    };
    await api.post(`/${UrlDomain.PersonalTraining}`, dto);
  };

  const handleChangeSubscription = () => {
    if (isSubscription) {
      removeSubscription();
    } else {
      addSubscribe();
    }
  };

  return (
    <form className="user-card-coach__training-form">
      { isReadyToPersonalTraining && isFriend &&
        <button
          className="btn user-card-coach__btn-training"
          type="button"
          onClick={ createPersonalTrainingRequest }
        >
          Хочу персональную тренировку
        </button>
      }
      <div className="user-card-coach__training-check">
        <div className="custom-toggle custom-toggle--checkbox">
          <label>
            <input
              type="checkbox"
              value="user-agreement-1"
              name="user-agreement"
              checked={ isSubscription }
              onChange={ handleChangeSubscription }
            />
            <span className="custom-toggle__icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg></span>
            <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
          </label>
        </div>
      </div>
    </form >
  );
}

export default TrainerCardForm;
