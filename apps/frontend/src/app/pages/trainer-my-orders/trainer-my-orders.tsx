import { BasicQuery, SortOption, SortType } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { browserHistory } from '../../services/browser-history.service';
import { fetchOrders } from '../../store/features/order/api-actions';
import { getOrdersForTrainer } from '../../store/features/order/order-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { AppRoute } from '../../utils/constants';
import { createQueryString } from '../../utils/helpers';

export const DEFAULT_ORDERS_OFFSET = 4;

export function TrainerMyOrders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrdersForTrainer);
  const [ offset, setOffset ] = useState(DEFAULT_ORDERS_OFFSET);
  const [ totalPriceSortDirection, setTotalPriceSortDirection ] = useState<string>(SortType.Asc);
  const [ countSortDirection, setCountSortDirection ] = useState<string>(SortType.Asc);

  const [ query, setQuery ] = useState<BasicQuery>({});

  useEffect(() => {
    dispatch(fetchOrders(createQueryString(query)));
  }, [ query ]);

  const handlePriceSortChange = () => {
    setTotalPriceSortDirection(totalPriceSortDirection === SortType.Desc ? SortType.Asc : SortType.Desc);
    setQuery({ ...query, sortOption: SortOption.Price, sortType: totalPriceSortDirection });
  };

  const handleCountSortChange = () => {
    setCountSortDirection(countSortDirection === SortType.Desc ? SortType.Asc : SortType.Desc);
    setQuery({ ...query, sortOption: SortOption.Count, sortType: countSortDirection });
  };

  return (
    <>
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button
                className="btn-flat btn-flat--underlined my-orders__back"
                type="button"
                onClick={ () => browserHistory.back() }
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={ handlePriceSortChange }
                    >
                      <span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        {
                          totalPriceSortDirection === SortType.Desc
                            ?
                            <use xlinkHref="#icon-sort-down"></use>
                            :
                            <use xlinkHref="#icon-sort-up"></use>
                        }
                      </svg>
                    </button>
                    <button
                      className="btn-filter-sort"
                      type="button"
                      onClick={ handleCountSortChange }
                    >
                      <span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        {
                          countSortDirection === SortType.Desc
                            ?
                            <use xlinkHref="#icon-sort-down"></use>
                            :
                            <use xlinkHref="#icon-sort-up"></use>
                        }
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {
                  orders.slice(0, offset).map(({ workout, count, totalPrice }) => (
                    <li className="my-orders__item" key={ workout.id }>
                      <div className="thumbnail-training">
                        <div className="thumbnail-training__inner">
                          <div className="thumbnail-training__image">
                            <picture>
                              <img
                                src={ workout.backgroundImage }
                                width="330"
                                height="190"
                                alt=""
                              />
                            </picture>
                          </div>
                          <p className="thumbnail-training__price">
                            <span className="thumbnail-training__price-value">{ workout.price }</span><span>₽</span>
                          </p>
                          <h2 className="thumbnail-training__title">energy</h2>
                          <div className="thumbnail-training__info">
                            <ul className="thumbnail-training__hashtags-list">
                              <li className="thumbnail-training__hashtags-item">
                                <div className="hashtag thumbnail-training__hashtag"><span>#{ workout.trainingType }</span></div>
                              </li>
                              <li className="thumbnail-training__hashtags-item">
                                <div className="hashtag thumbnail-training__hashtag"><span>#{ workout.caloriesAmountToLose }ккал</span></div>
                              </li>
                            </ul>
                            <div className="thumbnail-training__rate">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-star"></use>
                              </svg><span className="thumbnail-training__rate-value">{ workout.rating }</span>
                            </div>
                          </div>
                          <div className="thumbnail-training__text-wrapper">
                            <p className="thumbnail-training__text">{ workout.description }</p>
                          </div>
                          <Link
                            className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
                            to={ `/${AppRoute.WorkoutCard}/${workout.id}` }
                          >
                            <svg width="18" height="18" aria-hidden="true">
                              <use xlinkHref="#icon-info"></use>
                            </svg><span>Подробнее</span>
                          </Link>
                        </div>
                        <div className="thumbnail-training__total-info">
                          <div className="thumbnail-training__total-info-card">
                            <svg width="32" height="32" aria-hidden="true">
                              <use xlinkHref="#icon-chart"></use>
                            </svg>
                            <p className="thumbnail-training__total-info-value">{ count }</p>
                            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
                          </div>
                          <div className="thumbnail-training__total-info-card">
                            <svg width="31" height="28" aria-hidden="true">
                              <use xlinkHref="#icon-wallet"></use>
                            </svg>
                            <p className="thumbnail-training__total-info-value">{ totalPrice }<span>₽</span></p>
                            <p className="thumbnail-training__total-info-text">Общая сумма</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="show-more my-orders__show-more">
                {
                  orders.length === orders.slice(0, offset).length
                    ?
                    <button
                      className="btn show-more__button"
                      type="button"
                      onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
                    >Вернуться в начало</button>
                    :
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={ () => setOffset(offset + DEFAULT_ORDERS_OFFSET) }
                    >Показать еще</button>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TrainerMyOrders;
