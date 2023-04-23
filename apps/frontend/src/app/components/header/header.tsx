import { UserRole } from '@fit-friends/shared';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { getUser } from '../../store/features/user/user-slice';
import { useAppSelector } from '../../store/store.hooks';
import { AppRoute } from '../../utils/constants';
import NotificationList from '../notification-list/notification-list';


export function Header() {

  const user = useAppSelector(getUser);
  const { pathname } = useLocation();

  const routes = {
    main: AppRoute.CustomerMain,
    account: user?.role === UserRole.Trainer ? AppRoute.TrainerAccount : AppRoute.CustomerAccount,
    friends: user?.role === UserRole.Trainer ? `${AppRoute.TrainerAccount}/${AppRoute.MyFriends}` : AppRoute.MyFriends
  };

  const setNavLindActiveClass = (route: string) =>
    classNames({
      'main-nav__link': true,
      'is-active': pathname.endsWith(route)
    });

  return (
    <header className="header">
      <div className="container">
        <NavLink className="header__logo" to={ `/` } aria-label="Переход на главную">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </NavLink>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                className={ () => setNavLindActiveClass(routes.main) }
                to={ `/${routes.main}` }
                aria-label="На главную"
              >
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className={ () => setNavLindActiveClass(routes.account) }
                to={ `/${routes.account}` }
                aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg></NavLink></li>
            <li className="main-nav__item">
              <NavLink
                to={ `/${routes.friends}` }
                className={ () => setNavLindActiveClass(routes.friends) }
                aria-label="Друзья"
              >
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg></NavLink></li>
            <NotificationList />
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item"><a className="search__link" href="#">Бокс</a></li>
              <li className="search__item"><a className="search__link is-active" href="#">Бег</a></li>
              <li className="search__item"><a className="search__link" href="#">Аэробика</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
            </ul>
          </form>
        </div>
      </div>
    </header >);
}

export default Header;
