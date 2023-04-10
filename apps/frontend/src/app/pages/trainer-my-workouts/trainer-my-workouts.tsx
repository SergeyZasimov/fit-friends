import styles from './trainer-my-workouts.module.css';

/* eslint-disable-next-line */
export interface TrainerMyWorkoutsProps {}

export function TrainerMyWorkouts(props: TrainerMyWorkoutsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TrainerMyWorkouts!</h1>
    </div>
  );
}

export default TrainerMyWorkouts;
