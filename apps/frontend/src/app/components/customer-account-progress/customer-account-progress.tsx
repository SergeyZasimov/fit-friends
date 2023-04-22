import { useEffect, useState } from 'react';
import { getFoodDiaryRecords } from '../../store/features/food-diary/food-diary.slice';
import { getWorkoutDiaryRecords } from '../../store/features/workout-diary/workout-diary.slice';
import { useAppSelector } from '../../store/store.hooks';
import { WEEK_DAYS } from '../../utils/constants';
import { calculateGainCaloriesPerDay, calculateLossCaloriesPerDay, calculateProgressPerDay, getProgressCellColor } from './helpers';

export const WEEK = [ 'пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс' ];
export const PROGRESS_DAY_QUANTITY = 4;

export interface CustomerAccountProgressProps {
  caloriesToLosePerDay: number;
}

export function CustomerAccountProgress({ caloriesToLosePerDay }: CustomerAccountProgressProps) {

  const foodDiaryRecords = useAppSelector(getFoodDiaryRecords);
  const workoutDiaryRecords = useAppSelector(getWorkoutDiaryRecords);

  const [ gainCalories, setGainCalories ] = useState<number[]>([]);
  const [ lossCalories, setLossCalories ] = useState<number[]>([]);
  const [ progressCalories, setProgressCalories ] = useState<number[]>([]);
  const [ progressDay, setProgressDay ] = useState<number>(0);

  useEffect(() => {
    setGainCalories(calculateGainCaloriesPerDay(foodDiaryRecords));
  }, [ foodDiaryRecords ]);

  useEffect(() => {
    setLossCalories(calculateLossCaloriesPerDay(workoutDiaryRecords));
  }, [ workoutDiaryRecords ]);

  useEffect(() => {
    setProgressCalories(calculateProgressPerDay(gainCalories, lossCalories));
  }, [ gainCalories, lossCalories ]);

  const handlePrevButtonClick = () => {
    const newDay = progressDay - 1;
    if (newDay >= 0) {
      setProgressDay(newDay);
    }
  };

  const handleNextButtonClick = () => {
    const newDay = progressDay + 1;
    if (newDay + PROGRESS_DAY_QUANTITY <= WEEK_DAYS) {
      setProgressDay(newDay);
    }
  };

  const progressSliceCount = progressDay + PROGRESS_DAY_QUANTITY;

  return (
    <section className="my-progress personal-account-user__my-progress">
      <div className="my-progress__sidebar">
        <svg className="my-progress__icon" width="46" height="51" aria-hidden="true">
          <use xlinkHref="#icon-chart-filled"></use>
        </svg>
        <ul className="my-progress__list">
          <li className="my-progress__item"><span>поступило, Ккал</span></li>
          <li className="my-progress__item"><span>ушло,<br /> Ккал</span></li>
          <li className="my-progress__item"><span>Итого за&nbsp;день, Ккал</span></li>
        </ul>
      </div>
      <div className="my-progress__content">
        <div className="my-progress__title-wrapper">
          <h2 className="my-progress__title">Мой прогресс</h2>
          <div className="my-progress__controls">
            <button
              className="btn-icon btn-icon--outlined my-progress__control"
              type="button"
              aria-label="previous"
              onClick={ handlePrevButtonClick }
            >
              <svg width="11" height="8" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button
              className="btn-icon btn-icon--outlined my-progress__control"
              type="button"
              aria-label="next"
              onClick={ handleNextButtonClick }
            >
              <svg width="11" height="8" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <table className="my-progress__table" >
          <tbody>
            <tr className="my-progress__row my-progress__row--head">
              {
                WEEK.slice(progressDay, progressSliceCount).map(day => (
                  <th className="my-progress__cell my-progress__cell--head" key={ day }>{ day }</th>
                ))
              }
            </tr>
            <tr className="my-progress__row">
              {
                gainCalories.slice(progressDay, progressSliceCount).map((value, index) => (
                  <td className="my-progress__cell" key={ `progress-gain-${index}` }>{ value.toString() }</td>
                ))
              }
            </tr>
            <tr className="my-progress__row">
              {
                lossCalories.slice(progressDay, progressSliceCount).map((value, index) => (
                  <td className="my-progress__cell" key={ `progress-loss-${index}` }>{ value.toString() }</td>
                ))
              }
            </tr>
            <tr className="my-progress__row">
              {
                gainCalories.length > 0 && lossCalories.length > 0 &&
                progressCalories.slice(progressDay, progressSliceCount).map((value, index) => {
                  const cellColor = getProgressCellColor(value, caloriesToLosePerDay);
                  return (
                    <td
                      className={ `my-progress__cell my-progress__cell--${cellColor}` }
                      key={ `progress-total-${index}` }
                    >{ (Math.abs(value)).toString() }</td>
                  );
                }
                )
              }
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CustomerAccountProgress;
