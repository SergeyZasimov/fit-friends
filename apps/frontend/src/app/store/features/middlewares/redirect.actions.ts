import { createAction } from '@reduxjs/toolkit';
import { ActionName } from '../../../utils/constants';

export const redirectBack = createAction<void>(ActionName.RedirectBack);

export const redirectToRoute = createAction<string>(ActionName.RedirectToRoute);
