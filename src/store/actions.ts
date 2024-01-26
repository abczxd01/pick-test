import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SendFormResponse } from '../types';

export const sendForm = createAsyncThunk<
  SendFormResponse,
  {
    user: {
      firstName: string;
      lastName: string;
      mail: string;
      phone: string;
    };
    order: {
      flatsCount: number;
      time: number;
    };
  }
>('form/sendForm', async (data) => {
  const response = await axios.post('https://strapi.pik.ru/front-tests', data);

  return response.data;
});
