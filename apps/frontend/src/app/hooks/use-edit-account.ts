import { Profile } from '@fit-friends/shared';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

export const useEditAccount = (account: Profile) => {
  const [editedAccount, setEditedAccount] = useState(account);

  const setAccountField = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    setEditedAccount({ ...editedAccount, [name]: value });
  };

  const setSpecialization = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;

    const currentTrainingType = [...(editedAccount.trainingType as string[])];

    if (currentTrainingType.includes(target.value)) {
      const index = currentTrainingType.findIndex(
        (item) => item === target.value
      );
      currentTrainingType.splice(index, 1);
      setEditedAccount({
        ...editedAccount,
        trainingType: [...currentTrainingType],
      });
    } else {
      setEditedAccount({
        ...editedAccount,
        trainingType: [...currentTrainingType, target.value],
      });
    }
  };

  const setIsReadyToPersonalTraining = (evt: ChangeEvent) => {
    setEditedAccount({
      ...editedAccount,
      isReadyToPersonalTraining: !editedAccount.isReadyToPersonalTraining,
    });
  };

  const setIsReadyToTraining = (evt: ChangeEvent) => {
    setEditedAccount({
      ...editedAccount,
      isReadyToTraining: !editedAccount.isReadyToTraining,
    });
  };

  const setSelectionField = (
    evt: SyntheticEvent<HTMLOptionElement>,
    propertyName: string
  ) => {
    setEditedAccount({
      ...editedAccount,
      [propertyName]: (evt.target as HTMLOptionElement).value,
    });
  };

  return {
    editedAccount,
    setSpecialization,
    setAccountField,
    setIsReadyToPersonalTraining,
    setSelectionField,
    setIsReadyToTraining,
  };
};
