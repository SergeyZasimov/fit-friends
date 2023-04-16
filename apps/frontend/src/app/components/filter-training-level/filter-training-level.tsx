import { ProfileQuery, TrainingLevels } from '@fit-friends/shared';

export interface FilterTrainingLevelProps {
  queryValue: string;
  onQueryChange: (value: ProfileQuery) => void;
}

export function FilterTrainingLevel({ queryValue, onQueryChange }: FilterTrainingLevelProps) {

  const handleTrainingLevelChange = (value: string) => {
    onQueryChange({ trainingLevel: value });
  };

  return (
    <div className="user-catalog-form__block user-catalog-form__block--level">
      <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
      <div className="custom-toggle-radio">
        {
          TrainingLevels.map(level => (
            <div className="custom-toggle-radio__block" key={ level }>
              <label>
                <input
                  type="radio"
                  name="trainingLevel"
                  value={ level }
                  checked={ queryValue === level }
                  onChange={ () => handleTrainingLevelChange(level) }
                />
                <span className="custom-toggle-radio__icon"></span>
                <span className="custom-toggle-radio__label capitalize">{ level }</span>
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FilterTrainingLevel;
