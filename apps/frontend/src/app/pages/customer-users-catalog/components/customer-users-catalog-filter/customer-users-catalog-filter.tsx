import { ProfileQuery } from '@fit-friends/shared';
import FilterLocation from 'apps/frontend/src/app/components/filter-location/filter-location';
import FilterTrainingLevel from 'apps/frontend/src/app/components/filter-training-level/filter-training-level';
import FilterTrainingType from 'apps/frontend/src/app/components/filter-training-type/filter-training-type';
import SortUserRole from 'apps/frontend/src/app/components/sort-user-role/sort-user-role';
import { fetchUsers } from 'apps/frontend/src/app/store/features/user/api-actions';
import { useAppDispatch } from 'apps/frontend/src/app/store/store.hooks';
import { createQueryString } from 'apps/frontend/src/app/utils/helpers';
import { useEffect, useState } from 'react';


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
    dispatch(fetchUsers(createQueryString(query)));
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
