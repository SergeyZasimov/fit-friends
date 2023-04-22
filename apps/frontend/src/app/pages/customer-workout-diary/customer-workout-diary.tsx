import { WorkoutDiary } from '@fit-friends/shared';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import Header from '../../components/header/header';
import { getWorkoutDiaryRecords } from '../../store/features/workout-diary/workout-diary.slice';
import { useAppSelector } from '../../store/store.hooks';
import { WEEK_DAYS } from '../../utils/constants';
import { formatPrice, getCurrentDayIndex } from '../../utils/helpers';

export type WorkoutDiaryTable = WorkoutDiary[][];

export const createTable = (records: WorkoutDiary[]): WorkoutDiaryTable => {
  const initialState: WorkoutDiaryTable = Array.from({ length: 7 }, () => []);
  records.forEach(record => {
    const recordDay = dayjs(record.workoutDate).day();
    initialState[ recordDay ].push(record);
  });
  return initialState;
};

export const calculateDayTotal = (tableRow: WorkoutDiary[]): number => {
  if (!tableRow.length) {
    return 0;
  }

  return tableRow.reduce((sum, item) => {
    return sum += item.lostCaloriesAmount;
  }, 0);
};

export const calculateWeekTotal = (table: WorkoutDiaryTable): number => {
  return table.reduce((sum, row) => {
    return sum += calculateDayTotal(row);
  }, 0);
};

export function CustomerWorkoutDiary() {
  const workoutDiaryRecords = useAppSelector(getWorkoutDiaryRecords);

  const [ table, setTable ] = useState<WorkoutDiaryTable>([]);

  useEffect(() => {
    setTable(createTable(workoutDiaryRecords));
  }, [ workoutDiaryRecords ]);

  const maxWorkoutCount = table.length > 0 && [ ...table ].sort((a, b) => b.length - a.length)[ 0 ].length;

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <BackButton />
              <div className="inner-page__content">
                <section className="training-diary">
                  <div className="training-diary__wrapper">
                    <h1 className="training-diary__title">Дневник тренировок</h1>
                    <div className="training-diary__block">
                      <div className="training-diary__sidebar">
                        <svg className="training-diary__icon" width="17" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-ranking"></use>
                        </svg>
                        <ul className="training-diary__list">
                          { maxWorkoutCount &&
                            Array.from({ length: maxWorkoutCount }, (_, index) => (
                              <li className="training-diary__item" key={ index }>
                                <span>Тренировка { index + 1 }</span>
                                <ul className="training-diary__sublist">
                                  <li className="training-diary__subitem"><span>Калории</span></li>
                                  <li className="training-diary__subitem"><span>Время</span></li>
                                </ul>
                              </li>
                            ))
                          }
                        </ul>
                        <div className="training-diary__total" style={ { marginTop: '47px' } }>
                          <p className="training-diary__total-label">Итого</p>
                          <ul className="training-diary__total-list">
                            <li className="training-diary__total-item"><span>Калории</span></li>
                          </ul>
                        </div>
                      </div>
                      <div className="training-diary__content">
                        <table className="training-diary__table">
                          <tr className="training-diary__row training-diary__row--head">
                            <th className="training-diary__cell training-diary__cell--head">пн</th>
                            <th className="training-diary__cell training-diary__cell--head">вт</th>
                            <th className="training-diary__cell training-diary__cell--head">ср</th>
                            <th className="training-diary__cell training-diary__cell--head">чт</th>
                            <th className="training-diary__cell training-diary__cell--head">пт</th>
                            <th className="training-diary__cell training-diary__cell--head">сб</th>
                            <th className="training-diary__cell training-diary__cell--head">вс</th>
                          </tr>
                          {
                            maxWorkoutCount && table.length > 0 &&
                            Array.from({ length: maxWorkoutCount }, (_, workoutNumber) => (
                              <Fragment key={ workoutNumber }>
                                <tr className="training-diary__row">
                                  {
                                    Array.from({ length: WEEK_DAYS }, (_, index) => {
                                      const currentDay = getCurrentDayIndex(index);
                                      const dayWorkouts = table[ currentDay ];
                                      const value = dayWorkouts.length > 0
                                        ? dayWorkouts[ workoutNumber ]?.lostCaloriesAmount
                                        : '';
                                      return (
                                        <td className="training-diary__cell" key={ `calories-${currentDay}` }>
                                          <div className="training-diary__data"><span>{ value }</span></div>
                                        </td>
                                      );
                                    })
                                  }
                                </tr>
                                <tr className="training-diary__row">
                                  {
                                    Array.from({ length: WEEK_DAYS }, (_, index) => {
                                      const currentDay = getCurrentDayIndex(index);
                                      const dayWorkouts = table[ currentDay ];
                                      const value = dayWorkouts.length > 0
                                        ? dayWorkouts[ workoutNumber ]?.lostTrainingTime
                                        : '';
                                      return (
                                        <td className="training-diary__cell" key={ `time-${currentDay}` }>
                                          <div className="training-diary__data"><span>{ value }</span></div>
                                        </td>
                                      );
                                    })
                                  }
                                </tr>
                              </Fragment>
                            ))
                          }
                          <tr className="training-diary__row" style={ { marginTop: '115px' } }>
                            {
                              table.length > 0 &&
                              Array.from({ length: WEEK_DAYS }, (_, index) => {
                                const currentDay = getCurrentDayIndex(index);
                                const tableRow = table[ currentDay ];
                                const value = calculateDayTotal(tableRow);

                                return (
                                  <td className="training-diary__cell" key={ `total=${currentDay}` }>
                                    <div className="training-diary__data training-diary__data--total">
                                      <span>{ value }</span></div>
                                  </td>
                                );
                              })
                            }
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="total training-diary__total-per-week">
                      <div className="total__title-wrapper">
                        <div className="total__title">Итого за неделю</div>
                        <svg className="total__icon" width="30" height="30" aria-hidden="true">
                          <use xlinkHref="#icon-chart-with-arrow"></use>
                        </svg>
                      </div>
                      <dl className="total__result">
                        <div className="total__item">
                          <dt className="total__label">Калории</dt>
                          <dd className="total__number">{ table.length > 0 && formatPrice(calculateWeekTotal(table)) }</dd>
                        </div>
                      </dl>
                    </div>
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

export default CustomerWorkoutDiary;


                            // return Array.from({length: 7}, (_, index) => {
                              //   const currentDay = getCurrentDayIndex(index)
                              //   const workoutDiary: WorkoutDiary = table[currentDay][workoutNumber]
                              //   return (

                              //   )
                              // })
