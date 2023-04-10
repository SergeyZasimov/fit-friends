import { UrlDomain, Workout } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const createWorkout = createAsyncThunk<
  Workout,
  Record<string, FormDataEntryValue | string | File | null | undefined>,
  AsyncThunkOptionField
>(ActionName.Workout.Create, async (dto, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post(`/${UrlDomain.Workout}`, dto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const { message } = err.response.data;
      const errors: Record<string, string[]> = {};
      if (message instanceof Array) {
        (message as string[]).forEach((item) => {
          const [field, text] = item.split(':');
          errors[field] = errors[field] ? [...errors[field], text] : [text];
        });
        if (errors && errors.description) {
          errors.description.forEach((text) => toast.error(text));
        }
      } else {
        toast.error(message);
      }
      return rejectWithValue(errors);
    }
  }
});
