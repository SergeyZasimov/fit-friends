import { useEffect, useState } from 'react';

export interface FilterGymStatusProps {
  onStatusChange: (value: boolean) => void;
}

export function FilterGymStatus({ onStatusChange }: FilterGymStatusProps) {

  const [ isVerifyStatus, setIsVerifyStatus ] = useState<boolean>(false);

  const handleChangeVerifyStatus = () => {
    setIsVerifyStatus(!isVerifyStatus);
  };

  useEffect(() => {
    onStatusChange(isVerifyStatus);
  }, [ isVerifyStatus ]);

  return (
    <div className="custom-toggle custom-toggle--switch">
      <label>
        <input
          type="checkbox"
          value="status-1"
          name="status"
          checked={ isVerifyStatus }
          onChange={ handleChangeVerifyStatus }
        />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"></use>
          </svg>
        </span>
        <span className="custom-toggle__label">Только проверенные</span>
      </label>
    </div>
  );
}

export default FilterGymStatus;
