import { useEffect } from 'react';
import css from './contactList.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilters } from 'redux/selector';
import { deleteContacts, fetchContacts } from 'redux/contactsOperations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilters);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
              <button onClick={() => dispatch(deleteContacts(id))}>
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
