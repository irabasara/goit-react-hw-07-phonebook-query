

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64da456de947d30a260b0ef4.mockapi.io/',
  }),
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `contacts`,
      providesTags: ['Contacts'],
    }),

    addContact: builder.mutation({
      query: newContact => ({
        url: `contacts`,
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
