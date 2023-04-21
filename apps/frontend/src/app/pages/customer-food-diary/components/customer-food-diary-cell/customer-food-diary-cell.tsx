import { CreateFoodDiary } from '@fit-friends/shared';
import dayjs from 'dayjs';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

export interface CustomerFoodDiaryCellProps {
  mealType: string;
  day: number;
  value: number;
  onTotalChange: (value: number, day: number, mealType: string) => void;
  onAddRecord: (record: CreateFoodDiary) => void;
}

export function CustomerFoodDiaryCell({ mealType, day, value, onTotalChange, onAddRecord }: CustomerFoodDiaryCellProps) {
  const [ cellValue, setCellValue ] = useState(value);

  useEffect(() => {
    setCellValue(value);
  }, [ value ]);

  const handleCellChange = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const newCellValue = parseInt(target.value) ?? 0;
    setCellValue(newCellValue);
  };

  const handleSaveValue = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const mealType = target.dataset.mealtype as string;
    const dayIndex = parseInt(target.dataset.day as string);
    const dateOfMeal = dayjs().day(dayIndex).toDate();

    const newFoodDiaryRecord: CreateFoodDiary = {
      caloriesAmount: cellValue,
      typeOfMeal: mealType,
      dateOfMeal: dateOfMeal
    };
    onAddRecord(newFoodDiaryRecord);
    onTotalChange(newFoodDiaryRecord.caloriesAmount, dayIndex, mealType);
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
