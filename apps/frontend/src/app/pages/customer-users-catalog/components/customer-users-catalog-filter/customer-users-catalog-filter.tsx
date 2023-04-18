import { ProfileQuery } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import FilterLocation from '../../../../components/filter-location/filter-location';
import FilterTrainingLevel from '../../../../components/filter-training-level/filter-training-level';
import FilterTrainingType from '../../../../components/filter-training-type/filter-training-type';
import SortUserRole from '../../../../components/sort-user-role/sort-user-role';
import * as apiActions from '../../../../store/features/user/api-actions';
import { useAppDispatch } from '../../../../store/store.hooks';
import { createQueryString } from '../../../../utils/helpers';


export function CustomerUsersCatalogFilter() {

  const dispatch = useAppDispatch();

  const [ query, setQuery ] = useState<ProfileQuery>({
    location: [],
    trainingType: [],
  });

  const handleQueryChange = (value: ProfileQuery) => {
    setQuery({ ...query, ...value });
  };

  useEffect(() => {
    dispatch(apiActions.fetchUsers(createQueryString(query)));
  }, [ query ]);

  return (
    <form className="user-catalog-form__form">
      <FilterLocation queryValue={ query.location as string[] } onQueryChange={ handleQueryChange } />
      <FilterTrainingType queryValue={ query.trainingType as string[] } onQueryChange={ handleQueryChange } />
      <FilterTrainingLevel queryValue={ query.trainingLevel as string } onQueryChange={ handleQueryChange } />
      <SortUserRole onQueryChange={ handleQueryChange } />
    </form>
  );
}

export default CustomerUsersCatalogFilter;
