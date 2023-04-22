import dayjs from 'dayjs';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import AccountForm from '../../components/account-form/account-form';
import CustomerAccountProgress from '../../components/customer-account-progress/customer-account-progress';
import Header from '../../components/header/header';
import LoadAvatar from '../../components/load-avatar/load-avatar';
import { fetchFoodDiaryRecords } from '../../store/features/food-diary/api-actions';
import { getUser } from '../../store/features/user/user-slice';
import { fetchWorkoutDiaryRecords } from '../../store/features/workout-diary/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { AppRoute, WEEK_DAYS, WEEK_FIRST_DAY } from '../../utils/constants';
import { createQueryString } from '../../utils/helpers';
import CustomerScheduleForm from './components/customer-schedule-form/customer-schedule-form';

export function CustomerAccount() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  useEffect(() => {
    const query = {
      weekBegin: dayjs().day(WEEK_FIRST_DAY).toISOString(),
      weekEnd: dayjs().day(WEEK_DAYS).toISOString(),
    };
    dispatch(fetchFoodDiaryRecords(createQueryString(query)));
    dispatch(fetchWorkoutDiaryRecords(createQueryString(query)));
  }, []);

  if (!user) {
    return (
      <div>Loading...</div>
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
              <section className="user-info">
                <LoadAvatar avatar={ user.profile?.avatar as string } username={ user.profile?.name as string } />
                <AccountForm user={ user } />
              </section>
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <CustomerScheduleForm
                      caloriesPerDay={ user.profile?.caloriesAmountToLosePerDay as number }
                    />
                  </div>
                  <div className="personal-account-user__info">
                    <Link className="thumbnail-link thumbnail-link--theme-dark" to={ `/${AppRoute.CustomerWorkoutDiary}` }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-ranking"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Дневник тренировок</span></Link>
                    <Link className="thumbnail-link thumbnail-link--theme-dark" to={ `/${AppRoute.CustomerFoodDiary}` }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-dark">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-book"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Дневник питания</span>
                    </Link>
                    <CustomerAccountProgress caloriesToLosePerDay={ user.profile?.caloriesAmountToLosePerDay as number } />
                  </div>
                  <div className="personal-account-user__additional-info">
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={ `/${AppRoute.MyFriends}` }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={ `/${AppRoute.MyGyms}` }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-weight"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои залы</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light personal-account-user__shop"
                      to={ `/${AppRoute.MyPurchase}` }>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span>
                    </Link>
                    <Calendar className="personal-account-user__calendar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerAccount;
