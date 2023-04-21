import { useEffect, useState } from 'react';
import { getWorkouts } from '../../store/features/workout/workout-slice';
import { useAppSelector } from '../../store/store.hooks';
import WorkoutListCard from '../workout-list-card/workout-list-card';

export const DEFAULT_OFFSET = 6;

export function MyWorkoutsList() {

  const workouts = useAppSelector(getWorkouts);

  const [ offset, setOffset ] = useState(DEFAULT_OFFSET);

  useEffect(() => {
    setOffset(DEFAULT_OFFSET);
  }, [ workouts ]);

  const handleAddOffset = () => {
    setOffset(prevState => {
      return prevState + DEFAULT_OFFSET;
    });
  };

  const handleUpClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!workouts) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <>
      <ul className="my-trainings__list">
        {
          workouts.slice(0, offset).map((workout) => (
            <li className="my-trainings__item" key={ workout.id }>
              <WorkoutListCard workout={ workout } />
            </li>
          ))
        }
      </ul >
      <div className="show-more my-trainings__show-more">
        {
          workouts.length !== workouts.slice(0, offset).length
            ?
            <button
              className="btn show-more__button show-more__button--more"
              type="button"
              onClick={ handleAddOffset }
            >
              Показать еще
            </button>
            :
            <button
              className="btn show-more__button"
              type="button"
              onClick={ handleUpClick }
            >Вернуться в начало</button>
        }

      </div >
    </>
  );
}

export default MyWorkoutsList;
