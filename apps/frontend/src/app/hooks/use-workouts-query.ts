import { SortOption, WorkoutQuery } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { fetchWorkouts } from '../store/features/workout/api-actions';
import { useAppDispatch } from '../store/store.hooks';
import { checkValueInCollection, createQueryString } from '../utils/helpers';

export const useWorkoutsQuery = () => {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<WorkoutQuery>({});

  useEffect(() => {
    const queryString = createQueryString(query);
    dispatch(fetchWorkouts(queryString));
  }, [query]);

  const handleChangeQuery = (value: WorkoutQuery) => {
    setQuery({ ...query, ...value });
  };

  const handleTrainingTimeChange = (item: string) => {
    let newValues: string[];
    if (query.trainingTime) {
      newValues = checkValueInCollection(query.trainingTime, item);
    } else {
      newValues = [item];
    }
    setQuery({ ...query, trainingTime: newValues });
  };

  const handleTrainingTypeChange = (item: string) => {
    let newValues: string[];
    if (query.trainingType) {
      newValues = checkValueInCollection(query.trainingType, item);
    } else {
      newValues = [item];
    }
    setQuery({ ...query, trainingType: newValues });
  };

  const handleSortChange = (item: string) => {
    setQuery({ ...query, sortOption: SortOption.Price, sortType: item });
  };

  const handleFreeWorkoutClick = () => {
    setQuery({ ...query, priceRange: [0, 0] });
  };

  return {
    handleChangeQuery,
    handleTrainingTimeChange,
    handleTrainingTypeChange,
    handleSortChange,
    handleFreeWorkoutClick,
  };
};
