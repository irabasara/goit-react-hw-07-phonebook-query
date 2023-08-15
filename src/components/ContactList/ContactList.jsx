import css from './contactList.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getFilters } from 'redux/selector';
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsSlice';

export const ContactList = () => {
  const { data: contacts } = useGetAllContactsQuery();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const filterValue = useSelector(getFilters);

  const getFilteredContact = () => {
    if (!contacts) return;
    return contacts.filter(contact =>
      contact.name.includes(filterValue.toLowerCase())
    );
  };

  const filteredContact = getFilteredContact();

  return (
    contacts && (
      <ul>
        {filteredContact.map(contact => {
          const { id, name, phone } = contact;
          return (
            <li key={id} className={css.contactsItem}>
              <p>{`${name} : ${phone}`}</p>
              <button onClick={() => deleteContact(id)} disabled={isLoading}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    )
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
};
