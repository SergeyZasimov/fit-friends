import { ProfileQuery } from '@fit-friends/shared';

/* eslint-disable-next-line */
export interface SortUserRoleProps {
  onQueryChange: (value: ProfileQuery) => void;
}

export function SortUserRole({ onQueryChange }: SortUserRoleProps) {

  return (
    <div className="user-catalog-form__block">
      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
      <div className="btn-radio-sort">
        <label>
          <input type="radio" name="sort" />
          <span className="btn-radio-sort__label">Тренеры</span>
        </label>
        <label>
          <input type="radio" name="sort" />
          <span className="btn-radio-sort__label">Пользователи</span>
        </label>
      </div>
    </div>
  );
}

export default SortUserRole;
