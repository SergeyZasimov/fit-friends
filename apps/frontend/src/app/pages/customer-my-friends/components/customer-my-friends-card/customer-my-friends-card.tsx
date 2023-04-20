import { CreatePersonalTraining, PersonalTraining, Profile, TrainingStatus, UrlDomain, UserRole } from '@fit-friends/shared';
import classNames from 'classnames';
import { createApi } from '../../../../services/api.service';
import { updatePersonalTrainingStatus } from '../../../../store/features/personal-training/api-actions';
import { useAppDispatch } from '../../../../store/store.hooks';
import { capitalizeWord } from '../../../../utils/helpers';

export interface CustomerMyFriendsCardProps {
  id: number;
  role: string;
  profile: Profile,
  myRequests: PersonalTraining[],
  requestsToMe: PersonalTraining[];
}

export function CustomerMyFriendsCard({ id, myRequests, profile, requestsToMe, role }: CustomerMyFriendsCardProps) {
  const api = createApi();
  const dispatch = useAppDispatch();
  const requestToMe = requestsToMe.find(request => request.requesterId === id && request.status === TrainingStatus.UnderConsideration);
  const myRequest = myRequests.find(request => request.conductorId === id);

  const handleChangeRequestStatus = (newStatus: string) => {
    dispatch(updatePersonalTrainingStatus({ id: requestToMe?.id, status: newStatus }));
  };

  const createPersonalTrainingRequest = async () => {
    const dto: CreatePersonalTraining = {
      conductorId: id
    };
    await api.post(`/${UrlDomain.PersonalTraining}`, dto);
  };

  const cardClass = classNames({
    'thumbnail-friend__info': true,
    'thumbnail-friend__info--theme-light': role === UserRole.Customer,
    'thumbnail-friend__info--theme-dark': role === UserRole.Trainer
  });

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className={ cardClass }>
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={ profile.avatar as string }
                  width="78" height="78" alt="" />
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{ profile.name }</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{ capitalizeWord(profile.location) }</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {
              profile?.trainingType?.map(type => (
                <li key={ type }>
                  <div className="hashtag thumbnail-friend__hashtag">
                    <span>#{ type }</span>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="thumbnail-friend__activity-bar">
            {
              profile.isReadyToTraining ?
                <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                  <span>Готов к&nbsp;тренировке</span>
                </div>
                :
                <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                  <span>Не&nbsp;готов к&nbsp;тренировке</span>
                </div>
            }
            {
              profile.isReadyToTraining &&
              <button
                className="thumbnail-friend__invite-button"
                type="button"
                onClick={ createPersonalTrainingRequest }
              >
                <svg width="43" height="46" aria-hidden="true" focusable="false">
                  <use xlinkHref="#icon-invite"></use>
                </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
              </button>
            }
          </div>
        </div>
        {
          requestToMe &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
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
        { myRequest && myRequest.status === TrainingStatus.Accept &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку принят</p>
          </div>
        }
        { myRequest && myRequest.status === TrainingStatus.Canceled &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку отклонён</p>
          </div>
        }
      </div>
    </li>
  );
}

export default CustomerMyFriendsCard;
