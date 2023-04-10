import { Gender, Locations, TrainingLevels, TrainingTimes, TrainingTypes } from '@fit-friends/shared';
import classnames from 'classnames';
import { SyntheticEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoute, CustomSelectField } from '../../utils/constants';
import { capitalizeWord } from '../../utils/helpers';

export interface CustomSelectProps {
  isDisabled?: boolean;
  fieldName: string;
  value: string;
  propertyName: string;
  onSelect: (evt: SyntheticEvent<HTMLOptionElement>, propertyName: string) => void;
  errors?: Record<string, string[]>;
}

export function CustomSelect({ value, fieldName, onSelect, isDisabled, propertyName, errors }: CustomSelectProps) {

  const [ isOpen, setIsOpen ] = useState(false);
  const { pathname } = useLocation();

  const setListBox = () => {
    switch (fieldName) {
      case CustomSelectField.LocationField:
        return Locations;
      case CustomSelectField.GenderField:
        return Object.values(Gender);
      case CustomSelectField.LevelField:
        return TrainingLevels;
      case CustomSelectField.TrainingTime:
        return TrainingTimes;
      case CustomSelectField.TrainingType:
        return TrainingTypes;
    }
  };

  const handleSelectClick = (evt: SyntheticEvent<HTMLOptionElement>) => {
    onSelect(evt, propertyName);
    setIsOpen(false);
  };

  const selectClass = classnames({
    'custom-select': true,
    'user-info-edit__select': pathname.includes(AppRoute.TrainerAccount),
    'custom-select--not-selected': !value,
    'is-open': isOpen,
    'not-empty': value,
    'is-invalid': errors && errors[ propertyName ]
  });

  return (
    <div className={ selectClass }>
      <span className="custom-select__label">{ fieldName }</span>
      <div className="custom-select__placeholder">
        { fieldName === CustomSelectField.LocationField ?
          `ст. м. ${capitalizeWord(value)}`
          : `${capitalizeWord(value)}`
        }

      </div>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={ () => setIsOpen(!isOpen) }
        disabled={ isDisabled }
      >
        <span className="custom-select__text capitalize">{ value }</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {
          setListBox()?.map((item) => (
            <option
              key={ item }
              value={ item }
              role='listitem'
              className='custom-select__item capitalize'
              onClick={ handleSelectClick }
            >{ item }</option>
          ))
        }
      </ul>
      { errors && errors[ propertyName ] &&
        errors[ propertyName ].map((item) => (
          <span key={ item } className="custom-select__error" style={ { position: 'initial' } }>{ item }</span>
        )) }
    </div>
  );
}

export default CustomSelect;
