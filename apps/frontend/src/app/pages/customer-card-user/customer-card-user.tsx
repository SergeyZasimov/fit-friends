import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/back-button/back-button';
import Header from '../../components/header/header';
import MapPopup from '../../components/map-popup/map-popup';
import { useFriend } from '../../hooks/use-friend';
import { fetchUserCard } from '../../store/features/user/api-actions';
import { getUserCard } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';

export function CustomerCardUser() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userCard = useAppSelector(getUserCard);
  const { handleAddToFriend, isFriend, handleRemoveFromFriend } = useFriend(userCard?.id as number, id as string);
  const [ isMapModalOpen, setIsMapOpen ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUserCard(id as string));
  }, [ id ]);

  if (!userCard) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
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
              <BackButton />
              <div className="inner-page__content">
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{ userCard.profile?.name }</h2>
                      </div>
                      <div
                        className="user-card__label"
                        onClick={ () => setIsMapOpen(true) }
                        style={ { cursor: 'pointer' } }
                      >
                        <svg className="user-card__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <span>{ userCard.profile?.location }</span>
                      </div>
                      {
                        userCard.profile?.isReadyToTraining ?
                          <div className="user-card__status"><span>Готов к тренировке</span></div>
                          :
                          <div className="user-card__status not-ready">
                            <span>Не&nbsp;готов к&nbsp;тренировке</span>
                          </div>
                      }
                      <div className="user-card__text">
                        <p>Привет! Я&nbsp;Катерина и&nbsp;мне 27 лет. Обожаю спорт и&nbsp;все, что с&nbsp;ним связанно. Регулярно хожу на&nbsp;тренировки по&nbsp;кроссфиту, также занимаюсь йогой, рястяжкой и&nbsp;пилатесом.</p>
                        <p>Занимаюсь как с&nbsp;тренером индивидуально, так и&nbsp;на&nbsp;групповых занятиях. Люблю соревнования и&nbsp;челленджи, так что присоединяйтесь, давайте объединяться и&nbsp;заниматься вместе!&#41;</p>
                      </div>
                      <ul className="user-card__hashtag-list">
                        {
                          userCard.profile?.trainingType?.map(type => (
                            <li className="user-card__hashtag-item" key={ type }>
                              <div className="hashtag"><span>#{ type }</span></div>
                            </li>
                          ))
                        }
                      </ul>
                      {
                        isFriend ?
                          <button
                            className="btn btn--outlined user-card-coach-2__btn"
                            type="button"
                            onClick={ handleRemoveFromFriend }
                          >
                            Удалить из друзей
                          </button>
                          :
                          <button
                            className="btn user-card__btn"
                            type="button"
                            disabled={ isFriend }
                            onClick={ handleAddToFriend }
                          >Добавить в друзья</button>
                      }
                    </div>
                    <div className="user-card__gallary">
                      <ul className="user-card__gallary-list">
                        <li className="user-card__gallary-item">
                          <img
                            src="assets/img/content/user-card-photo1.jpg"
                            srcSet="assets/img/content/user-card-photo1@2x.jpg 2x"
                            width="334"
                            height="573"
                            alt="photo1"
                          />
                        </li>
                        <li className="user-card__gallary-item">
                          <img
                            src="assets/img/content/user-card-photo2.jpg"
                            srcSet="assets/img/content/user-card-photo2@2x.jpg 2x"
                            width="334"
                            height="573"
                            alt="photo2"
                          />
                        </li>
                      </ul>
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

export default CustomerCardUser;
