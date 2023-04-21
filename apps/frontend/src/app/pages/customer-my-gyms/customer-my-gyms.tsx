import { QuerySportGym } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import ShowMoreButtons from '../../components/show-more-buttons/show-more-buttons';
import { browserHistory } from '../../services/browser-history.service';
import { fetchFavoriteGyms } from '../../store/features/sport-gyms/api-actions';
import { getFavoriteGyms } from '../../store/features/sport-gyms/sport-gyms-slice';
import { getUser } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { createQueryString } from '../../utils/helpers';
import CustomerGymsCatalogCard from '../customer-gyms-catalog/components/customer-gyms-catalog-card/customer-gyms-catalog-card';

const GYMS_QUANTITY = 4;

export function CustomerMyGyms() {

  const dispatch = useAppDispatch();
  const favoriteGyms = useAppSelector(getFavoriteGyms);
  const user = useAppSelector(getUser);
  const [ offset, setOffset ] = useState<number>(GYMS_QUANTITY);

  const [ isOnlyNearby, setIsOnlyNearby ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchFavoriteGyms(''));
  }, []);

  useEffect(() => {
    if (isOnlyNearby) {
      const query: QuerySportGym = {
        location: [ user?.profile?.location as string ]
      };
      dispatch(fetchFavoriteGyms(createQueryString(query)));
    } else {
      dispatch(fetchFavoriteGyms(''));
    }
  }, [ isOnlyNearby ]);

  if (!favoriteGyms) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="my-gyms">
          <div className="container">
            <div className="my-gyms__wrapper">
              <button
                className="btn-flat my-gyms__back"
                type="button"
                onClick={ () => browserHistory.back() }
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-gyms__title-wrapper">
                <h1 className="my-gyms__title">Мои залы</h1>
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="user-agreement-1"
                      name="user-agreement"
                      checked={ isOnlyNearby }
                      onChange={ () => setIsOnlyNearby(!isOnlyNearby) }
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">Только рядом</span>
                  </label>
                </div>
              </div>
              <ul className="my-gyms__list">
                {
                  favoriteGyms.slice(0, offset).map(gym => (
                    <li className="my-gyms__item" key={ gym.id }>
                      <CustomerGymsCatalogCard gym={ gym } isOnlyNearby={ isOnlyNearby } />
                    </li>
                  ))
                }
              </ul>
              <div className="show-more my-gyms__show-more">
                <ShowMoreButtons
                  currentLength={ offset }
                  maxLength={ favoriteGyms.length }
                  onIncrease={ () => setOffset(offset + GYMS_QUANTITY) }
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerMyGyms;
