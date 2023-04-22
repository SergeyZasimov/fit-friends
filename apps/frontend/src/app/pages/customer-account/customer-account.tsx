import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import AccountForm from '../../components/account-form/account-form';
import Header from '../../components/header/header';
import LoadAvatar from '../../components/load-avatar/load-avatar';
import { getUser } from '../../store/features/user/user-slice';
import { useAppSelector } from '../../store/store.hooks';
import { AppRoute } from '../../utils/constants';
import CustomerScheduleForm from './components/customer-schedule-form/customer-schedule-form';


export function CustomerAccount() {

  const user = useAppSelector(getUser);

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
                    <section className="my-progress personal-account-user__my-progress">
                      <div className="my-progress__sidebar">
                        <svg className="my-progress__icon" width="46" height="51" aria-hidden="true">
                          <use xlinkHref="#icon-chart-filled"></use>
                        </svg>
                        <ul className="my-progress__list">
                          <li className="my-progress__item"><span>поступило, Ккал</span></li>
                          <li className="my-progress__item"><span>ушло,<br /> Ккал</span></li>
                          <li className="my-progress__item"><span>Итого за&nbsp;день, Ккал</span></li>
                        </ul>
                      </div>
                      <div className="my-progress__content">
                        <div className="my-progress__title-wrapper">
                          <h2 className="my-progress__title">Мой прогресс</h2>
                          <div className="my-progress__controls">
                            <button className="btn-icon btn-icon--outlined my-progress__control" type="button" aria-label="previous">
                              <svg width="11" height="8" aria-hidden="true">
                                <use xlinkHref="#arrow-left"></use>
                              </svg>
                            </button>
                            <button className="btn-icon btn-icon--outlined my-progress__control" type="button" aria-label="next">
                              <svg width="11" height="8" aria-hidden="true">
                                <use xlinkHref="#arrow-right"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <table className="my-progress__table">
                          <tr className="my-progress__row my-progress__row--head">
                            <th className="my-progress__cell my-progress__cell--head">пн</th>
                            <th className="my-progress__cell my-progress__cell--head">вт</th>
                            <th className="my-progress__cell my-progress__cell--head">ср</th>
                            <th className="my-progress__cell my-progress__cell--head">чт</th>
                            <th className="my-progress__cell my-progress__cell--head">пт</th>
                            <th className="my-progress__cell my-progress__cell--head">сб</th>
                            <th className="my-progress__cell my-progress__cell--head">вс</th>
                          </tr>
                          <tr className="my-progress__row">
                            <td className="my-progress__cell">3000</td>
                            <td className="my-progress__cell">1000</td>
                            <td className="my-progress__cell">3000</td>
                            <td className="my-progress__cell">1000</td>
                            <td className="my-progress__cell">3000</td>
                            <td className="my-progress__cell">1000</td>
                            <td className="my-progress__cell">3000</td>
                          </tr>
                          <tr className="my-progress__row">
                            <td className="my-progress__cell">2000</td>
                            <td className="my-progress__cell">4500</td>
                            <td className="my-progress__cell">2000</td>
                            <td className="my-progress__cell">4500</td>
                            <td className="my-progress__cell">2000</td>
                            <td className="my-progress__cell">4500</td>
                            <td className="my-progress__cell">2000</td>
                          </tr>
                          <tr className="my-progress__row">
                            <td className="my-progress__cell my-progress__cell--red">1000</td>
                            <td className="my-progress__cell my-progress__cell--green">3500</td>
                            <td className="my-progress__cell my-progress__cell--red">1000</td>
                            <td className="my-progress__cell my-progress__cell--green">3500</td>
                            <td className="my-progress__cell my-progress__cell--red">1000</td>
                            <td className="my-progress__cell my-progress__cell--green">3500</td>
                            <td className="my-progress__cell my-progress__cell--red">1000</td>
                          </tr>
                        </table>
                      </div>
                    </section>
                    <div className="personal-account-user__diagram"></div>
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
                    <Link className="thumbnail-link thumbnail-link--theme-light personal-account-user__shop" to={ `/${AppRoute.MyPurchase}` }>
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
