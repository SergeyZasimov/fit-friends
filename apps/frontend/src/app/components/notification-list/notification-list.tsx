import classNames from 'classnames';
import { useEffect } from 'react';
import { deleteNotification, fetchNotifications } from '../../store/features/notification/api-actions';
import { getNotifications } from '../../store/features/notification/notification-slice';
import { getUser } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import NotificationItem from '../notification-item/notification-item';


export function NotificationList() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const notifications = useAppSelector(getNotifications);

  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications());
    }
  }, [ user, dispatch ]);

  const handleDeleteNotification = (id: number) => {
    dispatch(deleteNotification(id));
  };


  const notificationsNavItemClass = classNames({
    'main-nav__item main-nav__item--notifications': true,
    'is-notifications': notifications.length
  });

  return (
    <li className={ notificationsNavItemClass }>
      <a className="main-nav__link" aria-label="Уведомления">
        <svg width="14" height="18" aria-hidden="true">
          <use xlinkHref="#icon-notification"></use>
        </svg>
      </a>
      <div className="main-nav__dropdown">
        <p className="main-nav__label">Оповещения</p>
        <ul className="main-nav__sublist">
          { notifications.map((item) => (
            <NotificationItem
              key={ item.id }
              notification={ item }
              onDelete={ handleDeleteNotification }
            />
          ))
          }
        </ul>
      </div>
    </li>);
}

export default NotificationList;
