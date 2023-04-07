import { TrainingTypes } from '@fit-friends/shared';
import { ChangeEvent } from 'react';

export interface SpecializationProps {
  specialization: string[],
  isDisabled: boolean;
  onSpecializationChange: (evt: ChangeEvent) => void;
}

export function Specialization({ specialization, isDisabled, onSpecializationChange }: SpecializationProps) {

  return (
    <>
      {
        TrainingTypes.map((item) => (
          <div className="btn-checkbox" key={ item }>
            <label>
              <input
                className="visually-hidden"
                type="checkbox"
                name="trainingType"
                value={ item }
                checked={ specialization.includes(item) }
                disabled={ isDisabled }
                onChange={ onSpecializationChange }
              />
              <span className="btn-checkbox__btn capitalize">{ item }</span>
            </label>
          </div>
        ))
      }
    </>
  );
}

export default Specialization;
