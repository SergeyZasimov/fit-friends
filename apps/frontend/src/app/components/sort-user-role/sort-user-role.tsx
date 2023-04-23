import { ProfileQuery, UserRole } from '@fit-friends/shared';

export interface SortUserRoleProps {
  queryValue: string,
  onQueryChange: (value: ProfileQuery) => void;
}

export function SortUserRole({ queryValue, onQueryChange }: SortUserRoleProps) {

  return (
    <div className="user-catalog-form__block">
      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
      <div className="btn-radio-sort">
        <label>
          <input
            type="radio"
            name="sort"
            checked={ queryValue === UserRole.Trainer }
            onChange={ () => onQueryChange({ role: UserRole.Trainer }) }
          />
          <span className="btn-radio-sort__label">Тренеры</span>
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            checked={ queryValue === UserRole.Customer }
            onChange={ () => onQueryChange({ role: UserRole.Customer }) }
          />
          <span className="btn-radio-sort__label">Пользователи</span>
        </label>
      </div>
    </div>
  );
}

export default SortUserRole;
