import { OrderType, SportGym, Workout } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import ShowMoreButtons from '../../components/show-more-buttons/show-more-buttons';
import WorkoutListCard from '../../components/workout-list-card/workout-list-card';
import { browserHistory } from '../../services/browser-history.service';
import { fetchCustomerOrders } from '../../store/features/order/api-actions';
import { getCustomerOrders } from '../../store/features/order/order-slice';
import { fetchFavoriteGyms } from '../../store/features/sport-gyms/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { createQueryString } from '../../utils/helpers';
import CustomerGymsCatalogCard from '../customer-gyms-catalog/components/customer-gyms-catalog-card/customer-gyms-catalog-card';

const PURCHASE_QUANTITY = 8;

export function CustomerMyPurchase() {

  const dispatch = useAppDispatch();
  const customerOrders = useAppSelector(getCustomerOrders);
  const [ offset, setOffset ] = useState(PURCHASE_QUANTITY);
  const [ sort, setSort ] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCustomerOrders(''));
    dispatch(fetchFavoriteGyms(''));
  }, []);

  useEffect(() => {
    if (sort) {
      dispatch(fetchCustomerOrders(createQueryString({
        orderType: sort
      })));
    } else {
      dispatch(fetchCustomerOrders(''));
    }
  }, [ sort ]);

  const handleSortChange = (value: string) => {
    if (value === sort) {
      setSort('');
    } else {
      setSort(value);
    }
  };

  if (!customerOrders) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button
                className="btn-flat my-purchases__back"
                type="button"
                onClick={ () => browserHistory.back() }
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement" />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                  <div className="btn-radio-sort">
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        checked={ sort === OrderType.SportGym }
                        onChange={ () => handleSortChange(OrderType.SportGym) }
                        
                      />
                      <span className="btn-radio-sort__label">Абонементы</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        checked={ sort === OrderType.Workout }
                        onChange={ () => handleSortChange(OrderType.Workout) }
                      />
                      <span className="btn-radio-sort__label">Тренировки</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {
                  customerOrders.slice(0, offset).map(order => (
                    <li className="my-purchases__item" key={ order.id }>
                      {
                        order.orderType === OrderType.Workout ?
                          <WorkoutListCard workout={ order.workout as Workout } /> :
                          <CustomerGymsCatalogCard gym={ order.sportGym as SportGym } />
                      }
                    </li>

                  ))
                }
              </ul>
              <div className="show-more my-purchases__show-more">
                <ShowMoreButtons
                  currentLength={ offset }
                  maxLength={ customerOrders.length }
                  onIncrease={ () => setOffset(offset + PURCHASE_QUANTITY) }
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CustomerMyPurchase;
