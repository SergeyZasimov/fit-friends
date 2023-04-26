import { UserRole } from '@fit-friends/shared';
import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../services/token.service';
import { fetchUser, login } from '../../store/features/user/api-actions';
import { getErrors, getUser, getUserRequestStatus } from '../../store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { AppRoute, RequestStatus } from '../../utils/constants';

export function SignIn() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const user = useAppSelector(getUser);
  const status = useAppSelector(getUserRequestStatus);
  const errors = useAppSelector(getErrors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data = {
      email: (emailRef.current as unknown as HTMLInputElement).value,
      password: (passwordRef.current as unknown as HTMLInputElement).value
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (getAccessToken() && status === RequestStatus.Success) {
      dispatch(fetchUser());

      if (user && user.role === UserRole.Customer) {
        navigate(`/${AppRoute.CustomerMain}`);
      }

      if (user && user.role === UserRole.Trainer) {
        navigate(`/${AppRoute.TrainerAccount}`);
      }
    }
  }, [ status, dispatch, user, navigate ]);

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
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form onSubmit={ handleSubmit }>
                <div className="sign-in">
                  <div className={ `custom-input sign-in__input ${errors.email ? 'custom-input--error' : ''}` }>
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input type="email" name="email" ref={ emailRef } />
                      </span>
                      { errors.email &&
                        errors.email.map((item) => (
                          <span key={ item } className="custom-input__error">{ item }</span>
                        )) }
                    </label>
                  </div>
                  <div className={ `custom-input sign-in__input ${errors.password ? 'custom-input--error' : ''}` }>
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input type="password" name="password" ref={ passwordRef } />
                      </span>
                      { errors.password &&
                        errors.password.map((item) => (
                          <span key={ item } className="custom-input__error">{ item }</span>
                        )) }
                    </label>
                  </div>
                  <button className="btn sign-in__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
