import { UserRole } from '@fit-friends/shared';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getUser } from '../../store/features/user/user-slice';
import { deleteVideo, updateWorkout } from '../../store/features/workout/api-actions';

export interface VideoProps {
  workoutId: number;
  videoPath: string;
}

export function Video({ videoPath, workoutId }: VideoProps) {

  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [ videoFile, setVideoFile ] = useState<File>();
  const [ isPlay, setIsPlay ] = useState(false);

  const handleAddVideo = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const file = target.files && target.files[ 0 ];
    setVideoFile(file as File);
  };

  const handleSaveFile = () => {
    setIsPlay(false);
    dispatch(updateWorkout({ workoutId, formData: { video: videoFile as File } }));
  };

  const handleDeleteFile = () => {
    dispatch(deleteVideo(workoutId));
  };

  const handleStartPlayClick = () => {
    setIsPlay(true);
  };


  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      {
        videoPath ?
          <div className="training-video__video">
            <div className="training-video__thumbnail">
              {
                isPlay
                  ?
                  <video controls autoPlay src={ videoPath } width="922" height="566"></video>
                  :
                  <picture>
                    <source type="image/webp"
                      srcSet="assets/img/content/training-video/video-thumbnail.webp, assets/img/content/training-video/video-thumbnail@2x.webp 2x" />
                    <img src="assets/img/content/training-video/video-thumbnail.png"
                      srcSet="assets/img/content/training-video/video-thumbnail@2x.png 2x" width="922" height="566" alt="Обложка видео" />
                  </picture>
              }
            </div>
            { !isPlay &&
              <button
                className="training-video__play-button btn-reset"
                onClick={ handleStartPlayClick }
              >
                <svg width="18" height="30" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            }
          </div>
          :
          <div className="training-video__drop-files" style={ { display: 'block' } }>
            <form action="#" method="post">
              <div className="training-video__form-wrapper">
                <div className="drag-and-drop">
                  <label><span className="drag-and-drop__label" tabIndex={ 0 }>
                    {
                      videoFile ?
                        videoFile.name :
                        'Загрузите сюда файлы формата MOV, AVI или MP4'
                    }
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"></use>
                    </svg></span>
                    <input
                      type="file"
                      name="import"
                      tabIndex={ -1 }
                      accept=".mov, .avi, .mp4"
                      onChange={ handleAddVideo }
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
      }
      <div className="training-video__buttons-wrapper">
        {
          user?.role === UserRole.Customer
            ?
            <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
            :
            <div className="training-video__edit-buttons">
              <button
                className="btn"
                type="button"
                onClick={ handleSaveFile }
              >Сохранить</button>
              <button
                className="btn btn--outlined"
                type="button"
                onClick={ handleDeleteFile }
              >Удалить</button>
            </div>
        }
      </div>
    </div>
  );
}

export default Video;
