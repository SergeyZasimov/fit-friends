import { PersonalTraining, Profile, TrainingStatus } from '@fit-friends/shared';
import { updatePersonalTrainingStatus } from '../../store/features/personal-training/api-actions';
import { getUser } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';

export interface FriendCardProps {
  id: number;
  profile: Profile;
  trainingRequests: PersonalTraining[];
}

export function FriendCard({ id, profile, trainingRequests }: FriendCardProps) {

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const request = trainingRequests.find(item => item.requesterId === id);

  const handleChangeRequestStatus = (newStatus: string) => {
    dispatch(updatePersonalTrainingStatus({ id: request?.id, status: newStatus }));
  };

  return (
    <li className="friends-list__item" key={ id }>
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img
                  src={ profile?.avatar as string }
                  width="78"
                  height="78"
                  alt={ profile?.name }
                />
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{ profile?.name }</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{ profile?.location }</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            { profile?.trainingType?.map((type) => (
              <li key={ type }>
                <div className="hashtag thumbnail-friend__hashtag"><span>#{ type }</span></div>
              </li>
            )) }
          </ul>
          <div className="thumbnail-friend__activity-bar">
            {
              profile?.isReadyToTraining
                ?
                <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                  <span>Готов к&nbsp;тренировке</span>
                </div>
                :
                <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                  <span>Не&nbsp;готов к&nbsp;тренировке</span>
                </div>
            }
          </div>
        </div>
        {
          user?.profile?.isReadyToPersonalTraining &&
          request?.status === TrainingStatus.UnderConsideration
          &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
            <div className="thumbnail-friend__button-wrapper">
              <button
                className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                type="button"
                onClick={ () => handleChangeRequestStatus(TrainingStatus.Accept) }
              >Принять</button>
              <button
                className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                type="button"
                onClick={ () => handleChangeRequestStatus(TrainingStatus.Canceled) }
              >Отклонить</button>
            </div>
          </div>
        }
      </div>
    </li>
  );
}

export default FriendCard;
