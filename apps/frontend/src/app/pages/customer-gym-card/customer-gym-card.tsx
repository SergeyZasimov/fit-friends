import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateMembershipPopup from '../../components/create-membership-popup/create-membership-popup';
import Header from '../../components/header/header';
import MapPopup from '../../components/map-popup/map-popup';
import { browserHistory } from '../../services/browser-history.service';
import { fetchGym } from '../../store/features/sport-gyms/api-actions';
import { getGym } from '../../store/features/sport-gyms/sport-gyms-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { capitalizeWord } from '../../utils/helpers';
import CustomerGymCardSlider from './components/customer-gym-card-slider/customer-gym-card-slider';

export function CustomerGymCard() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const gym = useAppSelector(getGym);

  const [ isMapModalOpen, setIsMapModalOpen ] = useState(false);
  const [ isMembershipModalOpen, setIsMembershipModalOpen ] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchGym(id));
    }
  }, [ id ]);

  if (!gym) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      { isMapModalOpen &&
        <MapPopup
          onClose={ () => setIsMapModalOpen(false) }
          address={ gym.location }
          title={ gym.title }
        />
      }
      {
        isMembershipModalOpen &&
        <CreateMembershipPopup
          title='Оформить абонемент'
          onClose={ () => setIsMembershipModalOpen(false) }
          gym={ gym }
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
                <section className="gym-card">
                  <h1 className="visually-hidden">Карточка зала</h1>
                  <div className="gym-card__wrapper">
                    <div className="gym-card__content">
                      <div className="gym-card__head">
                        <h2 className="gym-card__title">{ gym.title }</h2>
                        { gym.isVerified &&
                          <div className="gym-card__icon">
                            <svg className="gym-card__verify-bold" width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-verify-bold"></use>
                            </svg>
                          </div>
                        }
                      </div>
                      <p className="gym-card__address">
                        <svg
                          className="gym-card__icon-location"
                          width="12"
                          height="14"
                          aria-hidden="true"
                          onClick={ () => setIsMapModalOpen(true) }
                        >
                          <use xlinkHref="#icon-location"></use>
                        </svg><span>м. { capitalizeWord(gym.location) }</span>
                      </p>
                      <ul className="gym-card__hashtag-list">
                        {
                          gym.parameters.map(item => (
                            <li className="gym-card__hashtag-item" key={ item }>
                              <div className="hashtag hashtag--white">
                                <span>#{ item }</span>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                      <div className="gym-card__text">
                        <p>{ gym.description }</p>
                      </div>
                      <div className="gym-card__rating-price">
                        <div className="gym-card__price">
                          <div className="price-service">
                            <p className="price-service__price">{ gym.oneWorkoutPrice }₽&nbsp;<span>&#47;</span>&nbsp;занятие</p>
                          </div>
                        </div>
                      </div>
                      <div className="gym-card__button">
                        <button
                          className="btn btn--dark-bg"
                          type="button"
                          onClick={ () => setIsMembershipModalOpen(true) }
                        >
                          оформить абонемент
                        </button>
                      </div>
                    </div>
                    <CustomerGymCardSlider photos={ gym.photos } />
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

export default CustomerGymCard;
