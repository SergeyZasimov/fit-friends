import { ProfileQuery } from '@fit-friends/shared';
import { useEffect, useRef } from 'react';
import { useSlider } from '../../../../hooks/use-slider';
import { fetchUsers } from '../../../../store/features/user/api-actions';
import { getUsers } from '../../../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store.hooks';
import { createQueryString } from '../../../../utils/helpers';

const USERS_QUANTITY = 4;

export function CustomerLookForCompanyList() {

  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const sliderRef = useRef<HTMLLIElement>(null);
  const offset = (sliderRef.current && (sliderRef.current as HTMLLIElement).getBoundingClientRect().width);

  useEffect(() => {
    const query: ProfileQuery = {
      limit: 8,
      isReadyToTraining: true
    };
    dispatch(fetchUsers(createQueryString(query)));
  }, []);

  const { handleNextClick, handlePrevClick, style } = useSlider(offset as number, USERS_QUANTITY, users.length);

  return (
    <section className="look-for-company ">
      <div className="container slider-overflow-hidden">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button className="btn-flat btn-flat--light look-for-company__button" type="button"><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
                onClick={ handlePrevClick }
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
                onClick={ handleNextClick }
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list" >
            {
              users.map(({ id, profile }) => (
                <li className="look-for-company__item" key={ id } style={ { ...style, maxWidth: '340px' } } ref={ sliderRef }>
                  <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div className="thumbnail-user__image">
                      <picture>
                        <img
                          src={ profile?.avatar as string }
                          width="82"
                          height="82"
                          alt={ profile?.name }
                        />
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
                      <li className="thumbnail-user__hashtags-item">
                        {
                          profile?.trainingType?.map((type) => (
                            <div
                              key={ type }
                              className="hashtag thumbnail-user__hashtag"
                            ><span>#{ type }</span></div>
                          ))
                        }
                      </li>
                    </ul>
                    <a className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CustomerLookForCompanyList;
