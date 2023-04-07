import {
  CreateUser,
  CustomerAdditionalInfo,
  TrainerAdditionalInfo,
  UrlDomain,
  UrlRoute,
  User,
} from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const registerUser = createAsyncThunk<
  User,
  CreateUser,
  AsyncThunkOptionField
>(
  ActionName.User.Register,
  async (newUser, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<User>(
        `/${UrlDomain.Auth}/${UrlRoute.Register}`,
        newUser,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
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
        } else {
          toast.error(message);
        }
        return rejectWithValue(errors);
      }
      return rejectWithValue(err);
    }
  }
);

export const questionnaireCustomer = createAsyncThunk<
  User,
  CustomerAdditionalInfo,
  AsyncThunkOptionField
>(
  ActionName.User.QuestionnaireCustomer,
  async (dto, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<User>(
        `/${UrlDomain.Auth}/${UrlRoute.QuestionnaireCustomer}`,
        dto
      );
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
        } else {
          toast.error(message);
        }

        if (errors && errors.trainingType) {
          errors.trainingType.forEach((text) => toast.error(text));
        }

        if (errors && errors.trainingTime) {
          errors.trainingTime.forEach((text) => toast.error(text));
        }

        if (errors && errors.trainingLevel) {
          errors.trainingLevel.forEach((text) => toast.error(text));
        }

        return rejectWithValue(errors);
      }
      return rejectWithValue(err);
    }
  }
);

export const questionnaireTrainer = createAsyncThunk<
  User,
  TrainerAdditionalInfo,
  AsyncThunkOptionField
>(
  ActionName.User.QuestionnaireTrainer,
  async (dto, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/${UrlDomain.Auth}/${UrlRoute.QuestionnaireTrainer}`,
        dto,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
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

          Object.values(errors).forEach((value) =>
            value.forEach((text) => toast.error(text))
          );
        } else {
          toast.error(message);
        }
        return rejectWithValue(errors);
      }
      return rejectWithValue(err);
    }
  }
);
