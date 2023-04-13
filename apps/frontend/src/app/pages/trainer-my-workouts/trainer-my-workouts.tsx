import Header from '../../components/header/header';
import MyWorkoutsFilter from '../../components/my-workouts-filter/my-workouts-filter';
import MyWorkoutsList from '../../components/my-workouts-list/my-workouts-list';
import { browserHistory } from '../../services/browser-history.service';

export function TrainerMyWorkouts() {

  const handleBackClick = () => {
    browserHistory.back();
  };

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined my-training-form__btnback"
                    type="button"
                    onClick={ handleBackClick }
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <MyWorkoutsFilter />
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <MyWorkoutsList />

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TrainerMyWorkouts;
