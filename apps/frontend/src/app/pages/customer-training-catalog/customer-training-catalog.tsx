import BackButton from '../../components/back-button/back-button';
import Header from '../../components/header/header';
import MyWorkoutsList from '../../components/my-workouts-list/my-workouts-list';
import CustomerTrainingCatalogFilter from './customer-training-catalog-filter/customer-training-catalog-filter';

export function CustomerTrainingCatalog() {
  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <BackButton />
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <CustomerTrainingCatalogFilter />
                </div>
              </div>
              <div className="training-catalog">
                <MyWorkoutsList />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerTrainingCatalog;
