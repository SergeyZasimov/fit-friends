import { Profile, User } from '@fit-friends/shared';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AccountForm from '../../components/account-form/account-form';
import CertificateSlider from '../../components/certificate-slider/certificate-slider';
import Header from '../../components/header/header';
import LoadAvatar from '../../components/load-avatar/load-avatar';
import { useAppSelector } from '../../hooks/store.hooks';
import { getUser } from '../../store/features/user/user-slice';

export function TrainerAccount() {

  const user = useAppSelector(getUser) as User;

  return (
    <div className="wrapper">
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
                  <div className="personal-account-coach__navigation"><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-flash"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Мои тренировки</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои заказы</span></a>
                    <Calendar className="personal-account-coach__calendar"></Calendar>
                  </div>
                  <CertificateSlider certificates={ (user.profile as Profile).certificates as string[] } />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrainerAccount;
