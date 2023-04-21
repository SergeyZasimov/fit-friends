import { CreateFoodDiary, TypeOfMeal } from '@fit-friends/shared';
import CustomerFoodDiaryCell from '../../pages/customer-food-diary/components/customer-food-diary-cell/customer-food-diary-cell';
import { FoodDiaryTable, WEEK_DAYS, getCurrentDayIndex } from '../../pages/customer-food-diary/customer-food-diary';

export interface FoodDiaryRowsProps {
  table: FoodDiaryTable;
  handleTotalChange: (value: number, day: number, mealType: string) => void;
  addNewFoodDiaryRecord: (record: CreateFoodDiary) => void;
}

export function FoodDiaryRows({ table, addNewFoodDiaryRecord, handleTotalChange }: FoodDiaryRowsProps) {
  return (
    <>
      {
        Object.values(TypeOfMeal).map((mealType: string) => (
          <tr className="food-diary__row" key={ mealType }>
            { Array.from({ length: WEEK_DAYS }, (_, index) => {
              const currentDay = getCurrentDayIndex(index);
              const currentValue = table[ mealType ][ currentDay ] ?? 0;
              return <CustomerFoodDiaryCell
                key={ `${mealType}-${currentDay}` }
                day={ currentDay }
                mealType={ mealType }
                value={ currentValue }
                onTotalChange={ handleTotalChange }
                onAddRecord={ addNewFoodDiaryRecord }
              />;
            }) }
          </tr>
        ))
      }
    </>
  );
}

export default FoodDiaryRows;
