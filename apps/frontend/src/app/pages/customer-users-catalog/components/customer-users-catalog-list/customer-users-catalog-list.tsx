import { UserRole } from '@fit-friends/shared';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowMoreButtons from '../../../../components/show-more-buttons/show-more-buttons';
import { getUsers } from '../../../../store/features/user/user-slice';
import { useAppSelector } from '../../../../store/store.hooks';
import { AppRoute } from '../../../../utils/constants';

const setItemClass = (role: string) => {
  return role === UserRole.Customer ? 'user' : 'coach';
};

const USERS_QUANTITY = 9;

export function CustomerUsersCatalogList() {

  const users = useAppSelector(getUsers);
  const [ offset, setOffset ] = useState(USERS_QUANTITY);

  return (
    <div className="users-catalog">
      <ul className="users-catalog__list">
        { users.slice(0, offset).map(({ id, role, profile }) => (
          <li className="users-catalog__item" key={ id }>
            <div className={ `thumbnail-user thumbnail-user--role-${setItemClass(role)}` }>
              <div className="thumbnail-user__image">
                <picture>
                  <img src={ profile?.avatar as string }
                    width="82" height="82" alt={ profile?.name } />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">{ profile?.name }</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">{ profile?.location }</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                {
                  profile?.trainingType?.map(type => (
                    <li className="thumbnail-user__hashtags-item" key={ type }>
                      <div className="hashtag thumbnail-user__hashtag"><span>#{ type }</span></div>
                    </li>
                  ))
                }
              </ul>
              <Link
                className="btn btn--medium thumbnail-user__button"
                to={ role === UserRole.Customer ? `/${AppRoute.CustomerCardUser}/${id}` : `/${AppRoute.CustomerCardTrainer}/${id}` }
              >
                Подробнее
              </Link>
            </div>
          </li>
        )) }
      </ul>
      <div className="show-more users-catalog__show-more">
        <ShowMoreButtons
          currentLength={ offset }
          maxLength={ users.length }
          onIncrease={ () => setOffset(offset + USERS_QUANTITY) }
        />
      </div>
    </div>
  );
}

export default CustomerUsersCatalogList;
