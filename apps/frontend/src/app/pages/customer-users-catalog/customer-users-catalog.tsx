import { useEffect } from 'react';
import Header from '../../components/header/header';
import { browserHistory } from '../../services/browser-history.service';
import CustomerUsersCatalogFilter from './components/customer-users-catalog-filter/customer-users-catalog-filter';
import CustomerUsersCatalogList from './components/customer-users-catalog-list/customer-users-catalog-list';


export function CustomerUsersCatalog() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined user-catalog-form__btnback"
                    type="button"
                    onClick={ () => browserHistory.back() }
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <CustomerUsersCatalogFilter />
                </div>
              </div>
              <div className="inner-page__content">
                <CustomerUsersCatalogList />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerUsersCatalog;
