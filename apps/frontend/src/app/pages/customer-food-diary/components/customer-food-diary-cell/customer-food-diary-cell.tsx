import { CreateFoodDiary } from '@fit-friends/shared';
import dayjs from 'dayjs';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

/* eslint-disable-next-line */
export interface CustomerFoodDiaryCellProps {
  mealType: string;
  day: number;
  value: number;
  onTotalChange: (value: number, day: number) => void;
}

export function CustomerFoodDiaryCell({ mealType, day, value, onTotalChange }: CustomerFoodDiaryCellProps) {

  const [ cellValue, setCellValue ] = useState(value);

  const handleCellChange = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const newCellValue = parseInt(target.value) ?? 0;
    setCellValue(newCellValue);
  };

  const handleSaveValue = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    const newFoodDiaryRecord: CreateFoodDiary = {
      caloriesAmount: cellValue,
      typeOfMeal: target.dataset.mealtype as string,
      dateOfMeal: dayjs().day(parseInt(target.dataset.day as string)).toDate()
    };
    onTotalChange(newFoodDiaryRecord.caloriesAmount, parseInt(target.dataset.day as string));
  };

  const handleEnter = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      (evt.target as HTMLInputElement).blur();
    }
  };

  return (
    <td className="food-diary__cell">
      <div className="food-diary__input">
        <label>
          <input
            type="number"
            name="calories"
            value={ cellValue.toString() }
            onChange={ handleCellChange }
            data-mealtype={ mealType }
            data-day={ day }
            onBlur={ handleSaveValue }
            onKeyUp={ handleEnter }
          />
        </label>
      </div>
    </td>
  );
}

export default CustomerFoodDiaryCell;
