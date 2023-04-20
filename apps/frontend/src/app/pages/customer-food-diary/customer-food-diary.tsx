import { TypeOfMeal } from '@fit-friends/shared';
import { useState } from 'react';
import Header from '../../components/header/header';
import CustomerFoodDiaryCell from './components/customer-food-diary-cell/customer-food-diary-cell';


export function CustomerFoodDiary() {

  const [ total, setTotal ] = useState<number[]>(Array.from({ length: 7 }));

  const handleTotalChange = (value: number, day: number) => {
    console.log(value, day);
    setTotal(prevState => {
      prevState[ day ] = value;
      return prevState;
    });
  };

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="food-diary">
                  <div className="food-diary__wrapper">
                    <h1 className="food-diary__title">Дневник питания</h1>
                    <div className="food-diary__block">
                      <div className="food-diary__sidebar">
                        <svg className="food-diary__icon" width="21" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-book"></use>
                        </svg>
                        <ul className="food-diary__list">
                          { Object.values(TypeOfMeal).map(item => (
                            <li className="food-diary__item" key={ item }>
                              <span>{ item }</span>
                            </li>
                          )) }
                        </ul>
                        <p className="food-diary__total">Итого</p>
                      </div>
                      <div className="food-diary__content">
                        <form action="#" method="get">
                          <table className="food-diary__table">
                            <tr className="food-diary__row food-diary__row--head">
                              <th className="food-diary__cell food-diary__cell--head">пн</th>
                              <th className="food-diary__cell food-diary__cell--head">вт</th>
                              <th className="food-diary__cell food-diary__cell--head">ср</th>
                              <th className="food-diary__cell food-diary__cell--head">чт</th>
                              <th className="food-diary__cell food-diary__cell--head">пт</th>
                              <th className="food-diary__cell food-diary__cell--head">сб</th>
                              <th className="food-diary__cell food-diary__cell--head">вс</th>
                            </tr>
                            {
                              Object.values(TypeOfMeal).map((mealType) => (
                                <tr className="food-diary__row" key={ mealType }>
                                  { Array.from({ length: 7 }, (_, index) => {
                                    const currentDay = index + 1 !== 7 ? index + 1 : 0;
                                    return <CustomerFoodDiaryCell
                                      key={ `${mealType}-${currentDay}` }
                                      day={ currentDay }
                                      mealType={ mealType }
                                      value={ 0 }
                                      onTotalChange={ handleTotalChange }
                                    />;
                                  }) }
                                </tr>
                              ))
                            }
                            <tr className="food-diary__row">
                              { Array.from({ length: 7 }, (_, index) => {
                                const currentDay = index + 1 !== 7 ? index + 1 : 0;
                                const value = total[ currentDay ] ?? 0;
                                return (
                                  <td className="food-diary__cell" key={ currentDay }>
                                    <div className="food-diary__total-value">
                                      <span>{ value }</span>
                                    </div>
                                  </td>
                                );
                              }) }
                            </tr>
                          </table>
                        </form>
                      </div>
                    </div>
                    <div className="total food-diary__total-per-week">
                      <div className="total__title-wrapper">
                        <div className="total__title">Итого за неделю</div>
                        <svg className="total__icon" width="30" height="30" aria-hidden="true">
                          <use xlinkHref="#icon-chart-with-arrow"></use>
                        </svg>
                      </div>
                      <p className="total__number">18 130</p>
                    </div>
                    <button className="btn food-diary__button" type="button">Сохранить</button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CustomerFoodDiary;
