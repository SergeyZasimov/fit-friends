import styles from './trainer-account.module.css';

/* eslint-disable-next-line */
export interface TrainerAccountProps {}

export function TrainerAccount(props: TrainerAccountProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TrainerAccount!</h1>
    </div>
  );
}

export default TrainerAccount;
