import { Profile } from '@fit-friends/shared';
import { ChangeEvent, useState } from 'react';
import { deleteAvatar, updateUser } from '../../store/features/user/api-actions';
import { useAppDispatch } from '../../store/store.hooks';

export interface LoadAvatarProps {
  avatar: string;
  username: string;
}

export function LoadAvatar({ avatar, username }: LoadAvatarProps) {

  const dispatch = useAppDispatch();

  const [ photoPath, setPhotoPath ] = useState<string>(avatar);
  const [ altText, setAltText ] = useState<string>(username);
  const [ profile, setProfile ] = useState<Pick<Profile, 'avatar'>>({ avatar: '' });


  const handleAddAvatar = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const file = target.files && target.files[ 0 ];
    setPhotoPath(URL.createObjectURL(file as File));
    setProfile({ ...profile, avatar: file as File });
  };

  const handleDeleteClick = () => {
    setPhotoPath('');
    setAltText('');
    setProfile({ ...profile, avatar: '' });
    dispatch(deleteAvatar());
  };

  const handleRefreshClick = () => {
    dispatch(updateUser(profile));
  };

  return (
    <div className="user-info-edit__header">
      <div className="input-load-avatar">
        <label>
          <input
            className="visually-hidden"
            type="file"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={ handleAddAvatar }
          />
          <span className="input-load-avatar__avatar">
            <img
              src={ photoPath }
              width="98"
              height="98"
              alt={ photoPath && altText }
            />
          </span>
        </label>
      </div>
      <div className="user-info-edit__controls">
        <button
          className="user-info-edit__control-btn"
          aria-label="обновить"
          onClick={ handleRefreshClick }
        >
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-change"></use>
          </svg>
        </button>
        <button
          className="user-info-edit__control-btn"
          aria-label="удалить"
          onClick={ handleDeleteClick }
        >
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-trash"></use>
          </svg>
        </button>
      </div>
    </div >
  );
}

export default LoadAvatar;
