import { Profile, User } from '@fit-friends/shared';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import AccountForm from '../../components/account-form/account-form';
import CertificateSlider from '../../components/certificate-slider/certificate-slider';
import Header from '../../components/header/header';
import LoadAvatar from '../../components/load-avatar/load-avatar';
import { fetchUser } from '../../store/features/user/api-actions';
import { getUser } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { AppRoute } from '../../utils/constants';

export function TrainerAccount() {

  const user = useAppSelector(getUser) as User;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [ user, dispatch ]);

  if (!user) {
    return (
      <>
        Loading...
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <LoadAvatar
                  avatar={ user.profile?.avatar as string }
                  username={ user.profile?.name as string }
                />
                <AccountForm user={ user } />
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={ AppRoute.MyWorkouts }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои тренировки</span>
                    </Link>
                    <Link to={ AppRoute.CreateWorkout } className="thumbnail-link thumbnail-link--theme-light">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={ AppRoute.MyFriends }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={ AppRoute.MyOrders }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <Calendar className="personal-account-coach__calendar"></Calendar>
                  </div>
                  <CertificateSlider certificates={ (user.profile as Profile).certificates as string[] } />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TrainerAccount;
