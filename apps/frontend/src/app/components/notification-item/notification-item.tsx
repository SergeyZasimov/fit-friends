import { Notification } from '@fit-friends/shared';
import classNames from 'classnames';
import { useState } from 'react';
import { formatNotificationDate, formatNotificationDateForTag } from '../../utils/helpers';

export interface NotificationItemProps {
  notification: Notification;
  onDelete: (id: number) => void;
}

export function NotificationItem({ notification, onDelete }: NotificationItemProps) {

  const [ isActive, setIsActive ] = useState(true);

  const handleNotificationClick = () => {
    setIsActive(false);
    onDelete(notification.id as number);
  };

  const notificationItemClass = classNames({
    'notification': true,
    'is-active': isActive
  });

  return (
    <li className="main-nav__subitem">
      <a
        className={ notificationItemClass }
        onClick={ handleNotificationClick }
      >
        <p className="notification__text">{ notification.text }</p>
        <time
          className="notification__time"
          dateTime={ formatNotificationDateForTag(notification.createdAt) }
        >
          { formatNotificationDate(notification.createdAt) }
        </time>
      </a>
    </li>);
}

export default NotificationItem;
