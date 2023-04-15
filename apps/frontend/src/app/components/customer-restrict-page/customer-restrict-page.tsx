import { UserRole } from '@fit-friends/shared';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../store/features/user/user-slice';
import { useAppSelector } from '../../store/store.hooks';
import { AppRoute } from '../../utils/constants';


export function CustomerRestrictPage({ children }: PropsWithChildren) {
  const user = useAppSelector(getUser);
  return (
    children && user && user.role === UserRole.Customer
      ? <>{ children }</>
      : <Navigate to={ `/${AppRoute.SignIn}` } />
  );
}

export default CustomerRestrictPage;
