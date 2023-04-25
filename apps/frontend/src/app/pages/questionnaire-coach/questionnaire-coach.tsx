import { TrainerAdditionalInfo, TrainingLevels, TrainingTypes } from '@fit-friends/shared';
import { ChangeEvent, FormEvent, useState } from 'react';
import { questionnaireTrainer } from '../../store/features/user/api-actions';
import { getUser } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';

export function QuestionnaireCoach() {

  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const [ questionnaire, setQuestionnaire ] = useState<TrainerAdditionalInfo>({
    userId: user?.id,
    resume: '',
    trainingLevel: '',
    trainingType: [],
    isReadyToPersonalTraining: false,
    certificate: ''
  });

  const handleQuestionnaireChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const name = target.name;

    if (name === 'trainingType') {
      const currentTrainingType = [ ...questionnaire.trainingType ];

      if (currentTrainingType.includes(target.value)) {
        const index = currentTrainingType.findIndex((item) => item === target.value);
        currentTrainingType.splice(index, 1);
        setQuestionnaire({ ...questionnaire, trainingType: [ ...currentTrainingType ] });
      } else {
        setQuestionnaire({ ...questionnaire, trainingType: [ ...currentTrainingType, target.value ] });
      }
    } else {
      setQuestionnaire({ ...questionnaire, [ name ]: target.value });
    }
  };

  const handleResumeChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionnaire({ ...questionnaire, resume: (evt.target as HTMLTextAreaElement).value });
  };

  const handleAddCertificate = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const file = target.files && target.files[ 0 ];
    setQuestionnaire({ ...questionnaire, certificate: file as File });
  };

  const handleQuestionnaireSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(questionnaireTrainer(questionnaire));
  };

  return (
    <main>
      <div className="background-logo">
        <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
          <use xlinkHref="#icon-logotype"></use>
        </svg>
      </div>
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form onSubmit={ handleQuestionnaireSubmit }>
                <div className="questionnaire-coach">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-coach__wrapper">
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                      <div className="specialization-checkbox questionnaire-coach__specializations">
                        {
                          TrainingTypes.map((item) => (
                            <div className="btn-checkbox" key={ item }>
                              <label>
                                <input
                                  className="visually-hidden"
                                  type="checkbox"
                                  name="trainingType"
                                  value={ item }
                                  onChange={ handleQuestionnaireChange }
                                />
                                <span className="btn-checkbox__btn capitalize">{ item }</span>
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваш уровень</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">

                        {
                          TrainingLevels.map((item) => (
                            <div className="custom-toggle-radio__block" key={ item }>
                              <label>
                                <input
                                  type="radio"
                                  name="trainingLevel"
                                  value={ item }
                                  onChange={ handleQuestionnaireChange }
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label capitalize">{ item }</span>
                              </label>
                            </div>
                          ))
                        }

                      </div>
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                      <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                        <label>
                          <span className="drag-and-drop__label" tabIndex={ 0 }>
                            {
                              questionnaire.certificate ?
                                `${(questionnaire.certificate as File).name}` :
                                'Загрузите сюда файлы формата JPG или PNG'

                            }
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          </span>
                          <input
                            type="file"
                            name="import"
                            tabIndex={ -1 }
                            accept=".jpg, .png"
                            onChange={ handleAddCertificate }
                          />
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                      <div className="custom-textarea questionnaire-coach__textarea">
                        <label>
                          <textarea
                            name="resume"
                            placeholder=" "
                            onChange={ handleResumeChange }
                          ></textarea>
                        </label>
                      </div>
                      <div className="questionnaire-coach__checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="individual-training"
                            name="isReadyToPersonalTraining"
                            checked={ questionnaire.isReadyToPersonalTraining }
                            onChange={ () => setQuestionnaire({ ...questionnaire, isReadyToPersonalTraining: !questionnaire.isReadyToPersonalTraining }) }
                          />
                          <span className="questionnaire-coach__checkbox-icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg></span>
                          <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn questionnaire-coach__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default QuestionnaireCoach;
