import css from './ContactForm.module.css';
import * as yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import {
  useGetAllContactsQuery,
  useAddContactMutation,
} from 'redux/contactsSlice';

const Schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    ),
  number: yup
    .string()
    .required()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

export const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
  });

  const { data: contacts } = useGetAllContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      alert(`${values.name} is already in contacts`);
      resetForm();
      return;
    }

    addContact({
      name: values.name.toLowerCase(),
      phone: values.number,
    });

    resetForm();
  };

  const nameId = nanoid();
  const numberId = nanoid();

  return (
    <Formik
      initialValues={formik.initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <Form className={css.form}>
        <label htmlFor={nameId}>name*</label>
        <Field
          id={nameId}
          className={css.input}
          type="text"
          name="name"
          placeholder="Name Surname"
        />
        <ErrorMessage name="name" component="span" />

        <label htmlFor={numberId}>number*</label>
        <Field
          id={numberId}
          className={css.input}
          type="tel"
          name="number"
          placeholder="000-00-00"
        />
        <ErrorMessage name="number" component="span" />

        <button type="submit" className={css.addButton}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
