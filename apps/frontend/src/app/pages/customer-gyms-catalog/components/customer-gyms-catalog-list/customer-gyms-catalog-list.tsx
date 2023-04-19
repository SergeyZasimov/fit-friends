import { useEffect, useState } from 'react';
import ShowMoreButtons from '../../../../components/show-more-buttons/show-more-buttons';
import { fetchFavoriteGyms } from '../../../../store/features/sport-gyms/api-actions';
import { getSportGyms } from '../../../../store/features/sport-gyms/sport-gyms-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store.hooks';
import CustomerGymsCatalogCard from '../customer-gyms-catalog-card/customer-gyms-catalog-card';

const GYM_QUANTITY = 3;


export function CustomerGymsCatalogList() {
  const gyms = useAppSelector(getSportGyms);
  const [ offset, setOffset ] = useState(GYM_QUANTITY);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteGyms());
  });

  useEffect(() => {
    setOffset(GYM_QUANTITY);
  }, [ gyms ]);

  return (
    <div className="gyms-catalog">
      <ul className="gyms-catalog__list">
        {
          gyms.slice(0, offset).map(gym => (
            <CustomerGymsCatalogCard key={ gym.id } gym={ gym } />
          ))
        }
      </ul>
      <div className="show-more gyms-catalog__show-more">
        <ShowMoreButtons
          currentLength={ offset }
          maxLength={ gyms.length }
          onIncrease={ () => setOffset(offset + GYM_QUANTITY) }

        />
      </div>
    </div>
  );
}

export default CustomerGymsCatalogList;
