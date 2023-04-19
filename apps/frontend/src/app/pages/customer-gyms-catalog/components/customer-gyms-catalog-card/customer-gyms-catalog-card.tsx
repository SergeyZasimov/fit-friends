import { SportGym } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { fetchFavoriteGyms, updateFavoriteStatus } from '../../../../store/features/sport-gyms/api-actions';
import { getFavoriteGyms } from '../../../../store/features/sport-gyms/sport-gyms-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store.hooks';
import { capitalizeWord } from '../../../../utils/helpers';

export interface CustomerGymsCatalogCardProps {
  gym: SportGym;
}

export function CustomerGymsCatalogCard({ gym }: CustomerGymsCatalogCardProps) {

  const favoriteGyms = useAppSelector(getFavoriteGyms);
  const dispatch = useAppDispatch();

  const [ isFavorite, setIsFavorite ] = useState<boolean | undefined>();

  useEffect(() => {
    const favoriteStatus = !!favoriteGyms.find(favorite => favorite.id === gym.id);
    setIsFavorite(favoriteStatus);
  });

  const handleChangeFavorite = () => {
    dispatch(updateFavoriteStatus(gym.id as number))
      .then(() => dispatch(fetchFavoriteGyms()));
  };

  return (
    <li className="gyms-catalog__item">
      <div className="thumbnail-gym">
        <div className="thumbnail-gym__image">
          <picture>
            <img
              src={ gym.photos && gym.photos[ 0 ] }
              width="330"
              height="190"
              alt="" />
          </picture>
        </div>
        {
          gym.isVerified &&
          <div className="thumbnail-gym__verified">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-verify"></use>
            </svg>
          </div>
        }
        <button
          className={ `thumbnail-gym__favourite-button ${isFavorite && 'is-active'}` }
          onClick={ handleChangeFavorite }
        >
          <span className="visually-hidden">Добавить в Избранное</span>
          <svg width="14" height="13" aria-hidden="true">
            {
              isFavorite
                ?
                <use xlinkHref="#icon-heart-filled"></use>
                :
                <use xlinkHref="#icon-heart"></use>
            }
          </svg>
        </button>
        <div className="thumbnail-gym__header">
          <h4 className="thumbnail-gym__title">{ gym.title }</h4>
          <div className="thumbnail-gym__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-gym__location-address">м. { capitalizeWord(gym.location) }</address>
          </div>
        </div>
        <div className="thumbnail-gym__text-wrapper">
          <p className="thumbnail-gym__text">{ gym.description }</p>
        </div>
        <div className="thumbnail-gym__buttons-wrapper">
          <a className="btn btn--small thumbnail-gym__button" href="#">Подробнее</a>
        </div>
      </div>
    </li>
  );
}

export default CustomerGymsCatalogCard;
