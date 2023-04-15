import { UrlDomain, Workout } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { createApi } from '../../../services/api.service';

export const useFetchWorkouts = (query: string) => {
  const api = createApi();

  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<Workout[]>(
        `/${UrlDomain.Workout}?${query}`
      );
      setWorkouts(data);
    };
    fetchData();
  }, []);

  return workouts;
};
