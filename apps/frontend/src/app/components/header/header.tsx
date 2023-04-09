import { UserRole } from '@fit-friends/shared';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store.hooks';
import { getUser } from '../../store/features/user/user-slice';
import { AppRoute } from '../../utils/constants';
import NotificationList from '../notification-list/notification-list';

/* eslint-disable-next-line */
export interface HeaderProps { }

export function Header(props: HeaderProps) {

  const user = useAppSelector(getUser);

  const routes = {
    root: user?.role === UserRole.Trainer ? AppRoute.TrainerAccount : AppRoute.CustomerMain
  };

  return (
    <header className="header">
      <div className="container">
        <NavLink className="header__logo" to={ `/${routes.root}` } aria-label="Переход на главную">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </NavLink>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink className="main-nav__link is-active" to={ `/${routes.root}` } aria-label="На главную">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </NavLink>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#" aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg></a></li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#" aria-label="Друзья">
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg></a></li>
            <NotificationList />
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label><span className="search__label">Поиск</span>
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
    </header>);
}

export default Header;
