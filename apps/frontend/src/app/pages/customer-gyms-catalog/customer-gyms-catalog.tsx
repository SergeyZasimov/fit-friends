import Header from '../../components/header/header';
import { browserHistory } from '../../services/browser-history.service';
import CustomerGymsCatalogFilter from './components/customer-gyms-catalog-filter/customer-gyms-catalog-filter';
import CustomerGymsCatalogList from './components/customer-gyms-catalog-list/customer-gyms-catalog-list';

/* eslint-disable-next-line */
export interface CustomerGymsCatalogProps { }

export function CustomerGymsCatalog(props: CustomerGymsCatalogProps) {
  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог залов</h1>
              <div className="gym-hall-form">
                <h2 className="visually-hidden">Каталог залов фильтр</h2>
                <div className="gym-hall-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined gym-hall-form__btnback"
                    type="button"
                    onClick={ () => browserHistory.back() }
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="gym-hall-form__title">Фильтры</h3>
                  <CustomerGymsCatalogFilter />
                </div>
              </div>
              <CustomerGymsCatalogList />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerGymsCatalog;
