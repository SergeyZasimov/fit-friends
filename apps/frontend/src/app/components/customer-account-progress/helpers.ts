import { FoodDiary, WorkoutDiary } from '@fit-friends/shared';
import dayjs from 'dayjs';
import { WEEK_DAYS } from '../../utils/constants';

export const calculateGainCaloriesPerDay = (records: FoodDiary[]): number[] => {
  const result = Array.from({ length: WEEK_DAYS }, () => 0);
  records.forEach((record) => {
    const recordDay = getDayIndex(dayjs(record.dateOfMeal).day());
    result[recordDay] += record.caloriesAmount;
  });
  return [...result];
};

export const calculateLossCaloriesPerDay = (
  records: WorkoutDiary[]
): number[] => {
  const result = Array.from({ length: WEEK_DAYS }, () => 0);
  records.forEach((record) => {
    const recordDay = getDayIndex(dayjs(record.workoutDate).day());
    result[recordDay] += record.lostCaloriesAmount;
  });
  return [...result];
};

export const calculateProgressPerDay = (
  gainCalories: number[],
  lossCalories: number[]
): number[] => {
  const result = Array.from({ length: WEEK_DAYS }, (_, index) => {
    return lossCalories[index] - gainCalories[index];
  });
  return [...result];
};

export const getProgressCellColor = (
  value: number,
  caloriesToLosePerDay: number
): string => {
  if (value < 0) {
    return 'red';
  }

  if (value > 0 && value < caloriesToLosePerDay) {
    return 'red';
  }

  return 'green';
};

export const getDayIndex = (value: number): number => {
  return value === 0 ? 6 : value - 1;
};
