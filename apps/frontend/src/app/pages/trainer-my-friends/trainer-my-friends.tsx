import { Profile } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import FriendCard from '../../components/friend-card/friend-card';
import Header from '../../components/header/header';
import { browserHistory } from '../../services/browser-history.service';
import { fetchFriends } from '../../store/features/friends/api-actions';
import { getFriends } from '../../store/features/friends/friends-slice';
import { fetchPersonalTrainings } from '../../store/features/personal-training/api-actions';
import { getPersonalTrainings } from '../../store/features/personal-training/personal-training-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';

export const DEFAULT_FRIENDS_OFFSET = 6;

export function TrainerMyFriends() {

  const dispatch = useAppDispatch();
  const friends = useAppSelector(getFriends);
  const personalTrainingRequests = useAppSelector(getPersonalTrainings);
  const [ offset, setOffset ] = useState(DEFAULT_FRIENDS_OFFSET);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchPersonalTrainings());
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
                { friends.slice(0, offset).map(({ id, profile }) => (
                  <FriendCard
                    key={ id }
                    id={ id as number }
                    profile={ profile as Profile }
                    trainingRequests={ personalTrainingRequests }
                  />
                )) }
              </ul>
              <div className="show-more friends-list__show-more">
                {
                  friends.length === friends.slice(0, offset).length
                    ?
                    <button
                      className="btn show-more__button"
                      type="button"
                      onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
                    >Вернуться в начало</button>
                    :
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={ () => setOffset(offset + DEFAULT_FRIENDS_OFFSET) }
                    >Показать еще</button>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </>

  );
}

export default TrainerMyFriends;
