import { Profile, User } from '@fit-friends/shared';
import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/store.hooks';
import { useEditAccount } from '../../hooks/user-edit-account';
import { updateUser } from '../../store/features/user/api-actions';
import { CustomSelectField } from '../../utils/constants';
import CustomSelect from '../custom-select/custom-select';
import Specialization from '../specialization/specialization';

export interface AccountFormProps {
  user: User;
}

export function AccountForm({ user }: AccountFormProps) {

  const dispatch = useAppDispatch();

  const [ isFormDisabled, setIsFormDisabled ] = useState(true);

  const {
    editedAccount,
    setSpecialization,
    setAccountField,
    setIsReadyToPersonalTraining,
    setSelectionField
  } = useEditAccount(user.profile as Profile);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (isFormDisabled) {
      setIsFormDisabled(false);
    } else {
      dispatch(updateUser(editedAccount));
      setIsFormDisabled(true);
    }

  };

  return (
    <form className="user-info-edit__form" action="#" method="post">
      <button
        className="btn-flat btn-flat--underlined user-info-edit__save-button"
        type="submit"
        aria-label={ isFormDisabled ? 'Редактировать' : 'Сохранить' }
        onClick={ handleSubmit }
      >
        <svg width="12" height="12" aria-hidden="true">
          <use xlinkHref="#icon-edit"></use>
        </svg>
        <span>{ isFormDisabled ? 'Редактировать' : 'Сохранить' }</span>
      </button>
      <div className="user-info-edit__section">
        <h2 className="user-info-edit__title">Обо мне</h2>
        <div className="custom-input user-info-edit__input">
          <label>
            <span className="custom-input__label">Имя</span>
            <span className="custom-input__wrapper">
              <input
                type="text"
                name="name"
                value={ editedAccount.name }
                readOnly={ isFormDisabled }
                onChange={ setAccountField }
              />
            </span>
          </label>
        </div>
        <div className="custom-textarea user-info-edit__textarea">
          <label>
            <span className="custom-textarea__label">Описание</span>
            <textarea
              name="resume"
              readOnly={ isFormDisabled }
              value={ editedAccount.resume }
              onChange={ setAccountField }
            ></textarea>
          </label>
        </div>
      </div>

      <div className="user-info-edit__section user-info-edit__section--status">
        <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
        <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
          <label>
            <input
              type="checkbox"
              name="isReadyToPersonalTraining"
              checked={ editedAccount.isReadyToPersonalTraining }
              disabled={ isFormDisabled }
              onChange={ setIsReadyToPersonalTraining }
            />
            <span className="custom-toggle__icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg>
            </span>
            <span className="custom-toggle__label">Готов тренировать</span>
          </label>
        </div>
      </div>

      <div className="user-info-edit__section">
        <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
        <div className="specialization-checkbox user-info-edit__specialization">
          <Specialization
            isDisabled={ isFormDisabled }
            onSpecializationChange={ setSpecialization }
            specialization={ editedAccount.trainingType as string[] }
          />
        </div>
      </div>

      <CustomSelect
        isDisabled={ isFormDisabled }
        fieldName={ CustomSelectField.LocationField }
        propertyName={ 'location' }
        value={ editedAccount.location }
        onSelect={ setSelectionField }
      />

      <CustomSelect
        isDisabled={ isFormDisabled }
        fieldName={ CustomSelectField.GenderField }
        value={ editedAccount.gender }
        propertyName={ 'gender' }
        onSelect={ setSelectionField }
      />

      <CustomSelect
        isDisabled={ isFormDisabled }
        fieldName={ CustomSelectField.LevelField }
        value={ editedAccount.trainingLevel as string }
        propertyName={ 'trainingLevel' }
        onSelect={ setSelectionField }
      />

    </form>
  );
}

export default AccountForm;
