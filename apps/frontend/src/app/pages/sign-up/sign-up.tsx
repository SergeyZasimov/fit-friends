import { UserRole } from '@fit-friends/shared';
import { ChangeEvent, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

type ContextType = { role: string, handleRoleChange: (evt: ChangeEvent) => void; };

export function SignUp() {

  const [ role, setRole ] = useState<string>(UserRole.Trainer);

  const handleRoleChange = (evt: ChangeEvent) => {
    setRole((evt.target as HTMLInputElement).value);
  };

  return (
    <Outlet context={ { role, handleRoleChange } } />
  );
}

export default SignUp;

export function useRole() {
  return useOutletContext<ContextType>();
}
