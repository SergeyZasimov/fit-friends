import { QuerySportGym } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import FilterGymParameters from '../../../../components/filter-gym-parameters/filter-gym-parameters';
import FilterGymStatus from '../../../../components/filter-gym-status/filter-gym-status';
import FilterLocation from '../../../../components/filter-location/filter-location';
import FilterPrice from '../../../../components/filter-price/filter-price';
import { fetchSportGyms, fetchSportGymsInfo } from '../../../../store/features/sport-gyms/api-actions';
import { getGymsPriceInfo } from '../../../../store/features/sport-gyms/sport-gyms-slice';
import { useAppDispatch, useAppSelector } from '../../../../store/store.hooks';
import { createQueryString } from '../../../../utils/helpers';


export function CustomerGymsCatalogFilter() {
  const dispatch = useAppDispatch();
  const priceInfo = useAppSelector(getGymsPriceInfo);

  const [ query, setQuery ] = useState<QuerySportGym>({
    priceRange: [],
    location: [],
    parameters: [],
  });

  useEffect(() => {
    dispatch(fetchSportGymsInfo());
  }, []);

  useEffect(() => {
    dispatch(fetchSportGyms(createQueryString(query)));
  }, [ query ]);

  const handleQueryChange = (value: QuerySportGym) => {
    setQuery({ ...query, ...value });
  };

  const handleStatusChange = (value: boolean) => {
    if (value) {
      setQuery({ ...query, status: true });
    } else {
      const { status, ...newQuery } = query;
      setQuery(newQuery);
    }
  };

  return (
    <form className="gym-hall-form__form">
      <div className="gym-hall-form__block">
        <h4 className="gym-hall-form__block-title gym-hall-form__block-title--price">Цена, ₽</h4>
        <FilterPrice onChangeQuery={ handleQueryChange } priceInfo={ priceInfo } />
      </div>
      <FilterLocation queryValue={ query.location as string[] } onQueryChange={ handleQueryChange } />
      <div className="gym-hall-form__block gym-hall-form__block--addition">
        <h4 className="gym-hall-form__block-title">Дополнительно</h4>
        <FilterGymParameters queryValue={ query.parameters as string[] } onQueryChange={ handleQueryChange } />
      </div>
      <div className="gym-hall-form__block">
        <h3 className="gym-hall-form__title gym-hall-form__title--status">Статус</h3>
        <FilterGymStatus onStatusChange={ handleStatusChange } />
      </div>
    </form>
  );
}

export default CustomerGymsCatalogFilter;
