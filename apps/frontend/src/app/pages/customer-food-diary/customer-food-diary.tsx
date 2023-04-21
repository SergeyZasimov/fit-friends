import { CreateFoodDiary, FoodDiary, TypeOfMeal } from '@fit-friends/shared';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import FoodDiaryRows from '../../components/food-diary-rows/food-diary-rows';
import Header from '../../components/header/header';
import { createFoodDiaryRecords, fetchFoodDiaryRecords } from '../../store/features/food-diary/api-actions';
import { getFoodDiaryRecords } from '../../store/features/food-diary/food-diary.slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { createQueryString, formatPrice, isSameDate } from '../../utils/helpers';

export const WEEK_DAYS = 7;
export type FoodDiaryTable = Record<string, number[]>;

export const getCurrentDayIndex = (index: number): number => {
  const dayIndex = index + 1;
  return dayIndex !== WEEK_DAYS ? dayIndex : 0;
};

export const calculateDayTotal = (table: number[][], dayIndex: number): number => {
  return table.reduce((sum, item) => {
    const dayValue = item[ dayIndex ] ?? 0;
    return sum += dayValue;
  }, 0);
};

export const calculateWeekTotal = (table: number[][]): number => {
  return Array.from({ length: WEEK_DAYS }, (_, index) => index).reduce((sum, dayIndex) => {
    return sum += calculateDayTotal(table, dayIndex);
  }, 0);
};

export const createInitialTable = (records: FoodDiary[], table: FoodDiaryTable): FoodDiaryTable => {
  const initialTable: FoodDiaryTable = table;

  records.forEach(item => {
    const dayIndex = dayjs(item.dateOfMeal).day();
    initialTable[ item.typeOfMeal ][ dayIndex ] = item.caloriesAmount;
  });

  return initialTable;
};


export function CustomerFoodDiary() {
  const dispatch = useAppDispatch();
  const foodDiaryRecords = useAppSelector(getFoodDiaryRecords);
  const [ newFoodDiaryRecords, setNewFoodDiaryRecords ] = useState<CreateFoodDiary[]>([]);

  const [ table, setTable ] = useState<FoodDiaryTable>({
    [ TypeOfMeal.Breakfast ]: Array.from({ length: WEEK_DAYS }),
    [ TypeOfMeal.Dinner ]: Array.from({ length: WEEK_DAYS }),
    [ TypeOfMeal.Supper ]: Array.from({ length: WEEK_DAYS }),
    [ TypeOfMeal.Lunch ]: Array.from({ length: WEEK_DAYS }),
  });

  useEffect(() => {
    const query = {
      weekBegin: dayjs().day(1).toISOString(),
      weekEnd: dayjs().day(7).toISOString(),
    };
    dispatch(fetchFoodDiaryRecords(createQueryString(query)));
  }, []);

  useEffect(() => {
    const initialTable = createInitialTable(foodDiaryRecords, table);
    setTable({ ...initialTable });
  }, [ foodDiaryRecords ]);

  const handleTotalChange = (value: number, day: number, mealType: string) => {
    setTable(prevState => {
      prevState[ mealType ][ day ] = value;
      return { ...prevState };
    });
  };

  const handleSubmit = () => {
    dispatch(createFoodDiaryRecords(newFoodDiaryRecords));
  };

  const addNewFoodDiaryRecord = (record: CreateFoodDiary) => {
    const existRecordIndex = newFoodDiaryRecords.findIndex(
      item => isSameDate(item.dateOfMeal, record.dateOfMeal) && item.typeOfMeal === record.typeOfMeal
    );

    if (existRecordIndex === -1) {
      setNewFoodDiaryRecords([ ...newFoodDiaryRecords, record ]);
    } else {
      setNewFoodDiaryRecords(prevState => {
        prevState.splice(existRecordIndex, 1, record);
        return [ ...prevState ];
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <BackButton />
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
                            <FoodDiaryRows
                              table={ table }
                              addNewFoodDiaryRecord={ addNewFoodDiaryRecord }
                              handleTotalChange={ handleTotalChange }
                            />
                            <tr className="food-diary__row">
                              { Array.from({ length: WEEK_DAYS }, (_, index) => {
                                const currentDay = getCurrentDayIndex(index);
                                const value = calculateDayTotal(Object.values(table), currentDay);
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
                      <p className="total__number">{ formatPrice(calculateWeekTotal(Object.values(table))) }</p>
                    </div>
                    <button
                      className="btn food-diary__button"
                      type="button"
                      onClick={ handleSubmit }
                    >
                      Сохранить
                    </button>
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
