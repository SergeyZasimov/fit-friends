import { Gender, Locations, RegisterUser, UserRole } from '@fit-friends/shared';
import classnames from 'classnames';
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/features/user/api-actions';
import { getErrors, getUser, getUserRequestStatus, resetStatus } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { AppRoute, RequestStatus } from '../../utils/constants';

export function Register() {

  const [ newUser, setNewUser ] = useState<RegisterUser>({
    email: '',
    gender: Gender.Male,
    location: '',
    name: '',
    birthDay: '',
    role: UserRole.Trainer,
    avatar: undefined,
    password: '',
  });

  const [ isLocationOpen, setIsLocationOpen ] = useState(false);
  const [ isAgreeWithPolicy, setIsAgreeWithPolicy ] = useState(false);

  const dispatch = useAppDispatch();
  const errors = useAppSelector(getErrors);
  const status = useAppSelector(getUserRequestStatus);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const avatarRef = useRef<HTMLDivElement>(null);


  const handleNewUserChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setNewUser({ ...newUser, [ name ]: value });
  };

  const handleLocationChange = (evt: SyntheticEvent<HTMLOptionElement>) => {
    setNewUser({ ...newUser, location: (evt.target as HTMLOptionElement).value });
  };

  const handleAddAvatar = (file: File) => {
    setNewUser({ ...newUser, avatar: file as File });
  };

  const onLocationClick = (evt: SyntheticEvent<HTMLOptionElement>) => {
    handleLocationChange(evt);
    setIsLocationOpen(false);
  };

  const onAddAvatarClick = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const file = target.files && target.files[ 0 ];

    handleAddAvatar(file as File);

    (avatarRef.current as HTMLDivElement).style.background =
      `url(${URL.createObjectURL(file as File)}) no-repeat center/cover`;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(registerUser(newUser));
  };

  const locationClass = classnames({
    'custom-select': true,
    'custom-select--not-selected': !newUser.location,
    'is-open': isLocationOpen,
    'not-empty': newUser.location,
    'is-invalid': errors.location
  });

  useEffect(() => {
    if (status === RequestStatus.Success) {
      dispatch(resetStatus());
      if (user && user.role === UserRole.Customer) {
        navigate(AppRoute.QuestionnaireCustomer);
      } else {
        navigate(AppRoute.QuestionnaireTrainer);
      }
    }
  }, [ status, navigate, user, dispatch ]);


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
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="post" onSubmit={ handleSubmit }>
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <div className="input-load-avatar">
                      <label>
                        <input
                          className="visually-hidden"
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={ onAddAvatarClick }
                        />
                        <span className="input-load-avatar__btn" ref={ avatarRef }>
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                      <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                    </div>
                  </div>
                  <div className="sign-up__data">

                    <div className={ `custom-input ${errors.name ? 'custom-input--error' : ''}` }>
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            name="name"
                            value={ newUser.name }
                            onChange={ handleNewUserChange } />
                        </span>
                        { errors.name &&
                          errors.name.map((item) => (
                            <span key={ item } className="custom-input__error">{ item }</span>
                          )) }
                      </label>
                    </div>

                    <div className={ `custom-input ${errors.email ? 'custom-input--error' : ''}` }>
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="email"
                            name="email"
                            value={ newUser.email }
                            onChange={ handleNewUserChange } />
                        </span>
                        { errors.email &&
                          errors.email.map((item) => (
                            <span key={ item } className="custom-input__error">{ item }</span>
                          )) }
                      </label>
                    </div>

                    <div className={ `custom-input ${errors.birthDay ? 'custom-input--error' : ''}` }>
                      <label>
                        <span className="custom-input__label">Дата рождения</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="date"
                            name="birthDay"
                            max="2099-12-31"
                            value={ newUser.birthDay as string }
                            onChange={ handleNewUserChange } />
                        </span>
                        { errors.birthDay &&
                          errors.birthDay.map((item) => (
                            <span key={ item } className="custom-input__error">{ item }</span>
                          )) }
                      </label>
                    </div>

                    <div className={ locationClass }>
                      <span className="custom-select__label">Ваша локация</span>
                      <button
                        className="custom-select__button"
                        type="button"
                        aria-label="Выберите одну из опций"
                        onClick={ () => setIsLocationOpen(!isLocationOpen) }
                      >
                        <span className="custom-select__text">{ newUser.location }</span>
                        <span className="custom-select__icon">
                          <svg width="15" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-down"></use>
                          </svg>
                        </span>
                      </button>
                      <ul className="custom-select__list" role='listbox'>
                        {
                          Locations.map((item) => (
                            <option
                              key={ item }
                              value={ item }
                              role='listitem'
                              className='custom-select__item capitalize'
                              onClick={ onLocationClick }
                            >{ item }</option>
                          ))
                        }
                      </ul>
                      { errors.location &&
                        errors.location.map((item) => (
                          <span key={ item } className="custom-select__error" style={ { position: 'initial' } }>{ item }</span>
                        )) }
                    </div>

                    <div className={ `custom-input ${errors.password ? 'custom-input--error' : ''}` }>
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            onChange={ handleNewUserChange } />
                        </span>
                        { errors.password &&
                          errors.password.map((item) => (
                            <span key={ item } className="custom-input__error">{ item }</span>
                          )) }
                      </label>
                    </div>

                    <div className="sign-up__radio">
                      <span className="sign-up__label">Пол</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big">
                        {
                          [ Gender.Male, Gender.Female, Gender.Unknown ].map((item) => (
                            <div className="custom-toggle-radio__block" key={ item }>
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value={ item }
                                  defaultChecked={ item === newUser.gender }
                                  onChange={ handleNewUserChange } />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label capitalize">{ item }</span>
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>

                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      {
                        [ UserRole.Trainer, UserRole.Customer ].map((item) => (
                          <div className="role-btn" key={ item }>
                            <label>
                              <input
                                className="visually-hidden"
                                type="radio"
                                name="role"
                                value={ item }
                                defaultChecked={ item === newUser.role }
                                onChange={ handleNewUserChange }
                              />
                              <span className="role-btn__icon">
                                <svg width="12" height="13" aria-hidden="true">
                                  <use xlinkHref="#icon-cup"></use>
                                </svg>
                              </span>
                              <span className="role-btn__btn">
                                { item === UserRole.Trainer ?
                                  'Я хочу тренировать' :
                                  'Я хочу тренироваться'
                                }
                              </span>
                            </label>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div className="sign-up__checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement"
                        name="user-agreement"
                        defaultChecked={ isAgreeWithPolicy }
                        onClick={ () => setIsAgreeWithPolicy(!isAgreeWithPolicy) }
                      />
                      <span className="sign-up__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                    </label>
                  </div>
                  <button
                    className="btn sign-up__button"
                    type="submit"
                    disabled={ !isAgreeWithPolicy }
                  >Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>);
}

export default Register;
