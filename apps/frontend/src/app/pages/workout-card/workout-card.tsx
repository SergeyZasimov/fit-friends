import { CreateWorkout, User, UserRole } from '@fit-friends/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateOrderPopup from '../../components/create-order-popup/create-order-popup';
import Header from '../../components/header/header';
import ReviewList from '../../components/review-list/review-list';
import Video from '../../components/video/video';
import { getUser } from '../../store/features/user/user-slice';
import { fetchWorkout, updateWorkout } from '../../store/features/workout/api-actions';
import { getWorkout, getWorkoutErrors } from '../../store/features/workout/workout-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';


export function WorkoutCard() {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const workout = useAppSelector(getWorkout);
  const errors = useAppSelector(getWorkoutErrors);
  const user = useAppSelector(getUser);
  const [ isFormDisabled, setIsFormDisabled ] = useState(true);
  const [ isOrderPopupOpen, setIsOrderPopupOpen ] = useState(false);

  const [ workoutForm, setWorkoutForm ] = useState<Partial<CreateWorkout>>({});


  useEffect(() => {
    dispatch(fetchWorkout(id as string));
  }, [ id ]);

  useEffect(() => {
    setWorkoutForm({
      title: workout?.title,
      description: workout?.description,
      price: workout?.price
    });
  }, [ workout ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const handleFormChange = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setWorkoutForm({ ...workoutForm, [ name ]: value });
  };

  const handleSubmit = () => {
    setIsFormDisabled(!isFormDisabled);
    dispatch(updateWorkout({ workoutId: workout?.id as number, formData: workoutForm }));
  };

  const handleSetIsSpecial = () => {
    dispatch(updateWorkout({ workoutId: workout?.id as number, formData: { isSpecial: true } }));
  };

  if (!workout) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <Header />
      <main>
        { isOrderPopupOpen &&
          <CreateOrderPopup
            onClose={ () => setIsOrderPopupOpen(false) }
            workout={ workout }
            title='Купить тренировку'
          /> }
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewList workoutId={ id as string } />
              <div className="training-card training-card--edit">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <img
                            src={ (workout.trainer as User).profile?.avatar as string }
                            width="64"
                            height="64"
                            alt={ (workout?.trainer as User).profile?.name }
                          />
                        </picture>
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{ (workout?.trainer as User).profile?.name }</span></div>
                    </div>
                    {
                      user?.role === UserRole.Trainer &&
                      (isFormDisabled ?
                        <button
                          className="btn-flat btn-flat--light training-info__edit"
                          type="button"
                          onClick={ () => setIsFormDisabled(!isFormDisabled) }
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg><span>Редактировать</span>
                        </button>
                        :
                        <button
                          className="btn-flat btn-flat--light btn-flat--underlined"
                          type="button"
                          onClick={ handleSubmit }
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg><span>Сохранить</span>
                        </button>)
                    }
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label><span className="training-info__label">Название тренировки</span>
                              <input
                                type="text"
                                name="title"
                                value={ workoutForm.title }
                                disabled={ isFormDisabled }
                                onChange={ handleFormChange }
                              />
                            </label>
                            { errors && errors.title &&
                              <div className="training-info__error" style={ { opacity: '100%' } }>{ errors?.title }</div>
                            }
                          </div>
                          <div className="training-info__textarea">
                            <label><span className="training-info__label">Описание тренировки</span>
                              <textarea
                                name="description"
                                value={ workoutForm.description }
                                disabled={ isFormDisabled }
                                onChange={ handleFormChange }
                              ></textarea>
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label>
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg>
                              </span>
                              <input
                                type="number"
                                name="rating"
                                value={ workout.rating }
                                disabled
                              />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{ workout.trainingType }</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{ workout.favorGender }</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{ workout.caloriesAmountToLose }ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{ workout.trainingTime }</span></div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label>
                              <span className="training-info__label">Стоимость</span>
                              <input
                                type="text"
                                name="price"
                                value={ `${workoutForm.price}` }
                                disabled={ isFormDisabled }
                                onChange={ handleFormChange }
                              />
                            </label>
                            { errors && errors.price &&
                              <div className="training-info__error" style={ { opacity: '100%' } }>{ errors?.price }</div>
                            }
                          </div>
                          {
                            user?.role === UserRole.Trainer
                              ?
                              <button
                                className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                                type="button"
                                disabled={ workout.isSpecial }
                                onClick={ handleSetIsSpecial }
                              >
                                <svg width="14" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-discount"></use>
                                </svg><span>Сделать скидку 10%</span>
                              </button>
                              :
                              <button
                                className="btn training-info__buy"
                                type="button"
                                onClick={ () => setIsOrderPopupOpen(true) }
                              >Купить</button>
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <Video workout={ workout } />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default WorkoutCard;
