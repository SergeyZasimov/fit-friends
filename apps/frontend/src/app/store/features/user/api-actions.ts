import {
  CreateUser,
  CustomerAdditionalInfo,
  LoginUser,
  Profile,
  TrainerAdditionalInfo,
  UrlDomain,
  UrlRoute,
  User,
  UserTokens,
} from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { shouldDisplayError } from '../../../services/api.service';
import {
  setAccessToken,
  setRefreshToken,
} from '../../../services/token.service';
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

export const login = createAsyncThunk<
  UserTokens,
  LoginUser,
  AsyncThunkOptionField
>(ActionName.User.Login, async (dto, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<UserTokens>(
      `/${UrlDomain.Auth}/${UrlRoute.Login}`,
      dto
    );
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
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
});

export const fetchUser = createAsyncThunk<User, void, AsyncThunkOptionField>(
  ActionName.User.FetchUser,
  async (_, { extra: api }) => {
    try {
      const { data } = await api.get(`/${UrlDomain.Auth}`);
      return data;
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        shouldDisplayError(err.response)
      ) {
        const { message } = err.response.data;
        toast.error(message);
      }
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  Partial<Profile>,
  AsyncThunkOptionField
>(
  ActionName.User.UpdateUser,
  async (profile, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/${UrlDomain.Profile}`, profile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { message } = err.response.data;
        if (message instanceof Array) {
          (message as string[]).forEach((item) => {
            const [, text] = item.split(':');
            toast.error(text);
          });
        } else {
          toast.error(message);
        }
      }
      return rejectWithValue(err);
    }
  }
);

export const deleteAvatar = createAsyncThunk<User, void, AsyncThunkOptionField>(
  ActionName.User.DeleteAvatar,
  async (_, { extra: api }) => {
    const { data } = await api.delete(
      `/${UrlDomain.Profile}/${UrlRoute.DeleteAvatar}`
    );
    return data;
  }
);

export const deleteCertificate = createAsyncThunk<
  User,
  { certificate: string },
  AsyncThunkOptionField
>(ActionName.User.DeleteCertificate, async (dto, { extra: api }) => {
  const { data } = await api.patch(
    `/${UrlDomain.Profile}/${UrlRoute.DeleteCertificate}`,
    dto
  );
  return data;
});

export const fetchUsers = createAsyncThunk<
  User[],
  string,
  AsyncThunkOptionField
>(ActionName.User.FetchUsers, async (query, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.Profile}?${query}`);
  return data;
});

export const fetchUserCard = createAsyncThunk<
  User,
  string,
  AsyncThunkOptionField
>(ActionName.User.FetchUserCard, async (id, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.Profile}/${id}`);
  return data;
});
