import { FavorGenders } from '@fit-friends/shared';
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { createWorkout } from '../../store/features/workout/api-actions';
import { getWorkoutErrors } from '../../store/features/workout/workout-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { CustomSelectField } from '../../utils/constants';
import CustomSelect from '../custom-select/custom-select';

export function CreateTrainingForm() {

  const dispatch = useAppDispatch();
  const errors = useAppSelector(getWorkoutErrors);

  const [ selections, setSelections ] = useState({
    trainingTime: '',
    trainingType: ''
  });

  const [ videoFile, setVideoFile ] = useState<File>();

  const handleSelectionField = (
    evt: SyntheticEvent<HTMLOptionElement>,
    propertyName: string
  ) => {
    setSelections({
      ...selections,
      [ propertyName ]: (evt.target as HTMLOptionElement).value,
    });
  };

  const handleAddVideo = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const file = target.files && target.files[ 0 ];
    setVideoFile(file as File);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const requestData = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      caloriesAmountToLose: formData.get('caloriesAmountToLose'),
      favorGender: formData.get('favorGender'),
      video: videoFile,
      ...selections
    };
    dispatch(createWorkout(requestData));
  };


  return (
    <form onSubmit={ handleSubmit }>
      <div className="create-training">
        <div className="create-training__wrapper">
          <div className="create-training__block">
            <h2 className="create-training__legend">Название тренировки</h2>
            <div className={ `custom-input create-training__input ${errors.title ? 'custom-input--error' : ''}` }>
              <label>
                <span className="custom-input__wrapper">
                  <input
                    type="text"
                    name="title"
                  />
                </span>
                { errors.title &&
                  errors.title.map((item) => (
                    <span key={ item } className="custom-input__error">{ item }</span>
                  )) }
              </label>
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Характеристики тренировки</h2>
            <div className="create-training__info">
              <CustomSelect
                fieldName={ CustomSelectField.TrainingType }
                onSelect={ handleSelectionField }
                value={ selections.trainingType }
                propertyName={ 'trainingType' }
                errors={ errors }
              />
              <div className={ `custom-input custom-input--with-text-right ${errors.caloriesAmountToLose ? 'custom-input--error' : ''}` }>
                <label>
                  <span className="custom-input__label">Сколько калорий потратим</span>
                  <span className="custom-input__wrapper">
                    <input
                      type="number"
                      name="caloriesAmountToLose"
                    /><span className="custom-input__text">ккал</span>
                  </span>
                  { errors.caloriesAmountToLose &&
                    errors.caloriesAmountToLose.map((item) => (
                      <span key={ item } className="custom-input__error">{ item }</span>
                    )) }
                </label>
              </div>
              <CustomSelect
                fieldName={ CustomSelectField.TrainingTime }
                propertyName={ 'trainingTime' }
                value={ selections.trainingTime }
                onSelect={ handleSelectionField }
                errors={ errors }
              />
              <div className={ `custom-input custom-input--with-text-right ${errors.price ? 'custom-input--error' : ''}` }>
                <label>
                  <span className="custom-input__label">Стоимость тренировки</span>
                  <span className="custom-input__wrapper">
                    <input
                      type="number"
                      name="price"
                    /><span className="custom-input__text">₽</span>
                  </span>
                  { errors.price &&
                    errors.price.map((item) => (
                      <span key={ item } className="custom-input__error">{ item }</span>
                    )) }
                </label>
              </div>
            </div>
            <div className="create-training__radio-wrapper">
              <span className="create-training__label">Кому подойдет тренировка</span>
              <div className="custom-toggle-radio create-training__radio">
                {
                  FavorGenders.map((item) => (
                    <div className="custom-toggle-radio__block" key={ item }>
                      <label>
                        <input
                          type="radio"
                          name="favorGender"
                          value={ item }
                          defaultChecked={ item === FavorGenders[ 0 ] }
                        />
                        <span className="custom-toggle-radio__icon"></span>
                        <span className="custom-toggle-radio__label">{ item }</span>
                      </label>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Описание тренировки</h2>
            <div className="custom-textarea create-training__textarea">
              <label>
                <textarea name="description" placeholder=" "></textarea>
              </label>
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
            <div className="drag-and-drop create-training__drag-and-drop">
              <label>
                <span className="drag-and-drop__label" tabIndex={ 0 }>
                  {
                    videoFile ?
                      videoFile.name :
                      'Загрузите сюда файлы формата MOV, AVI или MP4'
                  }
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-import-video"></use>
                  </svg>
                </span>
                <input
                  type="file"
                  name="import"
                  tabIndex={ -1 }
                  onChange={ handleAddVideo }
                  accept=".mov, .avi, .mp4" />
              </label>
            </div>
          </div>
        </div>
        <button className="btn create-training__button" type="submit">Опубликовать</button>
      </div>
    </form>
  );
}

export default CreateTrainingForm;
