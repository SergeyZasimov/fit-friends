import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CertificatesPopup from '../../components/certificates-popup/certificates-popup';
import Header from '../../components/header/header';
import MapPopup from '../../components/map-popup/map-popup';
import { useFriend } from '../../hooks/use-friend';
import { browserHistory } from '../../services/browser-history.service';
import { fetchUserCard } from '../../store/features/user/api-actions';
import { getUserCard } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import TrainerCardForm from './components/trainer-card-form/trainer-card-form';
import TrainerWorkoutsSlider from './components/trainer-workouts-slider/trainer-workouts-slider';

export function CustomerCardTrainer() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userCard = useAppSelector(getUserCard);
  const [ isCertificatesModalOpen, setIsCertificatesModalOpen ] = useState(false);
  const [ isMapModalOpen, setIsMapOpen ] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCard(id as string));
  }, [ id ]);

  const { handleAddToFriend, isFriend, handleRemoveFromFriend } = useFriend(userCard?.id as number, id as string);

  return (
    <>
      { isCertificatesModalOpen &&
        <CertificatesPopup
          onClose={ () => setIsCertificatesModalOpen(false) }
          certificates={ userCard?.profile?.certificates as string[] }
          title='Сертификаты'
        />
      }
      { isMapModalOpen &&
        <MapPopup
          onClose={ () => setIsMapOpen(false) }
          title={ userCard?.profile?.name as string }
          address={ userCard?.profile?.location as string }
        />
      }
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                className="btn-flat inner-page__back"
                type="button"
                onClick={ () => browserHistory.back() }
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">{ userCard?.profile?.name }</h2>
                        </div>
                        <div className="user-card-coach__label">
                          <svg
                            className="user-card-coach__icon-location"
                            width="12"
                            height="14"
                            aria-hidden="true"
                            onClick={ () => setIsMapOpen(true) }
                          >
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <span>{ userCard?.profile?.location }</span>
                        </div>
                        <div className="user-card-coach__status-container">
                          <div className="user-card-coach__status user-card-coach__status--tag">
                            <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-cup"></use>
                            </svg><span>Тренер</span>
                          </div>
                          { userCard?.profile?.isReadyToPersonalTraining
                            ?
                            <div className="user-card-coach__status user-card-coach__status--check">
                              <span>Готов тренировать</span>
                            </div>
                            :
                            <div className="user-card-coach-2__status user-card-coach-2__status--check">
                              <span>Не готов тренировать</span>
                            </div>
                          }
                        </div>
                        <div className="user-card-coach__text">
                          { userCard?.profile?.resume }
                        </div>
                        <button
                          className="btn-flat user-card-coach__sertificate"
                          type="button"
                          onClick={ () => setIsCertificatesModalOpen(true) }
                        >
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-teacher"></use>
                          </svg><span>Посмотреть сертификаты</span>
                        </button>
                        <ul className="user-card-coach__hashtag-list">
                          { userCard?.profile?.trainingType?.map((type) => (
                            <li className="user-card-coach__hashtag-item" key={ type }>
                              <div className="hashtag"><span>#{ type }</span></div>
                            </li>
                          )) }
                        </ul>
                        { isFriend ?
                          <button
                            className="btn btn--outlined user-card-coach-2__btn"
                            type="button"
                            onClick={ handleRemoveFromFriend }
                          >
                            Удалить из друзей
                          </button>
                          :
                          <button
                            className="btn user-card-coach__btn"
                            type="button"
                            onClick={ handleAddToFriend }
                          >
                            Добавить в друзья
                          </button>
                        }
                      </div>
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item">
                            <img src="assets/img/content/user-coach-photo1.jpg"
                              srcSet="assets/img/content/user-coach-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
                          </li>
                          <li className="user-card-coach__gallary-item">
                            <img src="assets/img/content/user-coach-photo2.jpg"
                              srcSet="assets/img/content/user-coach-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-card-coach__training">
                      <TrainerWorkoutsSlider trainerId={ id as string } />
                      <TrainerCardForm
                        isReadyToPersonalTraining={ userCard?.profile?.isReadyToPersonalTraining as boolean }
                        trainerId={ id as string }
                        isFriend={ isFriend }
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CustomerCardTrainer;
