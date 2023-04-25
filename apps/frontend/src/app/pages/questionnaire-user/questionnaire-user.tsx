import { CustomerAdditionalInfo, TrainingLevels, TrainingTimes, TrainingTypes } from '@fit-friends/shared';
import { ChangeEvent, FormEvent, useState } from 'react';
import { questionnaireCustomer } from '../../store/features/user/api-actions';
import { getErrors, getUser } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';

export function QuestionnaireUser() {

  const user = useAppSelector(getUser);
  const errors = useAppSelector(getErrors);
  const dispatch = useAppDispatch();
  const [ questionnaire, setQuestionnaire ] = useState<CustomerAdditionalInfo>({
    userId: user?.id,
    caloriesAmountToLose: 0,
    caloriesAmountToLosePerDay: 0,
    isReadyToTraining: false,
    trainingLevel: '',
    trainingTime: '',
    trainingType: []
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

  const handleQuestionnaireSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(questionnaireCustomer(questionnaire));
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
      <div className="popup-form popup-form--questionnaire-user">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form onSubmit={ handleQuestionnaireSubmit }>
                <div className="questionnaire-user">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-user__wrapper">
                    <div className="questionnaire-user__block">
                      <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                      <div className="specialization-checkbox questionnaire-user__specializations">

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
                    <div className="questionnaire-user__block">
                      <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">

                        {
                          TrainingTimes.map((item) => (
                            <div className="custom-toggle-radio__block" key={ item }>
                              <label>
                                <input
                                  type="radio"
                                  name="trainingTime"
                                  value={ item }
                                  onChange={ handleQuestionnaireChange }
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{ item }</span>
                              </label>
                            </div>

                          ))
                        }

                      </div>
                    </div>
                    <div className="questionnaire-user__block">
                      <span className="questionnaire-user__legend">Ваш уровень</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">

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
                    <div className="questionnaire-user__block">
                      <div className="questionnaire-user__calories-lose">
                        <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                        <div className={ `custom-input custom-input--with-text-right questionnaire-user__input ${errors.caloriesAmountToLose ? 'custom-input--error' : ''}` }>
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="number"
                                name="caloriesAmountToLose"
                                onChange={ handleQuestionnaireChange }
                              />
                              <span className="custom-input__text">ккал</span>
                            </span>
                            { errors.caloriesAmountToLose &&
                              errors.caloriesAmountToLose.map((item) => (
                                <span key={ item } className="custom-input__error">{ item }</span>
                              )) }
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-user__calories-waste">
                        <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                        <div className={ `custom-input custom-input--with-text-right questionnaire-user__input ${errors.caloriesAmountToLosePerDay ? 'custom-input--error' : ''}` }>
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="number"
                                name="caloriesAmountToLosePerDay"
                                onChange={ handleQuestionnaireChange }
                              />
                              <span className="custom-input__text">ккал</span>
                            </span>
                            { errors.caloriesAmountToLosePerDay &&
                              errors.caloriesAmountToLosePerDay.map((item) => (
                                <span key={ item } className="custom-input__error">{ item }</span>
                              )) }
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}

export default QuestionnaireUser;
