import { Profile } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import ShowMoreButtons from '../../components/show-more-buttons/show-more-buttons';
import { browserHistory } from '../../services/browser-history.service';
import { fetchFriends } from '../../store/features/friends/api-actions';
import { getFriends } from '../../store/features/friends/friends-slice';
import { fetchMyRequests, fetchPersonalTrainings } from '../../store/features/personal-training/api-actions';
import { getMyRequests, getPersonalTrainings } from '../../store/features/personal-training/personal-training-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { DEFAULT_FRIENDS_OFFSET } from '../trainer-my-friends/trainer-my-friends';
import CustomerMyFriendsCard from './components/customer-my-friends-card/customer-my-friends-card';

const FRIENDS_QUANTITY = 6;

export function CustomerMyFriends() {

  const dispatch = useAppDispatch();
  const friends = useAppSelector(getFriends);
  const requestsToMe = useAppSelector(getPersonalTrainings);
  const myRequests = useAppSelector(getMyRequests);
  const [ offset, setOffset ] = useState(DEFAULT_FRIENDS_OFFSET);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchPersonalTrainings());
    dispatch(fetchMyRequests());
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button
                className="btn-flat friends-list__back"
                type="button"
                onClick={ () => browserHistory.back() }
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {
                  friends.slice(0, offset).map(({ id, profile, role }) => (
                    <CustomerMyFriendsCard
                      key={ id }
                      profile={ profile as Profile }
                      id={ id as number }
                      role={ role }
                      myRequests={ myRequests }
                      requestsToMe={ requestsToMe }
                    />
                  ))
                }
              </ul>
              <div className="show-more friends-list__show-more">
                <ShowMoreButtons
                  currentLength={ offset }
                  maxLength={ friends.length }
                  onIncrease={ () => setOffset(offset + FRIENDS_QUANTITY) }
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerMyFriends;
