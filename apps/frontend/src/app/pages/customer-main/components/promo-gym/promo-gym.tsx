import { getSportGyms } from '../../../../store/features/sport-gyms/sport-gyms-slice';
import { getUser } from '../../../../store/features/user/user-slice';
import { useAppSelector } from '../../../../store/store.hooks';

export function PromoGym() {

  const user = useAppSelector(getUser);
  const sportGyms = useAppSelector(getSportGyms);

  const specGym = sportGyms.find(gym => gym.location === user?.profile?.location) ?? sportGyms[ 0 ];

  if (!specGym) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="thumbnail-spec-gym">
      <div className="thumbnail-spec-gym__image">
        <picture>
          <img
            src={ specGym.photos && specGym.photos[ 0 ] }
            width="330"
            height="190"
            alt="spec-gym"
          />
        </picture>
      </div>
      <p className="thumbnail-spec-gym__type">Ближайший зал</p>
      <div className="thumbnail-spec-gym__header">
        <h3 className="thumbnail-spec-gym__title">{ specGym.title }</h3>
        <div className="thumbnail-spec-gym__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-spec-gym__location-address">м. { specGym.location }</address>
        </div>
      </div>
      <div className="thumbnail-spec-gym__button-wrapper">
        <a className="btn btn--small thumbnail-spec-gym__button" href="#">Подробнее</a>
        <a className="btn btn--small btn--outlined thumbnail-spec-gym__button" href="#">Все залы</a>
      </div>
    </div>
  );
}

export default PromoGym;
